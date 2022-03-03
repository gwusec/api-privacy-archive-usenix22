from django.urls import path

from .views import PreSurveyView,MainSurveyView,HeatMapView,FeedbackView

urlpatterns = [
    path('api/presurvey/', PreSurveyView.as_view()),
    path('api/mainsurvey/', MainSurveyView.as_view()),
    path('api/heatmap/', HeatMapView.as_view()),
    path('api/feedback/', FeedbackView.as_view()),
]

