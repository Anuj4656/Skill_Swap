import os
import django
import random
from datetime import datetime, timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_core.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import UserProfile, SkillCategory, Skill, UserSkillOffered, UserSkillWanted, SwapRequest, Rating

# Helper function to clear old data
def clear_db():
    Rating.objects.all().delete()
    SwapRequest.objects.all().delete()
    UserSkillWanted.objects.all().delete()
    UserSkillOffered.objects.all().delete()
    Skill.objects.all().delete()
    SkillCategory.objects.all().delete()
    # keep superuser if exists, else clear
    User.objects.exclude(is_superuser=True).delete()

def seed_data():
    print("Clearing old data...")
    clear_db()

    print("Creating categories and skills...")
    categories = {
        'Design & Creative': ['Figma / UI Design', 'Product Design', 'Design Systems', 'Ceramics', 'Woodworking'],
        'Development': ['Python', 'PostgreSQL', 'FastAPI', 'Django', 'React', 'Tailwind CSS', 'TypeScript', 'Web Development'],
        'Language': ['Spanish Conversation', 'Italian (Native)'],
        'Craft & DIY': ['Furniture Restoration', 'Sourdough Baking', 'Pasta Making', 'Gardening'],
        'Music': ['Acoustic Guitar', 'Audio Mixing'],
        'Academic': ['Technical Writing', 'SEO Strategy', 'Tax Preparation'],
    }

    # Create Superuser if not exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin')

    cat_objects = {}
    skill_objects = {}

    for cat_name, skills in categories.items():
        cat = SkillCategory.objects.create(name=cat_name)
        cat_objects[cat_name] = cat
        for skill_name in skills:
            s = Skill.objects.create(name=skill_name, category=cat, is_approved=True)
            skill_objects[skill_name] = s

    print("Creating mock users...")
    
    mock_users = [
        {
            'username': 'marcus', 'email': 'marcus@example.com', 'first_name': 'Marcus', 'last_name': 'Chen',
            'location': 'Portland, OR', 'availability': 'weekends',
            'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUIKSDWSzbBkuuat5L3_aS3VZNjVhFYz4rDaxksPyX39j3gh5d6Ekx7x3Lv4PVQKD7_QT5avdXPMHkh769xgEhvi_8AJnGS9WdIZaz0I45bLabwzuI_tW09Cao-7DUaf7HNnijfqJrL_HQR66yIHB_aSmngBW6yAkokYNgw8SDrwkH7YwAb7zIfVr1Q4w1BoUNbZvtRrUKT6fVO3CBUa836ncIDFdNU6fkspBLBbD8H0YRgPZ3S-409w',
            'offering': ['Python', 'PostgreSQL', 'FastAPI'],
            'lookingFor': ['Figma / UI Design', 'Ceramics']
        },
        {
            'username': 'sarah', 'email': 'sarah@example.com', 'first_name': 'Sarah', 'last_name': 'Miller',
            'location': 'Chicago, IL', 'availability': 'evenings',
            'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9udVhMOUDGWxu9eFjWJ_QLKT_PdaG49RXrmdtdu9mxl8Ji3SkQR3JAMSeDh9HCIEjZcCIWtIjkeJpYVoehZWJomggVw5zwSBDNIXsFk8snQKejmOBlYbarE7CEO9HNM3ijs-2Vi92vDp7uMfkpyIJAN1UlfIDT8m25IFU7wFgtxGehbxhI9-GJY_K82SafdccjN4Q1alQm5x2pIBmZ9cjimJ5SAuKPIOYQfFZsTQwb3zOl_rwM2TvYw',
            'offering': ['Product Design', 'Design Systems'],
            'lookingFor': ['Django', 'React']
        },
        {
            'username': 'david', 'email': 'david@example.com', 'first_name': 'David', 'last_name': 'Adebayo',
            'location': 'Austin, TX', 'availability': 'flexible',
            'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAnKYBGWgXmvfdynBCHNFubbniZJYxxEcVy0k8_IYO-Au5YL5pmHp6BvWuBsW2_JPAf6kCYXZNRZTJECPgz771CrIrcypujwbulCj3t2ialE3ROhKWctILYIzsoSwgmG-00hhZHSqqADv43yo-8QTR7KdH6ggeYCA2DruGkcgqulzQHBMUsCVswsGUknIhqg3p6tP86oLVTeLOysbqWkLS-294dHAqN2NLnDKGbmOQIlKJGyk2UnnE_Q',
            'offering': ['Acoustic Guitar', 'Audio Mixing'],
            'lookingFor': ['Spanish Conversation']
        },
        {
            'username': 'maya', 'email': 'maya@example.com', 'first_name': 'Maya', 'last_name': 'Lin',
            'location': 'Seattle, WA', 'availability': 'weekends',
            'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfV3yM2yyYSb8lX_xcLcoq9NmGroHMB50d0nyt3jZnJOhY2RNAim-Vhs53O41OgnytiC68UeZzOBoeI_cGS9TLwGR4AYDX8YPssB6PyYrxgO5sCBjlpvS_tA2zOcsJdQUQV8ONstOIWPqDrlApDSFUipoNh493M5S7K-KLMkmpxpTHWqo__0u25kpJZma8A3-wfYLJMGesSReVFjY3CIHR_6_DXhpuaMHOx5PkfGO5pz2N2wiYOpoPYQ',
            'offering': ['Woodworking', 'Furniture Restoration'],
            'lookingFor': ['Tax Preparation', 'Web Development']
        },
        {
            'username': 'lucas', 'email': 'lucas@example.com', 'first_name': 'Lucas', 'last_name': 'Rossi',
            'location': 'Brooklyn, NY', 'availability': 'evenings',
            'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5pHR12VB6eCu4xA8Jw2RoY3E1bc7V8z-rprO8KGBh4LCa60hjtWFVexQT-l25kiROJogTAjNuAdh8lnPL-bx2qaeYOr-Tr2EuN17J2928J6OchTz7TJI_S_vd3IasOA4x2A1zJc_XgG2zbUvPt-BY_uigBzsLaGl0ZjiuOW8RGOuiDdgZ5JD1fkyWfn4NuR6mIdnZ9r3ha4bLVGou-MZ6f5NY_UPPCWHt_DmNoSAT1TKbf31nthkaUg',
            'offering': ['Italian (Native)', 'Pasta Making'],
            'lookingFor': ['Tailwind CSS', 'TypeScript']
        },
        {
            'username': 'amara', 'email': 'amara@example.com', 'first_name': 'Amara', 'last_name': 'Okafor',
            'location': 'San Francisco, CA', 'availability': 'flexible',
            'avatar': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjxyO5tYW0DJXgmBoVpn_gPCbE_bMD3zSC10QPcbVl9leGszqNNsMdKH-VBTdfXyvx4thWMZjumzof0MwMtjOo4U3u93SUJ6pwXojqM4ebk5qxJk7Ku8ieEJ9qZlDdS30ahkSbmS-qpoLOWKL3QWHb7YdLdLxSORTVdai7-ecKKlkYfSzQkKlziAl6iuZAL8SV4n9UejB7kpzkO-hQJFo6z3W0Ev3i3VJYcN-NdeUxDFOOhf1XOzEkJQ',
            'offering': ['Technical Writing', 'SEO Strategy'],
            'lookingFor': ['Sourdough Baking', 'Gardening']
        }
    ]

    for data in mock_users:
        u = User.objects.create_user(username=data['username'], password='password123', email=data['email'], first_name=data['first_name'], last_name=data['last_name'])
        
        # UserProfile is already created by signals or RegisterView? No, in models.py it's not a signal. Wait, we must create it.
        profile, created = UserProfile.objects.get_or_create(user=u)
        profile.location = data['location']
        profile.availability = data['availability']
        profile.photo = data['avatar']
        profile.save()

        for off in data['offering']:
            if off in skill_objects:
                UserSkillOffered.objects.create(user=profile, skill=skill_objects[off])
            
        for want in data['lookingFor']:
            if want in skill_objects:
                UserSkillWanted.objects.create(user=profile, skill=skill_objects[want])
                
    print("Creating some swaps and ratings...")
    users = list(User.objects.exclude(is_superuser=True))
    
    # Just standardizing some swaps between users
    if len(users) >= 2:
        u1 = users[0]
        u2 = users[1]
        s1 = SwapRequest.objects.create(
            requester=u1, receiver=u2, 
            skill_offered=u1.profile.skills_offered.first().skill, 
            skill_wanted=u2.profile.skills_offered.first().skill,
            status='completed', note="Great swap!"
        )
        Rating.objects.create(swap=s1, rater=u1, ratee=u2, score=5, comment="Excellent teacher")
        Rating.objects.create(swap=s1, rater=u2, ratee=u1, score=5, comment="Very attentive learner")

    print("Seed data completed successfully!")

if __name__ == "__main__":
    seed_data()
