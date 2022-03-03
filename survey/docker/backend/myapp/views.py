import datetime
import json
import logging
import traceback

from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Participant,PreSurveyData,SingleSignOn,SSOPermission, \
                    App,AppPermission,MainSurveyData,MainSurveyAppData, \
                    MainSurveyPermissionData,MainSurveySSOData,ErrorData, \
                    HeatMap,Feedback

logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
logger = logging.getLogger(__name__)

################################################################################

'''
/api/presurvey/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class PreSurveyView(View):
    def post(self, request):
        survey_db_mapping = {'have_gmail':'haveGmail', \
         'study':'studyId', \
         \
         'google_primary':'PrimaryEmail', \
         'google_owner':'whoseGmail', \
         'google_how_long':'howLongGmail', \
         'red_ball_red':'RedBallRed', \
         'google_recall_sso':'GRecallThirdPartySSO', \
         'google_recall_sso_yes_app':'GThirdPartySSO', \
         'google_recall_sso_yes_consider':'GConsideredBeforeSSO', \
         'google_recall_sso_no_consider':'GFactorsToConsiderSSO', \
         'google_recall_app':'GRecallThirdPartyAccess', \
         'google_recall_app_yes_purpose':'GAccessPurpose', \
         'google_recall_app_yes_consider':'GConsideredBeforeAccess', \
         'google_recall_app_no_consider':'GFactorsToConsiderAccess', \
         \
         'generic_recall_sso':'GenericRecallThirdPartySSO', \
         'generic_recall_sso_yes_app':'GenericThirdPartySSO', \
         'generic_recall_sso_yes_account':'GenericWhatAccountSSO', \
         'generic_recall_sso_yes_consider':'GenericConsideredBeforeSSO', \
         'generic_recall_sso_no_account':'GenericWhatAccountToUse', \
         'generic_recall_sso_no_consider':'GenericFactorsToConsiderSSO', \
         'generic_recall_app':'GenericRecallThirdPartyAccess', \
         'generic_recall_app_yes_purpose':'GenericAccessPurpose', \
         'generic_recall_app_yes_consider':'GenericConsideredBeforeAccess', \
         'generic_recall_app_no_consider':'GenericFactorsToConsiderAccess', \
         \
         'red_ball_round':'RedBallRound', \
         'iuipc_control_autonomy':'IUIPC_controlAndAutonomy', \
         'iuipc_control_lies_heart':'IUIPC_controlLiesAtHeart', \
         'iuipc_awareness_disclose':'IUIPC_awarenessDisclose', \
         'iuipc_awareness_clear_disclosure':'IUIPC_awarenessClearDisclosure', \
         'iuipc_collection_bother_whenever':'IUIPC_collectionBotherWhenever', \
         'iuipc_collection_think_twice':'IUIPC_collectionThinkTwice', \
         'iuipc_collection_bothers_many':'IUIPC_collectionBothersSoMany', \
         'iuipc_collection_too_much':'IUIPC_collectionTooMuch', \
         \
         'demo_gender':'Demo_gender', \
         'demo_age':'Demo_age', \
         'demo_education':'Demo_edu', \
         'demo_background':'Demo_background', \
        }
        survey_db_mapping = {value:key for key, value in survey_db_mapping.items()} # Flip the keys and values, for convenience

        status = {'success': False}
        post_data = None
        participant_obj = None
        try:
            post_data = json.loads(request.body)

            # Create a Participant entry if it doesn't exist already
            prolific_id = post_data['prolificId']
            participant_obj,is_created = Participant.objects.get_or_create(prolific_id=prolific_id)

            if not participant_obj.presurvey_complete:
                # Create a PreSurveyData entry
                presurvey_obj,is_created = PreSurveyData.objects.get_or_create(participant=participant_obj)

                # Update any POSTed fields
                posted_fields = set(post_data.keys()).intersection(set(survey_db_mapping.keys()))
                presurvey_row = dict()
                for post_field in posted_fields:
                    db_field = survey_db_mapping[post_field]
                    presurvey_row[db_field] = post_data[post_field]

                # These have to be handled specially
                presurvey_row['consent_age'] = presurvey_obj.consent_age or _get_consent(post_data, 'age')
                presurvey_row['consent_read'] = presurvey_obj.consent_read or _get_consent(post_data, 'read')
                presurvey_row['consent_participation'] = presurvey_obj.consent_participation or _get_consent(post_data, 'participation')

                for (key, value) in presurvey_row.items():
                    setattr(presurvey_obj, key, value)
                presurvey_obj.save()

                # Mark the presurvey as complete, if the POSTed data says so
                presurvey_complete = post_data.get('presurvey_complete', False)
                if presurvey_complete:
                    participant_obj.presurvey_complete = presurvey_complete
                    participant_obj.save()

                status['success'] = True
                status['data'] = model_to_dict(presurvey_obj)
                status['updated'] = list(presurvey_row.keys())
                status['complete'] = presurvey_complete

            else:
                raise RuntimeError('Attempted to submit data after already completing the presurvey')


        except Exception as e:
            status['data'] = traceback.format_exc()

            # Save error and request in the ErrorData table
            ErrorData.objects.create(participant=participant_obj, \
                                     error=status['data'], \
                                     request_data=post_data,
                                     method='presurvey')

        finally:
            return JsonResponse(status)


################################################################################

'''
/api/mainsurvey/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class MainSurveyView(View):
    def post(self, request):
        status = {'success': False}
        post_data = None
        participant_obj = None
        try:
            post_data = json.loads(request.body)
            processed = dict()

            # Create a Participant entry if it doesn't exist already
            prolific_id = post_data['prolificID']   # NOTE Yes, I know it's "prolificId" in the pre-survey
            participant_obj,is_created = Participant.objects.get_or_create(prolific_id=prolific_id)
            processed['prolific_id'] = prolific_id
            processed['prolific_id_found'] = not is_created

            '''
            APP DATA FROM EXTENSION
            '''
            if not participant_obj.extension_complete:
                # Process into SingleSignOns and SSOPermissions tables
                MainSurveyView._processExtensionData(post_data, mode='sso')
                processed['extension_sso'] = True

                # Process into Apps table and AppPermissions tables
                MainSurveyView._processExtensionData(post_data, mode='app')
                processed['extension_app'] = True

                # Mark the extension as complete on the first submission
                participant_obj.extension_complete = True
                participant_obj.save()

            '''
            PARTICIPANT DATA FROM SURVEY
            '''
            if not participant_obj.mainsurvey_complete:

                '''
                GENERAL SURVEY DATA
                '''
                # Process into MainSurveyData table
                MainSurveyView._processGeneralMainSurveyData(participant_obj, post_data)
                processed['survey'] = True

                '''
                APP-SPECIFIC SURVEY DATA
                '''
                # Process into MainSurveySSOData
                MainSurveyView._processAuthorizedSSOs(participant_obj, post_data)
                processed['survey_sso'] = True

                # Process into MainSurveyAppData and MainSurveyPermissionData tables
                MainSurveyView._processAppSpecificMainSurveyData(participant_obj, post_data)
                processed['survey_app_specific'] = True

                # Process questions about this participant's oldest, newest, and random apps
                for app_key in ['newestApp', 'oldestApp', 'randomApp']:
                    MainSurveyView._processDetailedAppSurveyData(participant_obj, post_data, app_key)
                    processed[app_key] = True

                # Mark the main survey as complete, if the POSTed data says so
                mainsurvey_complete = post_data.get('mainsurvey_complete', False)
                if mainsurvey_complete:
                    participant_obj.mainsurvey_complete = mainsurvey_complete
                    participant_obj.save()

                    # Except for the oldest/newest/random apps, unlink the apps from the participant upon completion of the survey
                    MainSurveySSOData.objects.filter(participant_id=participant_obj).update(sso_id=None)
                    MainSurveyAppData.objects.filter(participant_id=participant_obj,selection='').update(app_id=None)

                # Return the processed data on success
                status['success'] = True
                status['data'] = processed
                status['complete'] = mainsurvey_complete

            else:
                raise RuntimeError('Attempted to submit data after already completing the main survey')

        except Exception as e:
            status['data'] = traceback.format_exc()

            # Save error and request in the ErrorData table
            ErrorData.objects.create(participant=participant_obj, \
                                     error=status['data'], \
                                     request_data=post_data,
                                     method='mainsurvey')

        finally:
            return JsonResponse(status)
 
    def _processExtensionData(data, mode=None):
        assert mode == 'sso' or mode == 'app', 'mode needs to be either "sso" or "app"'
        is_app = mode == 'app'

        # Return a list of apps
        response_data = list()

        # NOTE Yes, I know "extention" is a typo in the structure
        app_list = data['extentionData']['tpdata'] if is_app else data['extentionData']['ssodata']
        for app in app_list:
            name = app['appName']
            homepage_url = app['appHomepage']
            icon_url = app['appIcon']

            app_obj,is_created = App.objects.get_or_create(name=name, homepage_url=homepage_url) if is_app else \
                                 SingleSignOn.objects.get_or_create(name=name, homepage_url=homepage_url)
            if(is_created):
                fields = dict()
                fields['icon_url'] = icon_url
                
                app_obj.__dict__.update(fields)
                app_obj.save()
 
            else :
                app_obj.install_count = app_obj.install_count + 1
                app_obj.save()

            app_response = dict()   # Data about this app
            app_response['name'] = name
            app_response['homepage_url'] = homepage_url
            app_response['icon_url'] = icon_url

            perm_response_list = list() # A list of this app's permissions
            perm_category_list = app['appPermissions']
            for perm_category in perm_category_list:
                category = perm_category['appPermissionTitle']
                icon_url = perm_category.get('appPermissionIcon', None)

                perm_list = perm_category.get('appPermissionDetail', list())
                for perm in perm_list:
                    permission = perm[0]

                    perm_obj,is_created = AppPermission.objects.get_or_create(app_id=app_obj,permission=permission,category=category) \
                                          if is_app else \
                                          SSOPermission.objects.get_or_create(sso_id=app_obj,permission=permission,category=category)
                    if(is_created):
                        fields = dict()
                        fields['icon_url'] = icon_url

                        perm_obj.__dict__.update(fields)
                        perm_obj.save()

                    perm_response = dict()  # Data about this particular permission
                    perm_response['category'] = category
                    perm_response['permission'] = permission
                    perm_response['icon_url'] = icon_url
                    perm_response_list.append(perm_response)

            app_response['permissions'] = perm_response_list
            response_data.append(app_response)

        return response_data

    def _processAuthorizedSSOs(participant_obj, post_data):
        authorized_sso = list()
        for sso in post_data['extentionData']['ssodata']:
            name = sso['appName']
            homepage_url = sso['appHomepage']
            install_time = datetime.datetime.fromtimestamp(sso['appInstallTimestamp'] / 1000)

            sso_obj = SingleSignOn.objects.get(name=name, homepage_url=homepage_url)
            survey_sso_obj,is_created = MainSurveySSOData.objects.get_or_create(participant_id=participant_obj, \
                                                                                sso_id=sso_obj)
            if(is_created):
                fields = dict()
                fields['installed_on'] = install_time
                survey_sso_obj.__dict__.update(fields)
                survey_sso_obj.save()

            authorized_sso.append({'name': name, 'homepage_url': homepage_url, 'installed_on': install_time})

        return authorized_sso

    def _processGeneralMainSurveyData(participant_obj, post_data):
        survey_db_mapping = {'study': 'studyId', \
            'sso_how_secure' : 'SSOHowSecure', \
            'sso_how_data_used' : 'SSOHowDataUsed', \
            'sso_whether_delete' : 'SSOWhetherDelete', \
            'sso_whether_tell_change' : 'SSOWhetherTellChange', \
            'sso_who_else' : 'SSOWhoElse', \
            'sso_how_often_review' : 'SSOHowOftenReview', \
            \
            'app_how_secure' : 'TPHowSecure', \
            'app_how_data_used' : 'TPHowDataUsed', \
            'app_whether_delete' :  'TPWhetherDelete', \
            'app_whether_tell_change' : 'TPWhetherTellChange', \
            'app_who_else' : 'TPWhoElse', \
            'app_what_part_access' : 'TPWhatPartAccess', \
            'app_how_often_review' : 'TPHowOftenReview', \
            \
            'rfl_understand_link' : 'BetterUnderstandLink', \
            'rfl_understand_access' : 'BetterUnderstandAccess', \
            'rfl_change_settings' : 'ChangeSettings', \
            'rfl_six_month_review' : 'SixMonthReview', \
            'rfl_what_settings' : 'ChangeSettingsWhich', \
            'rfl_what_review' : 'SixMonthLookFor', \
            \
            'fut_features' : 'AddFeatures', \
            'fut_remind' : 'OftenRemind', \
            'fut_reapprove' : 'OftenReapprove', \
            'fut_approve_every' : 'SeekApproval', \
            'fut_block_data' : 'BlockSpecificData', \
        }
        survey_db_mapping = {value:key for key, value in survey_db_mapping.items()} # Flip the keys and values, for convenience

        # Create a MainSurveyData entry
        mainsurvey_obj,is_created = MainSurveyData.objects.get_or_create(participant=participant_obj)

        # Update any POSTed fields
        posted_fields = set(post_data.keys()).intersection(set(survey_db_mapping.keys()))
        mainsurvey_row = dict()
        for post_field in posted_fields:
            db_field = survey_db_mapping[post_field]
            mainsurvey_row[db_field] = post_data[post_field]

        # These have to be handled specially
        mainsurvey_row['consent_age'] = mainsurvey_obj.consent_age or _get_consent(post_data, 'age')
        mainsurvey_row['consent_read'] = mainsurvey_obj.consent_read or _get_consent(post_data, 'read')
        mainsurvey_row['consent_participation'] = mainsurvey_obj.consent_participation or _get_consent(post_data, 'participation')

        for (key, value) in mainsurvey_row.items():
            setattr(mainsurvey_obj, key, value)
        mainsurvey_obj.save()

        return mainsurvey_row

    def _processAppSpecificMainSurveyData(participant_obj, post_data):
        # Process questions about all this participant's apps
        installed_apps = post_data.get('AppsAuthMat', list())
        app_metadata = dict()

        if(len(installed_apps) > 0):
            for app in post_data['extentionData']['tpdata']:
                name = app['appName']
                homepage_url = app['appHomepage']
                install_time = datetime.datetime.fromtimestamp(app['appInstallTimestamp'] / 1000)
                app_metadata[name] = {'homepage_url': homepage_url, 'install_time':install_time}

            for app in installed_apps:
                name = app['appName']
                homepage_url = app_metadata[name]['homepage_url']
                install_time = app_metadata[name]['install_time']
                keep = app['keep']
                reason = app.get('reason', None)

                app_metadata[name]['keep'] = keep
                app_metadata[name]['reason'] = reason

                app_obj = App.objects.get(name=name, homepage_url=homepage_url)
                survey_app_obj,is_created = MainSurveyAppData.objects.get_or_create(participant_id=participant_obj, app_id=app_obj)

                if(is_created):
                    survey_app_row = dict()
                    survey_app_row['installed_on'] = install_time
                    survey_app_row['keep_choice'] = keep
                    if(reason is not None):
                        survey_app_row['keep_reason'] = reason
                    survey_app_obj.__dict__.update(survey_app_row)
                    survey_app_obj.save()


        return app_metadata

    def _processDetailedAppSurveyData(participant_obj, post_data, key):
        valid_key = key in ['oldestApp', 'newestApp', 'randomApp'] and key in post_data
        survey_app_row = dict()

        if(valid_key):
            survey_app_row['selection'] = key

            app_post_data = post_data[key]
            name = app_post_data['appName']
            app_obj = App.objects.get(name=name)
            survey_app_obj = MainSurveyAppData.objects.get(participant_id=participant_obj, app_id=app_obj)
    
            survey_db_mapping = {'recall' : 'appRecall', \
                'last_use' : 'appLastUse', \
                'aware_prior' : 'appAwarePrior', \
                'access_beneficial' : 'appBeneficialAccess', \
                'access_concerned' : 'appConcernAccess', \
                'access_change' : 'appChangeAccess', \
                'describe_concern' : 'appDescribeConcern', \
            }
            survey_db_mapping = {value:key for key, value in survey_db_mapping.items()} # Flip the keys and values, for convenience

            # Update any POSTed fields
            posted_fields = set(app_post_data.keys()).intersection(set(survey_db_mapping.keys()))
            mainsurvey_row = dict()
            for post_field in posted_fields:
                db_field = survey_db_mapping[post_field]
                survey_app_row[db_field] = app_post_data[post_field]

            for (key, value) in survey_app_row.items():
                setattr(survey_app_obj, key, value)
            survey_app_obj.save()

            # Process permissions
            permission_list = app_post_data.get('appPermNeceConc', list())
            for perm in permission_list:
                perm_text = perm['permission']
                perm_obj = AppPermission.objects.get(app_id=app_obj, permission=perm_text)

                survey_perm_obj,is_created = MainSurveyPermissionData.objects.get_or_create(participant_id=participant_obj, \
                                                                                            survey_app_id=survey_app_obj, \
                                                                                            permission_id=perm_obj)
                if(perm_obj is not None and is_created):
                    permission_app_row = dict()
                    permission_app_row['category'] = perm_obj.category
                    permission_app_row['permission'] = perm_obj.permission
                    permission_app_row['understand'] = perm['understand']
                    permission_app_row['necessary'] = perm['necessary']
                    permission_app_row['concerned'] = perm['concern']
                    survey_perm_obj.__dict__.update(permission_app_row)
                    survey_perm_obj.save()
                    
            if(len(permission_list) > 0):
                survey_app_row['permissions'] = permission_list

        return survey_app_row

