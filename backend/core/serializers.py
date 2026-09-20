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
    username = serializers.CharField(source='user.username', required=False, allow_blank=False)
    email = serializers.EmailField(source='user.email', required=False, allow_blank=True)
    trust_score = serializers.SerializerMethodField()
    avg_rating = serializers.SerializerMethodField()
    completed_swaps = serializers.SerializerMethodField()
    completion_rate = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(source='user.date_joined', read_only=True)
    is_staff = serializers.BooleanField(source='user.is_staff', read_only=True)
    skills_offered = serializers.SerializerMethodField()
    skills_wanted = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'first_name', 'last_name', 'location', 'photo', 'availability', 'is_public', 'trust_score', 'avg_rating', 'completed_swaps', 'completion_rate', 'reviews_count', 'date_joined', 'is_staff', 'skills_offered', 'skills_wanted']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if 'first_name' in user_data:
            instance.user.first_name = user_data['first_name']
        if 'last_name' in user_data:
            instance.user.last_name = user_data['last_name']
        if 'username' in user_data:
            instance.user.username = user_data['username']
        if 'email' in user_data:
            instance.user.email = user_data['email']
        instance.user.save()

        return super().update(instance, validated_data)

    def get_skills_offered(self, obj):
        return [{"id": skill.skill.id, "name": skill.skill.name, "category": skill.skill.category_id} for skill in obj.skills_offered.all()]

    def get_skills_wanted(self, obj):
        return [{"id": skill.skill.id, "name": skill.skill.name, "category": skill.skill.category_id} for skill in obj.skills_wanted.all()]

    def get_completion_rate(self, obj):
        completed = self.get_completed_swaps(obj)
        cancelled_or_rejected = len([r for r in obj.user.sent_requests.all() if r.status in ['cancelled', 'rejected']]) + \
                                len([r for r in obj.user.received_requests.all() if r.status in ['cancelled', 'rejected']])
        total = completed + cancelled_or_rejected
        if total == 0:
            return 1.0 # default to 100% completion if no swaps
        return float(completed) / total

    def get_avg_rating(self, obj):
        ratings = obj.user.ratings_received.all()
        if not ratings: return 0.0
        return sum([r.score for r in ratings]) / len(ratings)

    def get_trust_score(self, obj):
        ratings = obj.user.ratings_received.all()
        avg_score = sum([r.score for r in ratings]) / len(ratings) if ratings else 0.0
        
        completed = self.get_completed_swaps(obj)
        cancelled_or_rejected = len([r for r in obj.user.sent_requests.all() if r.status in ['cancelled', 'rejected']]) + \
                                len([r for r in obj.user.received_requests.all() if r.status in ['cancelled', 'rejected']])
        total_finished = completed + cancelled_or_rejected
        
        # If no ratings and no finished swaps, safely return 0.0 (New profile)
        if not ratings and total_finished == 0:
            return 0.0
        
        comp_rate = self.get_completion_rate(obj)
        
        # Scale comp_rate to 5.0 to align scales, apply weights
        trust = (avg_score * 0.6) + (comp_rate * 5.0 * 0.4)
            
        return round(min(trust, 5.0), 1)

    def get_completed_swaps(self, obj):
        return len([r for r in obj.user.sent_requests.all() if r.status == 'completed']) + \
               len([r for r in obj.user.received_requests.all() if r.status == 'completed'])

    def get_reviews_count(self, obj):
        return len(obj.user.ratings_received.all())


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
    is_rated = serializers.SerializerMethodField()

    class Meta:
        model = SwapRequest
        fields = ['id', 'requester', 'receiver', 'receiver_id', 'skill_offered', 'skill_offered_id', 'skill_wanted', 'skill_wanted_id', 'status', 'note', 'is_rated', 'created_at', 'updated_at']
        # removed 'status' from read_only_fields to allow frontend patches

    def get_is_rated(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.ratings.filter(rater=request.user).exists()
        return False

class RatingSerializer(serializers.ModelSerializer):
    rater = UserSerializer(read_only=True)
    ratee = UserSerializer(read_only=True)
    swap = SwapRequestSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'swap', 'rater', 'ratee', 'score', 'comment', 'created_at']
        read_only_fields = ['swap']
