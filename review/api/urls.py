from django.urls import path, include
from .views import IndexView, GetCandidates, CreateCandidate, ViewCandidate, UpdateStatus

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('get-candidates', GetCandidates.as_view()),
    path('create-candidate', CreateCandidate.as_view()),   
    path('view-candidate/<app_code>', ViewCandidate.as_view()),
    path('update-status/<app_code>', UpdateStatus.as_view()),
]
