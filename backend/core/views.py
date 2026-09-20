from rest_framework import generics, viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile, SkillCategory, Skill, UserSkillOffered, UserSkillWanted, SwapRequest, Rating
from .serializers import (
    UserSerializer, UserProfileSerializer, SkillCategorySerializer, SkillSerializer,
    UserSkillOfferedSerializer, UserSkillWantedSerializer, SwapRequestSerializer, RatingSerializer
)
from django.db.models import Q
from rest_framework.views import APIView

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not old_password or not new_password:
            return Response({'error': 'Old password and new password are required.'}, status=status.HTTP_400_BAD_REQUEST)
            
        if not user.check_password(old_password):
            return Response({'error': 'Incorrect current password.'}, status=status.HTTP_403_FORBIDDEN)
            
        user.set_password(new_password)
        user.save()
        return Response({'status': 'Password updated successfully.'})

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        
        if not username:
            return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username__iexact=username).exists():
            return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
            
        if email and User.objects.filter(email__iexact=email).exists():
            return Response({'error': 'This email is already in use by another account.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username, 
            password=data.get('password', ''), 
            email=email,
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', '')
        )
        UserProfile.objects.create(user=user)
        return Response({'status': 'User registered successfully'}, status=status.HTTP_201_CREATED)

class ProfileMeView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        qs = UserProfile.objects.select_related('user').prefetch_related(
            'skills_offered__skill', 'skills_wanted__skill', 
            'user__sent_requests', 'user__received_requests', 'user__ratings_received'
        )
        return qs.get(user=self.request.user)

    def perform_destroy(self, instance):
        user = self.request.user
        user.delete()

class ProfileDetailView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.select_related('user').prefetch_related(
        'skills_offered__skill', 'skills_wanted__skill', 
        'user__sent_requests', 'user__received_requests', 'user__ratings_received'
    )
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class SkillCategoryListView(generics.ListAPIView):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
    permission_classes = [permissions.AllowAny]

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = Skill.objects.filter(is_approved=True)
        q = self.request.query_params.get('search', None)
        if q:
            qs = qs.filter(name__icontains=q)
        cat = self.request.query_params.get('category', None)
        if cat:
            qs = qs.filter(category_id=cat)
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, is_approved=False)

class UserSkillOfferedViewSet(viewsets.ModelViewSet):
    serializer_class = UserSkillOfferedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserSkillOffered.objects.filter(user=self.request.user.profile).select_related('skill')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user.profile)

class UserSkillWantedViewSet(viewsets.ModelViewSet):
    serializer_class = UserSkillWantedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserSkillWanted.objects.filter(user=self.request.user.profile).select_related('skill')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user.profile)

class UserBrowseView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = UserProfile.objects.select_related('user').prefetch_related(
            'skills_offered__skill', 'skills_wanted__skill', 
            'user__sent_requests', 'user__received_requests', 'user__ratings_received'
        ).filter(is_public=True)
        
        qs = qs.exclude(skills_offered__isnull=True)
        if self.request.user.is_authenticated:
            qs = qs.exclude(user=self.request.user)
        
        skill_name = self.request.query_params.get('skill', None)
        if skill_name:
            qs = qs.filter(skills_offered__skill__name__icontains=skill_name)
        return qs.distinct()

class SwapRequestViewSet(viewsets.ModelViewSet):
    serializer_class = SwapRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return SwapRequest.objects.filter(Q(requester=user) | Q(receiver=user))

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user, status='pending')

    def perform_destroy(self, instance):
        if instance.requester == self.request.user and instance.status == 'pending':
            instance.delete()
        else:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You can only cancel your own pending requests.")

@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def accept_swap(request, pk):
    try:
        swap = SwapRequest.objects.get(pk=pk, receiver=request.user, status='pending')
        swap.status = 'accepted'
        swap.save()
        return Response({'status': 'Exchange requested accepted'})
    except SwapRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def reject_swap(request, pk):
    try:
        swap = SwapRequest.objects.get(pk=pk, receiver=request.user, status='pending')
        swap.status = 'rejected'
        swap.save()
        return Response({'status': 'Exchange requested rejected'})
    except SwapRequest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

class RatingCreateView(generics.CreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        swap_id = self.kwargs['pk']
        swap = SwapRequest.objects.get(pk=swap_id)
        # simplistic validation
        ratee = swap.receiver if self.request.user == swap.requester else swap.requester
        serializer.save(swap=swap, rater=self.request.user, ratee=ratee)

class UserRatingsListView(generics.ListAPIView):
    serializer_class = RatingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get('pk')
        return Rating.objects.filter(ratee_id=user_id)


class AdminPendingSkillsView(generics.ListAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Skill.objects.filter(is_approved=False)


@api_view(['PATCH'])
@permission_classes([permissions.IsAdminUser])
def admin_approve_skill(request, pk):
    try:
        skill = Skill.objects.get(pk=pk)
        skill.is_approved = True
        skill.save()
        return Response({'status': 'skill approved', 'id': skill.id})
    except Skill.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH', 'DELETE'])
@permission_classes([permissions.IsAdminUser])
def admin_reject_skill(request, pk):
    try:
        skill = Skill.objects.get(pk=pk)
        skill.delete()
        return Response({'status': 'skill rejected and deleted'})
    except Skill.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


class RecentRatingsView(generics.ListAPIView):
    serializer_class = RatingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Rating.objects.select_related('rater', 'ratee', 'swap').order_by('-created_at')[:4]
