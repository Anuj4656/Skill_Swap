import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetch('http://127.0.0.1:8000/api/profile/me/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching profile:", err);
                setLoading(false);
            });
    }, [navigate]);

    if (loading) return null;

    const handleRequestSwap = (e) => {
        e.preventDefault();
        setShowModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
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
                        <div className="flex items-center gap-space-sm font-caption text-caption text-text-muted">
                            <span className="inline-block w-2 h-2 rounded-full bg-status-accepted"></span>
                            <span>Profile active • Last seen 2h ago</span>
                        </div>
                    </div>

                    <div className="relative bg-surface-card rounded-xl p-space-lg md:p-space-xl shadow-xl overflow-hidden mb-space-xl">
                        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg min-w-0">
                                <div className="relative flex-shrink-0">
                                    <img className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md" alt="Profile avatar" src={profile?.photo || "https://www.gravatar.com/avatar/00?d=mp"} />
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
                                            Joined March 2024
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-space-xs">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-accepted-bg text-status-accepted font-label-sm text-label-sm capitalize">
                                            <span className="w-1.5 h-1.5 rounded-full bg-status-accepted animate-pulse"></span>
                                            Available {profile?.availability}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-space-md flex-shrink-0 pt-space-md lg:pt-0 border-t lg:border-t-0 border-surface-container-high">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed-dim transition-all shadow-md active:translate-y-0.5 cursor-pointer"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                                    <span>Request Swap</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-space-md pt-space-md border-t border-surface-container-high flex flex-wrap items-center gap-space-lg font-caption text-caption text-text-muted">
                            <div className="flex items-center gap-1.5">
                                <div className="flex items-center text-status-pending">
                                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                                <span className="font-label-md text-label-md text-text-primary">4.9</span>
                                <span>(14 reviews)</span>
                            </div>
                            <span className="text-border-strong">•</span>
                            <div className="flex items-center gap-1.5">
                                <span>Completed Swaps:</span>
                                <span className="font-label-md text-label-md text-text-primary">14</span>
                            </div>
                            <span className="text-border-strong">•</span>
                            <div className="flex items-center gap-1.5">
                                <span>Typical Response:</span>
                                <span className="font-label-md text-label-md text-text-primary">&lt; 3h</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                        <div className="lg:col-span-7 flex flex-col gap-space-lg">
                            <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                                <div className="flex items-center justify-between mb-space-xs">
                                    <h2 className="font-title-md text-title-md text-text-primary tracking-tight">About</h2>
                                </div>
                                <p className="font-body-md text-body-md text-text-secondary leading-relaxed">
                                    Backend engineer interested in design craft and hands-on physical hobbies. Usually free Saturdays. Interested in project-grounded exchanges where both peers walk away with functional, real-world skills.
                                </p>
                                <div className="flex flex-wrap items-center gap-space-md mt-space-md pt-space-sm border-t border-surface-container font-caption text-caption text-text-muted">
                                    <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-[15px] text-text-secondary">school</span>Prefers 1-on-1 pairs</span>
                                    <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-[15px] text-text-secondary">videocam</span>Video or In-person (SE Portland)</span>
                                </div>
                            </div>

                            <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                                <div className="flex items-center justify-between mb-space-md">
                                    <div className="flex items-center gap-space-xs">
                                        <span className="material-symbols-outlined text-[20px] text-primary">arrow_upward</span>
                                        <h2 className="font-title-md text-title-md text-text-primary tracking-tight">Skills Offered</h2>
                                        <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-text-secondary font-label-sm text-label-sm">3</span>
                                    </div>
                                    <span className="font-caption text-caption text-text-muted">High proficiency verification</span>
                                </div>

                                <div className="flex flex-col gap-space-md">
                                    <div className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                                        <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                                            <div className="flex items-center gap-space-sm">
                                                <span className="font-title-md text-title-md text-text-primary">Python</span>
                                                <span className="px-2 py-0.5 rounded-lg bg-surface-elevated text-primary font-label-sm text-label-sm">Advanced</span>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-status-accepted font-caption text-caption bg-status-accepted-bg px-2 py-0.5 rounded">
                                                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                                                5 swaps completed
                                            </span>
                                        </div>
                                        <p className="font-body-md text-body-md text-text-secondary">
                                            Core language structures, asynchronous programming, automated testing suites, and data pipelines. Experienced mentoring engineers transitioning into Pythonic code patterns.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-space-xs mt-space-sm">
                                            <span className="px-2 py-0.5 rounded bg-surface-elevated text-text-muted font-caption text-caption">AsyncIO</span>
                                            <span className="px-2 py-0.5 rounded bg-surface-elevated text-text-muted font-caption text-caption">Pytest</span>
                                            <span className="px-2 py-0.5 rounded bg-surface-elevated text-text-muted font-caption text-caption">Performance Profiling</span>
                                        </div>
                                    </div>

                                    <div className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                                        <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                                            <div className="flex items-center gap-space-sm">
                                                <span className="font-title-md text-title-md text-text-primary">PostgreSQL</span>
                                                <span className="px-2 py-0.5 rounded-lg bg-surface-elevated text-primary font-label-sm text-label-sm">Expert</span>
                                            </div>
                                            <span className="inline-flex items-center gap-1 text-status-accepted font-caption text-caption bg-status-accepted-bg px-2 py-0.5 rounded">
                                                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                                                6 swaps completed
                                            </span>
                                        </div>
                                        <p className="font-body-md text-body-md text-text-secondary">
                                            Relational schema architecture, indexing strategies (B-Tree, GIN), query plan inspection, transaction isolation levels, and migration workflows without downtime.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-space-xs mt-space-sm">
                                            <span className="px-2 py-0.5 rounded bg-surface-elevated text-text-muted font-caption text-caption">Query Planning</span>
                                            <span className="px-2 py-0.5 rounded bg-surface-elevated text-text-muted font-caption text-caption">JSONB</span>
                                            <span className="px-2 py-0.5 rounded bg-surface-elevated text-text-muted font-caption text-caption">Indexing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                                <div className="flex items-center justify-between mb-space-md">
                                    <div className="flex items-center gap-space-xs">
                                        <span className="material-symbols-outlined text-[20px] text-tertiary">arrow_downward</span>
                                        <h2 className="font-title-md text-title-md text-text-primary tracking-tight">Skills Wanted</h2>
                                        <span className="px-2 py-0.5 rounded-full bg-badge-wanted-bg text-text-secondary font-label-sm text-label-sm">2</span>
                                    </div>
                                    <span className="font-caption text-caption text-text-muted">Seeking collaborative mentorship</span>
                                </div>

                                <div className="flex flex-col gap-space-md">
                                    <div className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                                        <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                                            <div className="flex items-center gap-space-sm">
                                                <span className="font-title-md text-title-md text-text-primary">Figma &amp; UI Design Systems</span>
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-badge-wanted-bg text-secondary font-caption text-caption">Foundations</span>
                                        </div>
                                        <p className="font-body-md text-body-md text-text-secondary">
                                            Looking to develop deep intuition for design tokens, auto-layout variants, interactive component states, and typographic vertical balance. Ready to trade for rigorous backend architecture pairing.
                                        </p>
                                    </div>

                                    <div className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                                        <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                                            <div className="flex items-center gap-space-sm">
                                                <span className="font-title-md text-title-md text-text-primary">Ceramics &amp; Pottery</span>
                                            </div>
                                            <span className="px-2 py-0.5 rounded bg-badge-wanted-bg text-secondary font-caption text-caption">Beginner</span>
                                        </div>
                                        <p className="font-body-md text-body-md text-text-secondary">
                                            Looking for someone local to Portland with studio access or home wheel setup to teach beginner wheel centering, cylinder pulling, and basic trimming ergonomics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col gap-space-lg">
                            <div className="bg-surface-card rounded-xl p-space-lg shadow-sm">
                                <div className="flex items-center justify-between mb-space-md">
                                    <h2 className="font-title-md text-title-md text-text-primary tracking-tight">Feedback History</h2>
                                </div>

                                <div className="flex flex-col gap-space-lg">
                                    <div className="flex flex-col pb-space-md border-b border-surface-container-high last:border-b-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-space-xs">
                                            <div className="flex items-center gap-space-sm">
                                                <img className="w-7 h-7 rounded-full object-cover" alt="Sarah M" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4cbsl-smd9J9jBo6-mUmBCZVkkUAf7ZWnluzAGvyEyWYxE6GgHEfbMp07y_ZdMCRhFpzQ9QAj55w0yfvFnsyKeGbZsn3CCoBDXbTcec2uflsXaPllrSsYK62mKdam5W882M5OA-tOAs1mhZjvfCA0WOf6NCHaFtPrWEBTn5rGneymENwz-eUAZinu96nY5y4vbDt6nusqqe_0zkkCwkIgviAXM-x_tcBZluIawY81inrhkKU2ndRfmQ" />
                                                <div>
                                                    <span className="font-label-md text-label-md text-text-primary">Sarah M.</span>
                                                    <span className="font-caption text-caption text-text-muted ml-1">• 2 weeks ago</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-status-pending text-caption font-label-sm text-label-sm">
                                                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="ml-0.5 text-text-primary">5.0</span>
                                            </div>
                                        </div>
                                        <p className="font-body-md text-body-md text-text-secondary mt-1 leading-relaxed">
                                            "Marcus was patient and taught me Python data structures from scratch in exchange for Figma prototyping. Highly recommended!"
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-space-sm font-caption text-caption text-text-muted">
                                            <span className="material-symbols-outlined text-[14px] text-primary">swap_horiz</span>
                                            <span>Python ↔ Figma Prototyping</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
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
                                <select className="w-full h-10 px-3 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container">
                                    <option value="ui">Figma &amp; UI Design (Your profile)</option>
                                    <option value="other">Other custom offer...</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="font-label-sm text-label-sm text-text-secondary">Which skill do you want to learn from Marcus?</label>
                                <select className="w-full h-10 px-3 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:bg-surface-container">
                                    <option value="py">Python (Advanced, Core &amp; Testing)</option>
                                    <option value="pg">PostgreSQL (Schema Design &amp; Optimization)</option>
                                    <option value="api">FastAPI (Production REST APIs)</option>
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
            )}

            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-surface-container-high px-space-md py-3 rounded-xl shadow-xl transition-all duration-300">
                    <span className="material-symbols-outlined text-[20px] text-primary">check_circle</span>
                    <span className="font-label-md text-label-md text-text-primary">Swap proposal sent to Marcus!</span>
                </div>
            )}
        </main>
    );
}
