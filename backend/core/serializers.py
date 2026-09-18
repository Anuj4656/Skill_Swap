from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, SkillCategory, Skill, UserSkillOffered, UserSkillWanted, SwapRequest, Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    trust_score = serializers.FloatField(read_only=True)
    skills_offered = serializers.SerializerMethodField()
    skills_wanted = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'location', 'photo', 'availability', 'is_public', 'trust_score', 'skills_offered', 'skills_wanted']

    def get_skills_offered(self, obj):
        # We need this to return a list of skills for the frontend. 
        # obj.skills_offered.all() returns UserSkillOffered instances.
        return [skill.skill.name for skill in obj.skills_offered.all()]

    def get_skills_wanted(self, obj):
        return [skill.skill.name for skill in obj.skills_wanted.all()]

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
    class Meta:
        model = Rating
        fields = ['id', 'swap', 'score', 'comment', 'created_at']
        read_only_fields = ['swap']
