import uuid

from django.db import models
from django.utils import timezone

class Participant(models.Model):
    prolific_id = models.CharField(max_length=191, unique=True) # prolificID
    uuid = models.UUIDField(default=uuid.uuid4) 

    presurvey_complete = models.BooleanField(default=False)
    extension_complete = models.BooleanField(default=False)
    heatmap_complete = models.BooleanField(default=False)
    mainsurvey_complete = models.BooleanField(default=False)

class PreSurveyData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, unique=True)
    study = models.CharField(default='', max_length=191)    # studyId

    '''
    CONSENT AND INTRO
    '''
    ## consentPage
    consent_age = models.BooleanField(default=False)    # informedConsent.age
    consent_read = models.BooleanField(default=False)   # informedConsent.read
    consent_participation = models.BooleanField(default=False)  # informedConsent.participation

    ## HaveGmailPage
    have_gmail = models.CharField(max_length=191) # haveGmail

    '''
    GOOGLE BRANCH
    '''
    ## GoogleSSOPage
    google_primary = models.CharField(max_length=191)  # PrimaryEmail

    ## GAcctVerificationPage
    google_owner = models.CharField(max_length=191)    # whoseGmail
    google_how_long = models.CharField(max_length=191) # howLongGmail
    #google_email_domain = models.CharField(max_length=191) # SSOEmailAddress   # NOTE: Removed for privacy reasons
    red_ball_red = models.CharField(max_length=191)   # RedBallRed

    ## GoogleSSOContextPage
    google_recall_sso = models.CharField(max_length=191)  # GRecallThirdPartySSO

    ## GoogleSSOContextPage2
    google_recall_sso_yes_app = models.TextField()  # GThirdPartySSO
    google_recall_sso_yes_consider = models.TextField() # GConsideredBeforeSSO
    google_recall_sso_no_consider = models.TextField()  # GFactorsToConsiderSSO

    ## GoogleThirdPartyContextPage
    google_recall_app = models.CharField(max_length=191)    # GRecallThirdPartyAccess

    ## GoogleThirdPartyContextPage2
    google_recall_app_yes_purpose = models.TextField()  # GAccessPurpose
    google_recall_app_yes_consider = models.TextField() # GConsideredBeforeAccess
    google_recall_app_no_consider = models.TextField()  # GFactorsToConsiderAccess

    '''
    GENERIC BRANCH
    '''
    ## GenericSSOContextPage
    generic_recall_sso = models.CharField(max_length=191) # GenericRecallThirdPartySSO

    ## GenericSSOContextPage2
    generic_recall_sso_yes_app = models.TextField() # GenericThirdPartySSO
    generic_recall_sso_yes_account = models.TextField() # GenericWhatAccountSSO
    generic_recall_sso_yes_consider = models.TextField()    # GenericConsideredBeforeSSO
    generic_recall_sso_no_account = models.TextField()  # GenericWhatAccountToUse
    generic_recall_sso_no_consider = models.TextField() # GenericFactorsToConsiderSSO

    ## GenericThirdPartyContextPage
    generic_recall_app = models.CharField(max_length=191) # GenericRecallThirdPartyAccess

    ## GenericThirdPartyContextPage2
    generic_recall_app_yes_purpose = models.TextField() # GenericAccessPurpose
    generic_recall_app_yes_consider = models.TextField()    # GenericConsideredBeforeAccess
    generic_recall_app_no_consider = models.TextField() # GenericFactorsToConsiderAccess

    '''
    IUIPC
    '''
    ## AttentionCheck2Page
    red_ball_round = models.CharField(max_length=191) # RedBallRound

    ## IUIPCPage1
    iuipc_control_autonomy = models.CharField(max_length=191) # IUIPC_controlAndAutonomy
    iuipc_control_lies_heart = models.CharField(max_length=191) # IUIPC_controlLiesAtHeart

    ## IUIPCPage2
    iuipc_awareness_disclose = models.CharField(max_length=191)   # IUIPC_awarenessDisclose
    iuipc_awareness_clear_disclosure = models.CharField(max_length=191)   # IUIPC_awarenessClearDisclosure

    ## IUIPCPage3
    iuipc_collection_bother_whenever = models.CharField(max_length=191)   # IUIPC_collectionBotherWhenever
    iuipc_collection_think_twice = models.CharField(max_length=191)   # IUIPC_collectionThinkTwice
    iuipc_collection_bothers_many = models.CharField(max_length=191)   # IUIPC_collectionBothersSoMany
    iuipc_collection_too_much = models.CharField(max_length=191)   # IUIPC_collectionTooMuch

    '''
    DEMOGRAPHICS
    '''
    ## DemographicsPage
    demo_gender = models.CharField(max_length=191)    # Demo_gender
    demo_age = models.CharField(max_length=191)   # Demo_age
    demo_education = models.CharField(max_length=191) # Demo_edu
    demo_background = models.CharField(max_length=191)    # Demo_background

