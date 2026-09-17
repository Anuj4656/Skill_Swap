# Skill Swap Platform — PRD (Planning Reference)

**Type:** College mini project
**Owner:** Solo
**Deadline:** September 21
**Stack:** Django + DRF (backend), React 18 + Vite + Tailwind V4 (frontend), PostgreSQL, JWT auth
**Design:** V2 Dark-Mode (Quiet Craft Community via Stitch)

---

## 1. Overview

A platform where users list skills they offer and skills they want, then request
and arrange swaps with other users. Includes ratings, a skill taxonomy with
moderation, a trust score, and an admin role for platform management.

## 2. Scope

### In scope (core spec)

- User profile: name, location (optional), photo (optional), availability,
  public/private toggle
- List skills offered / skills wanted per user
- Browse and search users by skill
- Swap request lifecycle: create → accept / reject / cancel
- Requester can delete a pending (unaccepted) swap request
- Ratings/feedback after a completed swap
- Admin: reject spammy/inappropriate skill entries, ban users, monitor
  pending/accepted/cancelled swaps, send platform-wide messages, download
  activity/feedback/swap reports

### In scope (differentiators, kept simple)

- **Skill taxonomy with approval flow** — fixed `SkillCategory` list; skills
  are autocomplete-or-create against existing `Skill` rows; new skills start
  unapproved until admin approves, satisfying the "reject spammy skills"
  admin feature directly.
- **Trust score** — computed from rating average + swap completion rate,
  shown next to star ratings.
- **Admin analytics** — handled via Django's built-in admin (custom
  `list_display` / filters), no custom dashboard UI needed.

### Explicitly out of scope (dropped for deadline)

- **In-app messaging** — replaced by a single optional `note` field on a
  swap request for coordination.
- **Time-banking ledger** — cut entirely; not part of the original spec,
  too much added surface area for a 4-day solo build.
- Email notifications — in-app/dashboard visibility is enough.

## 3. Data Model

```
User (Django built-in)

UserProfile
  - user            → OneToOne(User)
  - location         (optional)
  - photo            (optional)
  - availability     (choices: weekends/evenings/weekdays/flexible)
  - is_public        (bool, default True)
  - is_banned        (bool, default False)
  - trust_score      (decimal, computed)

SkillCategory
  - name             (unique)

Skill
  - name             (unique, case-insensitive)
  - category         → FK(SkillCategory)
  - is_approved      (bool, default False)
  - created_by       → FK(User, nullable)

UserSkillOffered
  - user             → FK(UserProfile)
  - skill            → FK(Skill)
  - unique_together: (user, skill)

UserSkillWanted
  - user             → FK(UserProfile)
  - skill            → FK(Skill)
  - unique_together: (user, skill)

SwapRequest
  - requester        → FK(User, related_name="sent_requests")
  - receiver         → FK(User, related_name="received_requests")
  - skill_offered    → FK(Skill)
  - skill_wanted     → FK(Skill)
  - status           (choices: pending/accepted/rejected/cancelled/completed)
  - note             (optional text)
  - created_at, updated_at
  - constraint: requester != receiver

Rating
  - swap             → FK(SwapRequest)
  - rater            → FK(User)
  - ratee            → FK(User)
  - score             (int, 1-5)
  - comment          (optional text)
  - created_at

AdminAction
  - admin            → FK(User)
  - action_type      (choices: ban_user / reject_skill / broadcast)
  - target_id        (int)
  - reason           (optional text)
  - created_at

PlatformMessage
  - message          (text)
  - created_at
  - is_active        (bool)
```

**Notes:**

- Trust score = `avg_rating * 0.6 + completion_rate * 0.4`, capped 0–5;
  computed on read (property/serializer field), not stored as source of truth
  unless list-view performance requires caching it.
- `Skill.name` uniqueness enforced case-insensitively.
- Business rule "receiver must actually offer skill_wanted" enforced in the
  serializer, not the DB.

## 4. API Endpoints (draft)

```
Auth
  POST   /api/auth/register/
  POST   /api/auth/login/                (JWT)
  POST   /api/auth/refresh/

Profile
  GET    /api/profile/me/
  PATCH  /api/profile/me/
  GET    /api/profile/<id>/              (public view, respects is_public)

Skills
  GET    /api/skills/?search=&category=  (approved only, for browse/search)
  POST   /api/skills/                    (create new → is_approved=False)
  GET    /api/categories/

User Skills
  GET    /api/profile/me/offered/
  POST   /api/profile/me/offered/
  DELETE /api/profile/me/offered/<id>/
  GET    /api/profile/me/wanted/
  POST   /api/profile/me/wanted/
  DELETE /api/profile/me/wanted/<id>/

Browse
  GET    /api/users/?skill=<name>        (search users by skill)

Swap Requests
  GET    /api/swaps/                     (mine: sent + received)
  POST   /api/swaps/
  PATCH  /api/swaps/<id>/accept/
  PATCH  /api/swaps/<id>/reject/
  DELETE /api/swaps/<id>/                (only if status=pending, requester only)

Ratings
  POST   /api/swaps/<id>/rate/
  GET    /api/users/<id>/ratings/

Admin (is_staff only)
  GET    /api/admin/skills/pending/
  PATCH  /api/admin/skills/<id>/approve/
  PATCH  /api/admin/skills/<id>/reject/
  PATCH  /api/admin/users/<id>/ban/
  GET    /api/admin/swaps/               (all, filterable by status)
  POST   /api/admin/broadcast/
  GET    /api/admin/reports/             (CSV/JSON export)
```

## 5. Open Questions / Assumptions

- Non-functional standards (error response shape, pagination defaults) not
  yet decided — will default to DRF conventions during implementation.
- Report export format assumed CSV unless decided otherwise later.
