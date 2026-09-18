import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getImageUrl } from '../utils';

export default function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [myProfile, setMyProfile] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Modal states
    const [offeredSki, setOfferedSki] = useState('');
    const [wantedSki, setWantedSki] = useState('');

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        const url = id ? `http://127.0.0.1:8000/api/profile/${id}/` : `http://127.0.0.1:8000/api/profile/me/`;

        const p1 = fetch(url, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.json());
        const p2 = id ? fetch('http://127.0.0.1:8000/api/profile/me/', { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.json()) : Promise.resolve(null);

        Promise.all([p1, p2])
            .then(([targetProfile, myProf]) => {
                setProfile(targetProfile);
                if (myProf) setMyProfile(myProf);
                setLoading(false);

                // Auto-open modal if directed by Browse page
                if (searchParams.get('action') === 'request' && id && targetProfile?.is_public) {
                    setShowModal(true);
                }
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, [navigate, id, searchParams]);

    useEffect(() => {
        if (!profile || !profile.user) return;
        fetch(`http://127.0.0.1:8000/api/users/${profile.user.id}/ratings/`)
            .then(res => res.json())
            .then(data => setRatings(data))
            .catch(err => console.error(err));
    }, [profile]);

    if (loading) return null;

    if (id && profile && !profile.is_public && myProfile?.user?.id !== profile.user?.id) {
        return (
            <main className="w-full pt-16 bg-surface-base relative min-h-screen">
                <div className="max-w-6xl mx-auto px-gutter py-space-xl">
                    <div className="flex items-center justify-between mb-space-lg">
                        <Link to="/browse" className="inline-flex items-center gap-space-xs font-label-md text-label-md text-text-muted hover:text-text-primary transition-colors group">
                            <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-0.5 transform duration-150">arrow_back</span>
                            <span>Back to Browse</span>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-[64px] text-text-secondary mb-space-md">lock</span>
                        <h1 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">Private Profile</h1>
                        <p className="font-body-lg text-body-lg text-text-secondary max-w-md">This user has set their profile to private. You cannot view their skills or request a swap.</p>
                    </div>
                </div>
            </main>
        );
    }

    const handleRequestSwap = async (e) => {
        e.preventDefault();
        if (!offeredSki || !wantedSki) return;

        const token = localStorage.getItem('access_token');
        const res = await fetch('http://127.0.0.1:8000/api/swaps/', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                receiver_id: profile.user.id,
                skill_offered_id: offeredSki,
                skill_wanted_id: wantedSki,
                note: "Hey! I'd love to swap with you."
            })
        });

        if (res.ok) {
            setShowModal(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
        }
    };

    return (
        <main className="w-full pt-16 bg-surface-base relative min-h-screen">
            <div className="max-w-6xl mx-auto px-gutter py-space-xl">
                <div className="flex flex-col w-full">

                    <div className="flex items-center justify-between mb-space-lg">
                        <Link to="/browse" className="inline-flex items-center gap-space-xs font-label-md text-label-md text-text-muted hover:text-text-primary transition-colors group">
                            <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-0.5 transform duration-150">arrow_back</span>
                            <span>Back to Browse</span>
                        </Link>
                    </div>

                    <div className="relative bg-surface-card rounded-xl p-space-lg md:p-space-xl shadow-xl overflow-hidden mb-space-xl">
                        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg min-w-0">
                                <div className="relative flex-shrink-0">
                                    <img className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md" alt="Profile avatar" src={getImageUrl(profile?.photo)} />
                                    <div className="absolute -bottom-1 -right-1 bg-surface-card p-1 rounded-full shadow-sm" title="Verified Peer">
                                        <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    </div>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex flex-wrap items-center gap-space-sm mb-space-xs">
                                        <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight truncate">{profile?.user?.first_name} {profile?.user?.last_name}</h1>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-surface-elevated text-text-muted font-caption text-caption">
                                            <span className="material-symbols-outlined text-[13px] text-primary">public</span>
                                            Public Profile
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-md text-body-md text-text-muted mb-space-md">
                                        <span className="inline-flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-text-secondary">location_on</span>
                                            {profile?.location || 'Location Not Set'}
                                        </span>
                                        <span className="text-secondary-container">•</span>
                                        <span className="inline-flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-text-secondary">calendar_today</span>
                                            {profile?.date_joined ? `Joined ${new Date(profile.date_joined).toLocaleDateString('default', { month: 'long', year: 'numeric' })}` : 'Joined recently'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-space-xs">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-accepted-bg text-status-accepted font-label-sm text-label-sm capitalize">
                                            <span className="w-1.5 h-1.5 rounded-full bg-status-accepted animate-pulse"></span>
                                            Available {profile?.availability || 'flexible'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-space-md flex-shrink-0 pt-space-md lg:pt-0 border-t lg:border-t-0 border-surface-container-high">
                                {id ? (
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed-dim transition-all shadow-md active:translate-y-0.5 cursor-pointer"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                                        <span>Request Swap</span>
                                    </button>
                                ) : (
                                    <Link
                                        to="/profile/edit"
                                        className="inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-surface-elevated text-text-primary font-label-md text-label-md hover:bg-surface-container-high transition-all shadow-sm active:translate-y-0.5 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                        <span>Edit Profile</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="mt-space-md pt-space-md border-t border-surface-container-high flex flex-wrap items-center gap-space-lg font-caption text-caption text-text-muted">
                            <div className="flex items-center gap-1.5">
                                <div className="flex items-center text-status-pending">
                                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                                <span className="font-label-md text-label-md text-text-primary">{profile?.trust_score && profile?.trust_score > 0 ? (Math.round(profile.trust_score * 10) / 10).toFixed(1) : 'New'}</span>
                                <span>({ratings.length || 0} reviews)</span>
                            </div>
                            <span className="text-border-strong">•</span>
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-status-accepted">task_alt</span>
                                <span className="font-label-md text-label-md text-text-primary">{(profile?.completion_rate && profile.completion_rate <= 1 ? profile.completion_rate * 100 : 100).toFixed(0)}%</span>
                                <span>Completion</span>
                            </div>
                            <span className="text-border-strong">•</span>
                            <div className="flex items-center gap-1.5">
                                <span>Completed Swaps:</span>
                                <span className="font-label-md text-label-md text-text-primary">{profile?.completed_swaps || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                        <div className="lg:col-span-7 flex flex-col gap-space-lg">
                            <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                                <div className="flex items-center justify-between mb-space-md">
                                    <div className="flex items-center gap-space-xs">
                                        <span className="material-symbols-outlined text-[20px] text-primary">arrow_upward</span>
                                        <h2 className="font-title-md text-title-md text-text-primary tracking-tight">Skills Offered</h2>
                                        <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-text-secondary font-label-sm text-label-sm">{profile?.skills_offered?.length || 0}</span>
                                    </div>
                                    <span className="font-caption text-caption text-text-muted">High proficiency</span>
                                </div>

                                <div className="flex flex-col gap-space-md">
                                    {profile?.skills_offered?.map((skill, i) => (
                                        <div key={i} className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                                            <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                                                <div className="flex items-center gap-space-sm">
                                                    <span className="font-title-md text-title-md text-text-primary">{skill.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                                <div className="flex items-center justify-between mb-space-md">
                                    <div className="flex items-center gap-space-xs">
                                        <span className="material-symbols-outlined text-[20px] text-tertiary">arrow_downward</span>
                                        <h2 className="font-title-md text-title-md text-text-primary tracking-tight">Skills Wanted</h2>
                                        <span className="px-2 py-0.5 rounded-full bg-badge-wanted-bg text-text-secondary font-label-sm text-label-sm">{profile?.skills_wanted?.length || 0}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-space-md">
                                    {profile?.skills_wanted?.map((skill, i) => (
                                        <div key={i} className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                                            <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                                                <div className="flex items-center gap-space-sm">
                                                    <span className="font-title-md text-title-md text-text-primary">{skill.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="lg:col-span-5 flex flex-col gap-space-lg">
                            <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                                <div className="flex items-center justify-between mb-space-md">
                                    <h2 className="font-title-md text-title-md text-text-primary tracking-tight">Feedback History</h2>
                                </div>

                                <div className="flex flex-col gap-space-lg">
                                    {ratings.length === 0 ? (
                                        <p className="font-body-md text-text-muted py-2">No feedback yet.</p>
                                    ) : ratings.map(rating => (
                                        <div key={rating.id} className="flex flex-col pb-space-md border-b border-surface-container-high last:border-b-0 last:pb-0">
                                            <div className="flex items-center justify-between mb-space-xs">
                                                <div className="flex items-center gap-space-sm">
                                                    <img className="w-7 h-7 rounded-full object-cover" alt="Rater Profile" src={getImageUrl(rating.rater?.profile?.photo)} />
                                                    <div>
                                                        <span className="font-label-md text-label-md text-text-primary">{rating.rater?.username}</span>
                                                        <span className="font-caption text-caption text-text-muted ml-1">• {new Date(rating.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-status-pending text-caption font-label-sm text-label-sm">
                                                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="ml-0.5 text-text-primary">{rating.score}.0</span>
                                                </div>
                                            </div>
                                            <p className="font-body-md text-body-md text-text-secondary mt-1 leading-relaxed">
                                                "{rating.comment}"
                                            </p>
                                            {rating.swap && (
                                                <div className="flex items-center gap-1.5 mt-space-sm font-caption text-caption text-text-muted">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                                                    <span>{rating.swap.skill_offered?.name} ↔ {rating.swap.skill_wanted?.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-gutter transition-opacity duration-200">
                        <div className="bg-surface-elevated rounded-xl max-w-lg w-full p-space-lg shadow-2xl transform transition-transform duration-200">
                            <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high mb-space-md">
                                <div className="flex items-center gap-space-xs">
                                    <span className="material-symbols-outlined text-[20px] text-primary">sync_alt</span>
                                    <h3 className="font-headline-md text-headline-md text-text-primary">Propose a Swap with Marcus</h3>
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-lg" type="button">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleRequestSwap} className="flex flex-col gap-space-md">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm text-text-secondary">Which of your skills will you teach?</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container"
                                        value={offeredSki}
                                        onChange={(e) => setOfferedSki(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a skill you offer...</option>
                                        {myProfile?.skills_offered?.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm text-text-secondary">Which skill do you want to learn from {profile?.user?.first_name}?</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container"
                                        value={wantedSki}
                                        onChange={(e) => setWantedSki(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select a skill they offer...</option>
                                        {profile?.skills_offered?.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm text-text-secondary">Proposal Note &amp; Availability</label>
                                    <textarea className="w-full p-3 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md placeholder-text-muted focus:outline-none focus:bg-surface-container resize-none" placeholder="Hey Marcus, saw you're interested in design system fundamentals. I'd love to exchange that for your Python testing expertise..." rows="3"></textarea>
                                </div>
                                <div className="flex items-center justify-end gap-space-sm pt-space-sm">
                                    <button onClick={() => setShowModal(false)} className="px-space-md py-2 rounded-lg text-text-secondary hover:text-text-primary font-label-md text-label-md hover:bg-surface-container transition-colors" type="button">
                                        Cancel
                                    </button>
                                    <button className="px-space-lg py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed-dim transition-all shadow-sm" type="submit">
                                        Send Proposal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                showToast && (
                    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-surface-container-high px-space-md py-3 rounded-xl shadow-xl transition-all duration-300">
                        <span className="material-symbols-outlined text-[20px] text-primary">check_circle</span>
                        <span className="font-label-md text-label-md text-text-primary">Swap proposal sent to Marcus!</span>
                    </div>
                )
            }
        </main >
    );
}
