# Skill Swap Platform — Design Document

## 1. Overview

Skill Swap is a community-based platform that helps people exchange skills instead of money. Users can create profiles, list the skills they can teach or learn, search for others by skill, and request skill exchanges in a simple and trustworthy way.

The product is intended to feel familiar and approachable, similar to a lightweight community marketplace, but more structured and trust-oriented than a generic classifieds app. It focuses on usability, clear status tracking, and transparent exchange history.

## 2. Product Goal

The core goal is to make skill exchange easy, safe, and visible.

Users should be able to:

- discover people who can help them learn a skill
- advertise their own skills for others to discover
- request exchanges with clear intent and context
- track the lifecycle of each request from creation to completion
- build trust through ratings and completion history
- manage profile visibility and skill listings without friction

## 3. Design Direction

### Overall aesthetic

- Minimal, card-based interface
- Dark-mode-first aesthetic (slate, charcoals, teal accents)
- One accent color for primary actions and key states
- Clear status colors for pending, accepted, rejected, and completed requests
- System font scaling with `Manrope` typography
- Deep backgrounds with elevated surface cards for readability
- Functional, community-oriented feel rather than highly gamified visuals

### Visual system

- Neutral base palette: deep slate `#111316`, surface `#1a1c1f`, elevated card `#1f242b`
- Primary action color: `#7ed6cb` (Soft teal)
- Status colors:
  - Pending: amber (`#D97706`)
  - Accepted: emerald (`#10B981`)
  - Rejected: rose (`#E11D48`)
  - Completed: blue (`#3B82F6`)
- Icons utilized for navigation mapping and swap status identifiers

### UX principles

- Fast browsing and simple search
- Scannable user cards and skill tags
- Minimal friction for sending and managing swap requests
- Clear visibility of status and trust signals
- Mobile-friendly layout with desktop-first design priorities

## 4. Target Users

### 1. Skill learner

A person looking to improve a skill such as design, coding, language learning, office workflows, or other practical abilities.

### 2. Skill provider

A person with useful expertise willing to trade their time or guidance with another user.

### 3. Platform admin

A moderator or staff user responsible for approving skills, managing inappropriate entries, and monitoring request activity.

## 5. Core User Flows

### Authentication

- Sign up with name, email, and password
- Log in using email/username and password
- Recover access or navigate to registration from login

### Browse and discovery

- Search by skill name
- Filter by category
- Browse user cards in a grid layout
- Open a public profile to learn more

### Swap request flow

- View another user’s public profile
- Choose a skill they offer that you want to learn
- Choose a skill you can offer in return
- Optionally add a note
- Submit a swap request
- Track request status in the dashboard

### Completion and trust

- Accept or reject incoming requests
- Mark accepted swaps as complete
- Leave a rating after the exchange is completed
- View trust score and ratings in user profiles

## 6. Screen Requirements

### 6.1 Landing screen (New Entry Point)

This represents the primary onboarding screen prior to login.

Required elements:
- Hero branding introducing the 1-on-1 peer exchange mission
- Quick-filter topic badges for unauthenticated preview
- Looping community swap examples (marquee-style scrolling list)
- Primary CTA to explore the platform or create an account

---

### 6.2 Auth screens

#### Login

- Email or username field
- Password field
- “Remember me” optional
- Link to registration
- Primary CTA: Log in

#### Register

- Full name
- Email
- Password
- Confirm password
- CTA: Create account

---

### 6.2 Browse / Search screen

This is the main home screen after login.

Required elements:

- Search bar for skill discovery
- Category filters (Design, Programming, Office, Language, Other)
- User card grid
- Each card should show:
  - profile photo or placeholder
  - name
  - location (if available)
  - availability status
  - top 2–3 offered skills
  - trust score / rating summary
- Clicking a card opens the public profile

---

### 6.3 Public profile

This screen shows another person’s profile without editing access.

Required elements:

- Profile photo
- Name
- Location
- Availability
- Skills offered tags
- Skills wanted tags
- Trust score and star rating summary
- “Request Swap” action button

Interaction:

- Clicking “Request Swap” opens a modal or dedicated form

---

### 6.4 My Profile (editable)

This screen mirrors the public profile but includes controls for editing.

Required elements:

- Profile photo uploader
- Name and location fields
- Availability selector
- Public/private visibility toggle
- Skills offered list with add/remove actions
- Skills wanted list with add/remove actions
- Ability to add a new skill and mark it as pending approval if not yet approved
- Save or update profile action

Recommended UX:

- Use autocomplete for skill entry
- Allow “create new skill” when no match is found
- Flag new skills with a pending approval badge

---

### 6.5 Swap Requests dashboard

This is the user’s central request management view.

Required structure:

- Two tabs/sections: Sent and Received
- Each request card or row should include:
  - other user’s name
  - skill offered vs. skill wanted
  - status badge
  - optional note
  - contextual action buttons

Status-specific actions:

- Received + pending: Accept / Reject
- Sent + pending: Cancel / Delete
- Accepted: Mark Completed
- Completed: Leave Rating if not already given

---

### 6.6 New Swap Request form

This should appear as a modal or dedicated page.