def _get_consent(data, consent_key):
    '''
    "informedConsent": {
        "age": {
            "confirmation": true
        },
        "read": {
            "confirmation": true
        },
        "participation": {
            "confirmation": true
        }
    }
    '''
    return 'informedConsent' in data and \
        consent_key in data['informedConsent'] and \
        'confirmation' in data['informedConsent'][consent_key] and \
        data['informedConsent'][consent_key]['confirmation']

################################################################################

'''
/api/heatmap/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class HeatMapView(View):
    def post(self, request):
        status = {'success': False}
        post_data = None
        participant_obj = None
        try:
            post_data = json.loads(request.body)

            # Create a Participant entry if it doesn't exist already
            prolific_id = post_data['prolificID']
            participant_obj,is_created = Participant.objects.get_or_create(prolific_id=prolific_id)

            if not participant_obj.heatmap_complete:
                # Create a HeatMap entry
                heatmap_obj,is_created = HeatMap.objects.get_or_create(participant=participant_obj)

                heatmap_row = dict()
                heatmap_row['data_blob'] = str(post_data)
                heatmap_row['scroll_depth'] = int(post_data.get('scrollDepth', -1))

                for(key, value) in heatmap_row.items():
                    setattr(heatmap_obj, key, value)
                heatmap_obj.save()

                # Mark the heatmap as complete on the first submission
                participant_obj.heatmap_complete = True
                participant_obj.save()

                status['success'] = True
                status['data'] = heatmap_row['scroll_depth']

            else:
                raise RuntimeError('Attempted to submit heatmap data more than once')

        except Exception as e:
            status['data'] = traceback.format_exc()

            # Save error and request in the ErrorData table
            ErrorData.objects.create(participant=participant_obj, \
                                     error=status['data'], \
                                     request_data=post_data,
                                     method='heatmap')

        finally:
            return JsonResponse(status)

################################################################################

'''
/api/feedback/
'''
@method_decorator(csrf_exempt, name='dispatch') # TODO remove this in production
class FeedbackView(View):
    def post(self, request):
        status = {'success': False}
        post_data = None

        try:
            post_data = json.loads(request.body)

            referer = request.META.get('HTTP_REFERER', '')
            feedback = post_data.get('feedback', '')

            # Create a Feedback entry
            feedback_obj = Feedback.objects.create(referer=referer, feedback=feedback)

            status['success'] = True
            status['data'] = {'referer':referer, 'data':feedback}

        except Exception as e:
            status['data'] = traceback.format_exc()

            # Save error and request in the ErrorData table
            ErrorData.objects.create(error=status['data'], \
                                     request_data=post_data,
                                     method='feedback')

        finally:
            return JsonResponse(status)