class MainSurveyData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, unique=True)
    study = models.CharField(default='', max_length=191)    # studyId

    '''
    CONSENT AND INTRO
    '''
    ## consentPage
    consent_age = models.BooleanField(default=False)    # informedConsent.age
    consent_read = models.BooleanField(default=False)   # informedConsent.read
    consent_participation = models.BooleanField(default=False)  # informedConsent.participation

    '''
    GENERIC SSO AND APP PERCEPTIONS
    '''
    ## SSOPerceptionPage
    sso_how_secure = models.CharField(max_length=191)   # SSOHowSecure
    sso_how_data_used = models.CharField(max_length=191)    # SSOHowDataUsed
    sso_whether_delete = models.CharField(max_length=191)   # SSOWhetherDelete
    sso_whether_tell_change = models.CharField(max_length=191) # SSOWhetherTellChange
    sso_who_else = models.CharField(max_length=191) # SSOWhoElse
    sso_how_often_review = models.CharField(max_length=191) # SSOHowOftenReview
    
    ## TPPerceptionPage
    app_how_secure = models.CharField(max_length=191)   # TPHowSecure
    app_how_data_used = models.CharField(max_length=191)    # TPHowDataUsed
    app_whether_delete = models.CharField(max_length=191)   # TPWhetherDelete
    app_whether_tell_change = models.CharField(max_length=191) # TPWhetherTellChange
    app_who_else = models.CharField(max_length=191) # TPWhoElse
    app_what_part_access = models.CharField(max_length=191) # TPWhatPartAccess
    app_how_often_review = models.CharField(max_length=191) # TPHowOftenReview

    '''
    DYNAMIC QUESTIONS KEPT IN OTHER TABLES
        - App installations and app-level questions under MainSurveyAppData
            * Foreign key MainSurveyAppData.survey_id --> MainSurveyData.id
            * Foreign key MainSurveyAppData.app_id --> Apps.id
        - App permissions and permission-level questions under MainSurveyPermissionData
            * Foreign key MainSurveyPermissionData.survey_id --> MainSurveyData.id
            * Foreign key MainSurveyPermissionData.survey_app_id --> MainSurveyAppData.id
            * Foreign key MainSurveyPermissionData.permission_id --> AppPermissions.id
    '''

    '''
    REFLECTION
    '''
    ## ReflectionPage
    rfl_understand_link = models.CharField(max_length=191)   # BetterUnderstandLink
    rfl_understand_access = models.CharField(max_length=191)   # BetterUnderstandAccess
    rfl_change_settings = models.CharField(max_length=191)  # ChangeSettings
    rfl_six_month_review = models.CharField(max_length=191)  # SixMonthReview
    rfl_what_settings = models.TextField()  # ChangeSettingsWhich
    rfl_what_review = models.TextField()    # SixMonthLookFor

    '''
    FUTURE DESIGNS
    '''
    ## FutureDesignPage1
    fut_features = models.TextField()   # AddFeatures
    fut_remind = models.CharField(max_length=191)   # OftenRemind
    fut_reapprove = models.CharField(max_length=191)    # OftenReapprove

    ## FutureDesignPage2
    fut_approve_every = models.CharField(max_length=191)    # SeekApproval
    fut_block_data = models.CharField(max_length=191)    # BlockSpecificData

class App(models.Model):
    # From extensionData.tpdata
    name = models.CharField(max_length=191) # appName
    homepage_url = models.CharField(max_length=191) # appHomepage
    icon_url = models.TextField(default=None, blank=True, null=True) # appIcon

    install_count = models.IntegerField(default=1)

    class Meta:
        unique_together = ('name', 'homepage_url')

class AppPermission(models.Model):
    app_id = models.ForeignKey(App, on_delete=models.CASCADE)

    # From extensionData.tpdata[idx].appPermissions
    permission = models.CharField(max_length=191)   # appPermissionDetail
    category = models.CharField(max_length=191) # appPermissionTitle
    icon_url = models.TextField(default=None, blank=True, null=True) # appPermissionIcon

    class Meta:
        unique_together = ('app_id', 'permission', 'category')

