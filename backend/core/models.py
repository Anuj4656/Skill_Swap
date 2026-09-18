from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class UserProfile(models.Model):
    AVAILABILITY_CHOICES = (
        ('weekends', 'Weekends'),
        ('evenings', 'Evenings'),
        ('weekdays', 'Weekdays'),
        ('flexible', 'Flexible'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    location = models.CharField(max_length=255, blank=True, null=True)
    photo = models.ImageField(upload_to='avatars/', blank=True, null=True)
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='flexible')
    is_public = models.BooleanField(default=True)
    is_banned = models.BooleanField(default=False)
    
    @property
    def trust_score(self):
        # Trust score = avg_rating * 0.6 + completion_rate * 0.4
        # Need to query ratings and completion later. For now, sample property.
        return 0.0

    def __str__(self):
        return f"{self.user.username}'s Profile"


class SkillCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Skill Categories"


class Skill(models.Model):
    name = models.CharField(max_length=150, unique=True)
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    is_approved = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class UserSkillOffered(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='skills_offered')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='offered_by')

    class Meta:
        unique_together = ('user', 'skill')


class UserSkillWanted(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='skills_wanted')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='wanted_by')

    class Meta:
        unique_together = ('user', 'skill')


class SwapRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    )

    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_requests")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_requests")
    skill_offered = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="swaps_offered")
    skill_wanted = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="swaps_wanted")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    note = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.requester} -> {self.receiver} ({self.status})"


class Rating(models.Model):
    swap = models.ForeignKey(SwapRequest, on_delete=models.CASCADE, related_name="ratings")
    rater = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ratings_given")
    ratee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ratings_received")
    score = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rater} rated {self.ratee}: {self.score}"


class AdminAction(models.Model):
    ACTION_CHOICES = (
        ('ban_user', 'Ban User'),
        ('reject_skill', 'Reject Skill'),
        ('broadcast', 'Broadcast'),
    )
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='admin_actions')
    action_type = models.CharField(max_length=50, choices=ACTION_CHOICES)
    target_id = models.IntegerField() # generic ID field for the target object
    reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class PlatformMessage(models.Model):
    message = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
