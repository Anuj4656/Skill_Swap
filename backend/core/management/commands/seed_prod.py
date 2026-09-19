import random
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import (
    UserProfile, SkillCategory, Skill, 
    UserSkillOffered, UserSkillWanted, SwapRequest, Rating
)
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seeds the database with 50 diverse users, 100 skills, and realistic swap request data'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting database seeding...")

        # 1. Clean existing dummy data (Optional, skipping total wipe to avoid destroying real users if any, 
        # but we can wipe our specific seed users if we namespace them)
        # We will create users like sys_seed_user_1 to easily identify them.
        self.stdout.write("Cleaning up previous seed data...")
        User.objects.filter(username__startswith='seed_user_').delete()
        SkillCategory.objects.filter(name__startswith='SeedCategory_').delete()

        # 2. Categories
        categories = ["Technology", "Languages", "Arts & Design", "Business", "Music", "Fitness & Health", "Cooking", "Crafts"]
        cat_objs = []
        for cat in categories:
            obj, _ = SkillCategory.objects.get_or_create(name=f"SeedCategory_{cat}")
            cat_objs.append(obj)

        # 3. 100 Skills
        self.stdout.write("Generating 100 skills...")
        skill_templates = [
            "Python", "JavaScript", "React", "Node.js", "Django", "Machine Learning", "Data Science", "SQL", "Cloud Architecture", "Docker",
            "Spanish", "French", "Mandarin", "Japanese", "German", "English Conversation", "Korean", "Italian", "Arabic", "Sign Language",
            "Graphic Design", "UI/UX Design", "Photoshop", "Illustrator", "Drawing", "Watercolor", "Digital Art", "Calligraphy", "Animation", "Logo Design",
            "Digital Marketing", "SEO", "Copywriting", "Financial Modeling", "Public Speaking", "Project Management", "Accounting", "Excel", "Sales", "Business Strategy",
            "Guitar", "Piano", "Vocals", "Music Theory", "Violin", "Drums", "Music Production", "Songwriting", "Cello", "Bass",
            "Yoga", "Personal Training", "Pilates", "Meditation", "Nutrition", "Martial Arts", "Tennis", "Swimming", "Dance", "Running Coaching",
            "Baking", "Vegan Cooking", "Italian Cuisine", "Sushi Making", "Cake Decorating", "Meal Prep", "BBQ", "Indian Cuisine", "Wine Tasting", "Pastry",
            "Knitting", "Woodworking", "Pottery", "Sewing", "Crochet", "Origami", "Jewelry Making", "Candle Making", "Leatherworking", "Quilting",
            # We need 20 more to hit 100
            "Rust", "Go", "C++", "Cybersecurity", "Blockchain",
            "Russian", "Hindi", "Portuguese", "Dutch", "Swedish",
            "Video Editing", "After Effects", "Final Cut Pro", "Blender", "3D Modeling",
            "Investing", "Crypto Trading", "Real Estate", "Startup Fundraising", "Leadership"
        ]
        
        all_skill_objs = []
        for i, name in enumerate(skill_templates):
            cat = cat_objs[i % len(cat_objs)]
            skill, _ = Skill.objects.get_or_create(name=f"S_{name}", defaults={'category': cat, 'is_approved': True})
            all_skill_objs.append(skill)
            
        # 4. Generate 50 Users
        self.stdout.write("Generating 50 users...")
        first_names = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley", "Cameron", "Quinn", "Avery", "Jamie", "Oliver", "Emma", "Liam", "Ava", "Noah", "Sophia", "Lucas", "Isabella", "Mason", "Mia", "Ethan", "Amelia", "Logan", "Harper", "Elijah", "Evelyn", "James", "Abigail", "Benjamin", "Emily", "William", "Elizabeth", "Alexander", "Mila", "Michael", "Ella", "Daniel", "Avery", "Henry", "Sofia", "Jackson", "Camila", "Sebastian", "Aria", "Aiden", "Scarlett", "Matthew", "Victoria", "Samuel", "Madison"]
        last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"]
        locations = ["New York, NY", "London, UK", "Remote", "San Francisco, CA", "Berlin, Germany", "Toronto, Canada", "Sydney, Australia", "Tokyo, Japan", "Austin, TX", "Paris, France"]
        
        users = []
        for i in range(50):
            fn = random.choice(first_names)
            ln = random.choice(last_names)
            username = f"seed_user_{i}_{fn.lower()}"
            email = f"{username}@example.com"
            
            user = User.objects.create_user(
                username=username,
                email=email,
                password="TestPassword123!",
                first_name=fn,
                last_name=ln
            )
            UserProfile.objects.create(user=user)
            users.append(user)
            
            # For 70% of users, update their Profile
            profile = user.profile
            if random.random() > 0.3:
                profile.location = random.choice(locations)
                profile.availability = random.choice(['weekends', 'evenings', 'weekdays', 'flexible'])
                if random.random() > 0.4:
                    # Generic avatar placeholder
                    profile.photo = f"https://api.dicebear.com/7.x/avataaars/svg?seed={username}"
                profile.save()

        # 5. Assign Skills to Users
        self.stdout.write("Assigning skills to users...")
        for user in users:
            profile = user.profile
            # 1-4 offered skills
            offered = random.sample(all_skill_objs, random.randint(1, 4))
            for s in offered:
                UserSkillOffered.objects.get_or_create(user=profile, skill=s)
            
            # 1-4 wanted skills
            wanted = random.sample(all_skill_objs, random.randint(1, 4))
            for s in wanted:
                # Make sure it's not already in offered
                if s not in offered:
                    UserSkillWanted.objects.get_or_create(user=profile, skill=s)

        # 6. Generate Swaps and Ratings
        self.stdout.write("Generating Swaps and Ratings...")
        statuses = ['pending', 'accepted', 'rejected', 'cancelled', 'completed']
        notes = ["Hey! Let's swap these skills.", "I am very interested in learning this.", "Available on weekends, let's do this!", ""]
        comments = ["Great teacher!", "Really knowledgeable.", "Awesome session.", "Could be better.", "Loved it!"]

        for requester in users:
            # Each user makes 2-5 requests
            num_requests = random.randint(2, 5)
            for _ in range(num_requests):
                receiver = random.choice(users)
                if requester == receiver:
                    continue
                
                # Try to find a matching skill set or just pick random available ones from their profiles
                req_wanted = list(UserSkillWanted.objects.filter(user=requester.profile))
                if not req_wanted: continue
                
                rec_wanted = list(UserSkillWanted.objects.filter(user=receiver.profile))
                if not rec_wanted: continue

                skill_wanted = random.choice(req_wanted).skill
                skill_offered = random.choice(rec_wanted).skill
                
                status = random.choice(statuses)
                
                swap, created = SwapRequest.objects.get_or_create(
                    requester=requester,
                    receiver=receiver,
                    skill_offered=skill_offered,
                    skill_wanted=skill_wanted,
                    defaults={'status': status, 'note': random.choice(notes)}
                )

                if created:
                    # Give it a somewhat random historical dates
                    swap.created_at = timezone.now() - timedelta(days=random.randint(1, 60))
                    swap.save()

                    if status == 'completed':
                        # High chance of good rating, low chance of bad rating
                        # Determine quality based on random roll
                        if random.random() > 0.2:
                            score_requester = random.randint(4, 5)
                            score_receiver = random.randint(4, 5)
                        else:
                            score_requester = random.randint(1, 3)
                            score_receiver = random.randint(1, 3)

                        # Requester rates receiver
                        if not hasattr(swap, 'ratings') or not swap.ratings.filter(rater=requester).exists():
                            Rating.objects.create(
                                swap=swap,
                                rater=requester,
                                ratee=receiver,
                                score=score_requester,
                                comment=random.choice(comments)
                            )
                        
                        # Receiver rates requester
                        if random.random() > 0.3:  # 70% chance both rated
                            if not swap.ratings.filter(rater=receiver).exists():
                                Rating.objects.create(
                                    swap=swap,
                                    rater=receiver,
                                    ratee=requester,
                                    score=score_receiver,
                                    comment=random.choice(comments)
                                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database!'))
        self.stdout.write(self.style.SUCCESS(f'Demo User Example: Username: {users[0].username} Password: TestPassword123!'))

