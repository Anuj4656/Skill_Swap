from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'skills', views.SkillViewSet, basename='skill')
router.register(r'profile/me/offered', views.UserSkillOfferedViewSet, basename='userskilloffered')
router.register(r'profile/me/wanted', views.UserSkillWantedViewSet, basename='userskillwanted')
router.register(r'swaps', views.SwapRequestViewSet, basename='swaprequest')

urlpatterns = [
    # Auth register
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    
    # Profile
    path('profile/me/', views.ProfileMeView.as_view(), name='profile-me'),
    path('profile/<int:pk>/', views.ProfileDetailView.as_view(), name='profile-detail'),
    
    # Categories
    path('categories/', views.SkillCategoryListView.as_view(), name='skillcategory-list'),
    
    # Browse Users by Skill
    path('users/', views.UserBrowseView.as_view(), name='user-browse'),
    
    # Swap explicit actions
    path('swaps/<int:pk>/accept/', views.accept_swap, name='swap-accept'),
    path('swaps/<int:pk>/reject/', views.reject_swap, name='swap-reject'),
    
    # Ratings
    path('swaps/<int:pk>/rate/', views.RatingCreateView.as_view(), name='rating-create'),
    path('users/<int:pk>/ratings/', views.UserRatingsListView.as_view(), name='user-ratings-list'),

    path('', include(router.urls)),
]
