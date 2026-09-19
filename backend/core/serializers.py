from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, SkillCategory, Skill, UserSkillOffered, UserSkillWanted, SwapRequest, Rating

class UserSerializer(serializers.ModelSerializer):
    photo = serializers.URLField(source='profile.photo', read_only=True)
    location = serializers.CharField(source='profile.location', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'photo', 'location']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(source='user.first_name', required=False, allow_blank=True)
    last_name = serializers.CharField(source='user.last_name', required=False, allow_blank=True)
    trust_score = serializers.SerializerMethodField()
    completed_swaps = serializers.SerializerMethodField()
    completion_rate = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(source='user.date_joined', read_only=True)
    is_staff = serializers.BooleanField(source='user.is_staff', read_only=True)
    skills_offered = serializers.SerializerMethodField()
    skills_wanted = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'first_name', 'last_name', 'location', 'photo', 'availability', 'is_public', 'trust_score', 'completed_swaps', 'completion_rate', 'reviews_count', 'date_joined', 'is_staff', 'skills_offered', 'skills_wanted']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if 'first_name' in user_data:
            instance.user.first_name = user_data['first_name']
        if 'last_name' in user_data:
            instance.user.last_name = user_data['last_name']
        instance.user.save()

        return super().update(instance, validated_data)

    def get_skills_offered(self, obj):
        return [{"id": skill.skill.id, "name": skill.skill.name, "category": skill.skill.category_id} for skill in obj.skills_offered.all()]

    def get_skills_wanted(self, obj):
        return [{"id": skill.skill.id, "name": skill.skill.name, "category": skill.skill.category_id} for skill in obj.skills_wanted.all()]

    def get_completion_rate(self, obj):
        completed = self.get_completed_swaps(obj)
        cancelled_or_rejected = obj.user.sent_requests.filter(status__in=['cancelled', 'rejected']).count() + \
                                obj.user.received_requests.filter(status__in=['cancelled', 'rejected']).count()
        total = completed + cancelled_or_rejected
        if total == 0:
            return 1.0 # default to 100% completion if no swaps
        return float(completed) / total

    def get_trust_score(self, obj):
        from django.db.models import Avg
        avg = obj.user.ratings_received.aggregate(Avg('score'))['score__avg']
        avg_score = float(avg) if avg is not None else 0.0
        
        comp_rate = self.get_completion_rate(obj)
        
        # Scale comp_rate to 5.0 to align scales, apply weights
        trust = (avg_score * 0.6) + (comp_rate * 5.0 * 0.4)
        
        # If no ratings and no swaps, safely return 0.0 (New profile)
        if avg is None and obj.user.sent_requests.count() == 0 and obj.user.received_requests.count() == 0:
            return 0.0
            
        return round(min(trust, 5.0), 1)

    def get_completed_swaps(self, obj):
        return obj.user.sent_requests.filter(status='completed').count() + \
               obj.user.received_requests.filter(status='completed').count()

    def get_reviews_count(self, obj):
        return obj.user.ratings_received.count()


class SkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = ['id', 'name']

class SkillSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(queryset=SkillCategory.objects.all(), source='category', write_only=True)
    category = SkillCategorySerializer(read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'category_id', 'is_approved']

class UserSkillOfferedSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)
    skill_id = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.filter(is_approved=True), source='skill', write_only=True)

    class Meta:
        model = UserSkillOffered
        fields = ['id', 'skill', 'skill_id']

class UserSkillWantedSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)
    skill_id = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.filter(is_approved=True), source='skill', write_only=True)

    class Meta:
        model = UserSkillWanted
        fields = ['id', 'skill', 'skill_id']

class SwapRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    receiver_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='receiver', write_only=True)
    skill_offered = SkillSerializer(read_only=True)
    skill_offered_id = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), source='skill_offered', write_only=True)
    skill_wanted = SkillSerializer(read_only=True)
    skill_wanted_id = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all(), source='skill_wanted', write_only=True)

    class Meta:
        model = SwapRequest
        fields = ['id', 'requester', 'receiver', 'receiver_id', 'skill_offered', 'skill_offered_id', 'skill_wanted', 'skill_wanted_id', 'status', 'note', 'created_at', 'updated_at']
        read_only_fields = ['status']

class RatingSerializer(serializers.ModelSerializer):
    rater = UserSerializer(read_only=True)
    ratee = UserSerializer(read_only=True)
    swap = SwapRequestSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'swap', 'rater', 'ratee', 'score', 'comment', 'created_at']
        read_only_fields = ['swap']
