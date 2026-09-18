import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
    const [recentRatings, setRecentRatings] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/ratings/recent/')
            .then(res => res.json())
            .then(data => setRecentRatings(data))
            .catch(err => console.error("Error fetching recent ratings:", err));
    }, []);

    return (
        <main className="w-full pt-16 bg-surface-base min-h-screen">
            <div className="flex flex-col w-full">
                <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between px-margin-mobile lg:px-margin max-w-7xl mx-auto pt-space-xl pb-space-xl overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <img
                            src="https://lh3.googleusercontent.com/aida/AEtjO1WnESZLjM3kxWDSip3FJUSiCmS774_U_4nnGLU8m6GqmlQfVXR1EA7Tcya6tBcuXmx8uPnLye-EE9eZUvdWUX_1AkUs4UeauSNsooTCN8MRL-T1cOvuSphkNSYnjxkb9usIkdrOEieaoY9mUTUHL_g7anQL7ZOnwH44mnIxv-jRVQ5ScCiww7T5P6MlNC0XZ9N088B24EpOUxog7Y629A9HOzkErEQUGHaAQmow_olhCSXlq3EFa0mIgDeZ"
                            alt="Two university students studying together in library"
                            className="w-full h-full object-cover object-center"
                            style={{ opacity: 0.8 }}
                        />
                        <div className="absolute inset-0 bg-surface-base/80 backdrop-blur-[1px]" style={{ backgroundColor: 'rgba(18, 20, 23, 0.4)' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/70 to-surface-base/90" style={{ background: 'linear-gradient(to top, rgba(18, 20, 23, 0.95) 0%, rgba(18, 20, 23, 0.35) 50%, rgba(18, 20, 23, 0.6) 100%)' }}></div>
                    </div>

                    <div className="absolute -top-32 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-12 -left-20 w-80 h-80 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="my-auto flex flex-col items-start max-w-4xl relative z-10">
                        <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-card mb-space-lg">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="font-label-sm text-label-sm text-text-secondary tracking-wide uppercase">No Currency • 1-on-1 Reciprocity</span>
                        </div>

                        <h1 className="font-headline-xl text-headline-xl sm:text-[46px] sm:leading-[54px] lg:text-[56px] lg:leading-[64px] text-text-primary font-bold tracking-tight mb-space-lg">
                            Trade what you know for <br className="hidden sm:inline" />
                            <span className="text-primary">what you want to learn.</span>
                        </h1>

                        <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mb-space-xl leading-relaxed">
                            A simple platform for developers, designers, and students to trade knowledge 1-on-1. Offer what you're good at, learn what you need.
                        </p>

                        <div className="flex flex-wrap items-center gap-space-md mb-space-xl w-full sm:w-auto">
                            <Link to="/browse" className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary-container text-text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-200">
                                <span>Explore Community Swaps</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                            <a href="#how-it-works-brief" className="inline-flex items-center justify-center px-space-lg py-space-sm rounded-lg bg-surface-card text-text-secondary font-label-md text-label-md hover:bg-surface-elevated hover:text-text-primary transition-all duration-200">
                                How Reciprocity Works
                            </a>
                        </div>

                        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-space-sm pt-space-md">
                            <span className="font-caption text-caption text-text-muted uppercase tracking-wider">Quick browse topics:</span>
                            <div className="flex flex-wrap items-center gap-space-xs">
                                <Link to="/browse?q=Python" className="px-space-sm py-1 rounded bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-primary font-label-sm text-label-sm transition-colors">Python</Link>
                                <Link to="/browse?q=Figma" className="px-space-sm py-1 rounded bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-primary font-label-sm text-label-sm transition-colors">Figma</Link>
                                <Link to="/browse?q=PostgreSQL" className="px-space-sm py-1 rounded bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-primary font-label-sm text-label-sm transition-colors">PostgreSQL</Link>
                                <Link to="/browse?q=Django" className="px-space-sm py-1 rounded bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-primary font-label-sm text-label-sm transition-colors">Django</Link>
                                <Link to="/browse?q=React" className="px-space-sm py-1 rounded bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-primary font-label-sm text-label-sm transition-colors">React</Link>
                            </div>
                        </div>
                    </div>

                    <div className="w-full pt-space-xl mt-space-lg relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                            <div className="p-space-lg rounded-xl bg-surface-card">
                                <div className="flex items-center gap-space-sm mb-space-sm text-primary">
                                    <span className="material-symbols-outlined text-[20px]">handshake</span>
                                    <span className="font-title-md text-title-md text-text-primary">1-on-1 Sessions</span>
                                </div>
                                <p className="font-body-md text-body-md text-text-muted">
                                    Direct coordination over your choice of video call or paired screen-share. No rigid classroom agendas.
                                </p>
                            </div>
                            <div className="p-space-lg rounded-xl bg-surface-card">
                                <div className="flex items-center gap-space-sm mb-space-sm text-primary">
                                    <span className="material-symbols-outlined text-[20px]">currency_exchange</span>
                                    <span className="font-title-md text-title-md text-text-primary">Equal Time Value</span>
                                </div>
                                <p className="font-body-md text-body-md text-text-muted">
                                    One hour of your knowledge for one hour of theirs. Free from monetary transactions or hidden tokens.
                                </p>
                            </div>
                            <div className="p-space-lg rounded-xl bg-surface-card">
                                <div className="flex items-center gap-space-sm mb-space-sm text-primary">
                                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                                    <span className="font-title-md text-title-md text-text-primary">Mutual Accountability</span>
                                </div>
                                <p className="font-body-md text-body-md text-text-muted">
                                    Community feedback confirmed strictly after both parties mark the swap as completed.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-space-xl bg-surface-card/60 overflow-hidden relative" id="verified-exchanges">
                    <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin mb-space-lg flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-primary text-[18px]">sync_alt</span>
                            <span className="font-label-md text-label-md text-text-primary tracking-wide uppercase">Recent Peer Exchanges</span>
                        </div>
                        <span className="font-caption text-caption text-text-muted">Live unedited community exchanges</span>
                    </div>

                    <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <div className="flex gap-space-md shrink-0 animate-marquee items-stretch py-space-xs">
                            {[1, 2].map((groupIndex) => (
                                <React.Fragment key={groupIndex}>
                                    {recentRatings.map(rating => (
                                        <div key={rating.id} className="w-[380px] sm:w-[440px] p-space-md rounded-lg bg-surface-elevated flex flex-col justify-between shrink-0">
                                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed mb-space-md">
                                                “{rating.comment}”
                                            </p>
                                            <div className="flex items-center justify-between pt-space-xs text-text-muted font-caption text-caption">
                                                <span className="text-primary font-label-sm">{rating.swap?.skill_offered?.name} ↔ {rating.swap?.skill_wanted?.name}</span>
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {rating.score}.0
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {recentRatings.length === 0 && (
                                        <div className="w-[380px] sm:w-[440px] p-space-md rounded-lg bg-surface-elevated flex flex-col justify-between shrink-0">
                                            <p className="font-body-md text-body-md text-text-secondary leading-relaxed mb-space-md">
                                                “Skill Swap helped me trade Python tutoring for Figma classes!”
                                            </p>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-space-xl px-margin-mobile lg:px-margin max-w-7xl mx-auto" id="how-it-works-brief">
                    <div className="p-space-lg sm:p-space-xl rounded-xl bg-surface-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
                        <div className="max-w-xl">
                            <h2 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm">Ready to offer what you know?</h2>
                            <p className="font-body-md text-body-md text-text-secondary">
                                No sign-up fee, no subscription, no sponsored listings. Just publish your skills, request an exchange, and confirm your session.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-space-sm">
                            <Link to="/login" className="px-space-lg py-space-sm rounded-lg bg-primary-container text-text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors">
                                Create Member Profile
                            </Link>
                            <button type="button" className="px-space-md py-space-sm rounded-lg bg-surface-elevated text-text-secondary hover:text-text-primary font-label-md text-label-md transition-colors">
                                Read Guidelines
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
