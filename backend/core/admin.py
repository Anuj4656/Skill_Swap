from django.contrib import admin
from .models import (
    UserProfile, SkillCategory, Skill, UserSkillOffered, UserSkillWanted,
    SwapRequest, Rating, AdminAction, PlatformMessage
)

admin.site.register(UserProfile)
admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(UserSkillOffered)
admin.site.register(UserSkillWanted)
admin.site.register(SwapRequest)
admin.site.register(Rating)
admin.site.register(AdminAction)
admin.site.register(PlatformMessage)