class MainSurveyAppData(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    app_id = models.ForeignKey(App, blank=True, null=True, on_delete=models.SET_NULL)   # Null this field after the survey to preserve privacy
    uuid = models.UUIDField(default=uuid.uuid4) 

    # From extensionData.tpdata[idx]
    installed_on = models.DateTimeField(default=timezone.now())   # appInstallTimestamp

    # From AppsAuthMat
    keep_choice = models.CharField(max_length=191)  # keep
    keep_reason = models.TextField()    # reason

    # From xApp (where "x" is "newest," "oldest," or "random")
    selection = models.CharField(max_length=191) # Could be "newestApp", "oldestApp", "randomApp" or null; all following fields are NULL in the last case
    recall = models.CharField(max_length=191)   # appRecall
    last_use = models.CharField(max_length=191) # appLastUse
    aware_prior = models.CharField(max_length=191)  # appAwarePrior
    access_beneficial = models.CharField(max_length=191)    # appBeneficialAccess
    access_concerned = models.CharField(max_length=191) # appConcernAccess
    access_change = models.CharField(max_length=191)    # appChangeAccess
    describe_concern = models.TextField()   # appDescribeConcern

    class Meta:
        unique_together = ('participant_id', 'app_id')

class MainSurveyPermissionData(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    survey_app_id = models.ForeignKey(MainSurveyAppData, on_delete=models.CASCADE)
    permission_id = models.ForeignKey(AppPermission, blank=True, null=True, on_delete=models.SET_NULL)   # Null this field after the survey to preserve privacy
    uuid = models.UUIDField(default=uuid.uuid4) 

    # Store the text for this permission
    category = models.CharField(default='', max_length=191) # appPermissionTitle
    permission = models.CharField(default='', max_length=191)   # appPermissionDetail

    # From appPermNeceConc
    understand = models.CharField(default='', max_length=191)
    necessary = models.CharField(max_length=191)
    concerned = models.CharField(max_length=191)

    class Meta:
        unique_together = ('participant_id', 'survey_app_id', 'permission_id')

class SingleSignOn(models.Model):
    # From extensionData.ssodata
    name = models.CharField(max_length=191) # appName
    homepage_url = models.CharField(max_length=191) # appHomepage
    icon_url = models.TextField(default=None, blank=True, null=True) # appIcon

    install_count = models.IntegerField(default=1)

    class Meta:
        unique_together = ('name', 'homepage_url')

class SSOPermission(models.Model):
    sso_id = models.ForeignKey(SingleSignOn, on_delete=models.CASCADE)

    # From extensionData.ssodata[idx].appPermissions
    permission = models.CharField(max_length=191)   # appPermissionDetail
    category = models.CharField(max_length=191) # appPermissionTitle
    icon_url = models.TextField(default=None, blank=True, null=True) # appPermissionIcon

    class Meta:
        unique_together = ('sso_id', 'permission', 'category')

class MainSurveySSOData(models.Model):
    participant_id = models.ForeignKey(Participant, on_delete=models.CASCADE)
    sso_id = models.ForeignKey(SingleSignOn, blank=True, null=True, on_delete=models.SET_NULL)  # Null this field after the survey to preserve privacy
    uuid = models.UUIDField(default=uuid.uuid4) 

    # Simply track the authorization date for SSOs
    installed_on = models.DateTimeField(default=timezone.now())

    class Meta:
        unique_together = ('participant_id', 'sso_id')

class HeatMap(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, unique=True)

    data_blob = models.TextField(default=None, blank=True, null=True)   # Just the POSTed JSON data as-is
    scroll_depth = models.IntegerField(default=-1)  # scrollDepth

class Feedback(models.Model):
    timestamp = models.DateTimeField(default=timezone.now())
    referer = models.CharField(blank=True, null=True, default=None, max_length=191)
    feedback = models.TextField(blank=True, null=True, default=None)

class ProlificData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    session_id = models.CharField(max_length=191, unique=True)

    status = models.CharField(max_length=191)
    started_datetime = models.CharField(max_length=191)
    completed_date_time = models.CharField(max_length=191)
    time_taken = models.CharField(max_length=191)
    age = models.CharField(max_length=191)
    num_approvals = models.CharField(max_length=191)
    num_rejections = models.CharField(max_length=191)
    prolific_score = models.CharField(max_length=191)
    reviewed_at_datetime = models.CharField(max_length=191)
    entered_code = models.CharField(max_length=191)
    country_of_birth = models.CharField(max_length=191)
    current_country_of_residence = models.CharField(max_length=191)
    employment_status = models.CharField(max_length=191)
    first_language = models.CharField(max_length=191)
    nationality = models.CharField(max_length=191)
    sex = models.CharField(max_length=191)
    student_status = models.CharField(max_length=191)

class ErrorData(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, default=None, blank=True, null=True)
    session_id = models.CharField(max_length=191)
    
    timestamp = models.DateTimeField(default=timezone.now())
    error = models.TextField()
    request_data = models.TextField()
    method = models.CharField(max_length=191)