Required fields:

- Desired skill they want from the other user
- Skill they are offering in exchange
- Optional note for context
- Submit button

Validation:

- User cannot send a request to themselves
- Receiver must actually offer the requested skill
- The user’s selected offered skill should be valid and relevant

---

### 6.7 Rating modal

This appears after a completed exchange.

Required fields:

- Star rating from 1 to 5
- Optional comment field
- Submit action

Outcome:

- Rating updates user trust signal and feedback history

---

### 6.8 Admin screens

Admin views are not a priority for the first visual design pass. Django’s built-in admin can be used unless more time is available.

Optional simplified admin screen:

- Pending skills approval queue
- User bans and moderation actions
- Swap status monitoring

## 7. Reusable UI Components

To keep the interface consistent, the design should reuse a small set of shared components.

### User card

Used across the browse/search screen.

Includes:

- photo or avatar
- name
- location
- availability tag
- offered skills
- trust/rating summary

### Skill chip

Used in profiles and request forms.

Includes:

- skill name
- category color or subtle style treatment
- optional pending approval indicator

### Swap request row

Used in both sent and received dashboards.

Includes:

- counterpart user
- skill exchange summary
- status badge
- note
- actions relevant to the current state

## 8. Product Data Model

```text
User (Django built-in)

UserProfile
  - user            → OneToOne(User)
  - location        (optional)
  - photo           (optional)
  - availability    (weekends, evenings, weekdays, flexible)
  - is_public       (bool, default True)
  - is_banned       (bool, default False)
  - trust_score     (computed)

SkillCategory
  - name            (unique)

Skill
  - name            (unique, case-insensitive)
  - category        → FK(SkillCategory)
  - is_approved     (bool, default False)
  - created_by      → FK(User, nullable)

UserSkillOffered
  - user            → FK(UserProfile)
  - skill           → FK(Skill)
  - unique_together: (user, skill)

UserSkillWanted
  - user            → FK(UserProfile)
  - skill           → FK(Skill)
  - unique_together: (user, skill)

SwapRequest
  - requester       → FK(User)
  - receiver        → FK(User)
  - skill_offered   → FK(Skill)
  - skill_wanted    → FK(Skill)
  - status          (pending, accepted, rejected, cancelled, completed)
  - note            (optional)
  - created_at
  - updated_at

Rating
  - swap            → FK(SwapRequest)
  - rater           → FK(User)
  - ratee           → FK(User)
  - score           (1–5)
  - comment         (optional)
  - created_at
```

### Trust score

Trust score is derived from rating quality and swap completion history. It should be visible near user ratings but does not need to be stored as the source of truth unless performance requires it.

## 9. API Draft

### Authentication

- `POST /api/auth/register/`
- `POST /api/auth/login/` using JWT
- `POST /api/auth/refresh/`

### Profiles

- `GET /api/profile/me/`
- `PATCH /api/profile/me/`
- `GET /api/profile/<id>/`

### Skills

- `GET /api/skills/?search=&category=`
- `POST /api/skills/`
- `GET /api/categories/`

### User skill listings

- `GET /api/profile/me/offered/`
- `POST /api/profile/me/offered/`
- `DELETE /api/profile/me/offered/<id>/`
- `GET /api/profile/me/wanted/`
- `POST /api/profile/me/wanted/`
- `DELETE /api/profile/me/wanted/<id>/`

### Browse

- `GET /api/users/?skill=<name>`

### Swap requests

- `GET /api/swaps/`
- `POST /api/swaps/`
- `PATCH /api/swaps/<id>/accept/`
- `PATCH /api/swaps/<id>/reject/`
- `DELETE /api/swaps/<id>/`

### Ratings

- `POST /api/swaps/<id>/rate/`
- `GET /api/users/<id>/ratings/`

### Admin

- `GET /api/admin/skills/pending/`
- `PATCH /api/admin/skills/<id>/approve/`
- `PATCH /api/admin/skills/<id>/reject/`
- `PATCH /api/admin/users/<id>/ban/`
- `GET /api/admin/swaps/`
- `POST /api/admin/broadcast/`

## 10. Open Questions and Assumptions

- Error response format and pagination defaults will follow standard Django REST Framework patterns unless defined later.
- Report export is assumed to be CSV unless there is a product decision to use a different format.
- In-app messaging was intentionally removed to reduce scope and stay focused on the core skill-swap workflow.
- Admin UI may rely on Django’s default admin rather than a custom dashboard in the initial build.

## 11. Wireframe Priority

The design must prioritize screens in this order:

1. Browse / Search
2. Public Profile
3. Swap Requests dashboard
4. My Profile
5. New Swap Request modal
6. Rating modal
7. Auth screens

This approach ensures the product’s main value is visible early: discovery, trust, and request management.

## 12. Summary

Skill Swap is a practical, low-friction skill exchange platform for students and community members. The design should emphasize browsing, trust, and clear status handling over flashy visual treatment. The core experience is built around discovering people, making simple swap requests, and tracking exchanges through completion and feedback.

This project is intentionally scoped to be realistic for a solo build with Django + DRF + React + Vite while still delivering a strong product experience.
