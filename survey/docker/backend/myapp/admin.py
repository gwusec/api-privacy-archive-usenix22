from django.contrib import admin
from .models import Participant,PreSurveyData,MainSurveyData,App,AppPermission, \
                    MainSurveyAppData,MainSurveyPermissionData,SingleSignOn, \
                    SSOPermission,MainSurveySSOData,ProlificData,ErrorData, \
                    HeatMap,Feedback

# Register your models here.
admin.site.register(Participant)
admin.site.register(PreSurveyData)
admin.site.register(MainSurveyData)
admin.site.register(App)
admin.site.register(AppPermission)
admin.site.register(MainSurveyAppData)
admin.site.register(MainSurveyPermissionData)
admin.site.register(SingleSignOn)
admin.site.register(SSOPermission)
admin.site.register(MainSurveySSOData)
admin.site.register(ProlificData)
admin.site.register(ErrorData)
admin.site.register(HeatMap)
admin.site.register(Feedback)

