import React, { useState } from 'react';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('received');
    const [activeStatus, setActiveStatus] = useState('all');

    // Hardcoded cards reflecting exact Stitch state
    const cards = [
        {
            id: 1, tab: 'received', status: 'pending',
            title: 'Sarah Miller', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABHYMRq31N1cqT9DsUJ8Q2Ns8yvkVApnimPrHLe8NHWV4hLhW6fWBGMzTcCpZGsO1u4WN-siaFkSaxxse6uaXuUqrm1Yz37hrXJTc_6WWBAmd6Kst4ht4A8xpAeetMdz2Zmw2lXhZ8uH8nNa4GG7Or2tsBmTwllrFEV_a5rKI4_qwv5Jn6BlbiQQTLI1-mMj7HNERSnI8FM-rdKgmH4KpILVvcscCQCpdjNtoHdjDVieBy8qyhIfHGjg',
            location: 'Portland, OR', verified: 18,
            youOffer: { icon: 'school', title: 'Sarah Offers', tags: ['Product Design', 'Design Systems', 'Figma Master'] },
            theyOffer: { icon: 'handyman', title: 'You Give', tags: ['Python', 'FastAPI Setup', 'Async Architecture'] },
            note: "Hey Marcus, saw you wanted Figma & UI design help. I'd love to swap 3 sessions of design systems for FastAPI setup guidance!"
        },
        {
            id: 2, tab: 'received', status: 'accepted',
            title: 'David Adebayo', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASeJwdOnV-6eKVKXXvKZckx5VyYSzA_RgXA3QbX6RoO_hJO8OKogFq1oL5re3Kk329c-7f6QdN0FSaWfvI8w4z8oHOejuKo0Cjuy0g0J5kYn8vhSPY8nYAnjmSmBzV8t5D5FQzHHo9XaeRdYCh1Dka0RoR0XVFrN6ytyolEF1PJTMVILFBVqu5idV3utxuIyDiAcM2tsDQWh58YxeKyB9QL7wNAOIgXUf17r4ayQnf6TPRNrBLo6ESsw',
            location: 'Austin, TX', verified: 'Swap in Progress',
            youOffer: { icon: 'graphic_eq', title: 'David Offers', tags: ['Acoustic Guitar Basics', 'Chord Progressions'] },
            theyOffer: { icon: 'database', title: 'You Give', tags: ['PostgreSQL Tuning', 'Index Optimization'] },
        },
        {
            id: 3, tab: 'sent', status: 'pending',
            title: 'Maya Lin', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiReQ2V06oqat-f44takQXAKs231as-T3VJngzBfbCXU9JW3877kb96MWlLXQHDa62czFaR4jG7uW5rE7C-bPj6U9YrCqbPNfuwPj4Tvbg-OFXqTS4U5ck94No3ap_XBj7n_CUwzWMl19aITmzwbukwkVZGAVheRuvkn2JJ8pw-o9Op49T4pIUeSy-vKO-L7ZnO3xelHGc93autFExLbYJE2ORp5p0aV5vJcbVmbAHucqQU1-w6v2XVg',
            location: 'Seattle, WA', verified: 'Awaiting response',
            youOffer: { icon: 'terminal', title: 'You Offer', tags: ['FastAPI', 'REST Endpoints'] },
            theyOffer: { icon: 'carpenter', title: 'Maya Gives', tags: ['Woodworking Basics', 'Joinery & Tool Care'] },
            note: "Happy to help setup your portfolio API!"
        },
        {
            id: 4, tab: 'past', status: 'completed',
            title: 'Elena Vance', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYYr2Xghp-UrIZ6gg__oET2kalbO7kxYSyQsGLDNRdfARWSA1Kdw3OW60On042FQiIXxJKS-a6ASjjOunNFYRX8ydN_I-V0pvceoruk-C3fy11tV1MtsGZ5JnFZNzslEfyV6QkeKKZWYzEyfMyZJKjEqXMfEI_pj_6bbzarm3NO35rHwHiP_OuSMK3mPYn41P6tB1oMBrFvfXXPDRv3Y6MBUOA26IVBLuxkmLppCnww11lbx8hAnltQA',
            location: 'Completed on Oct 28', verified: '4 hours exchanged',
            completedMode: true
        }
    ];

    const filteredCards = cards.filter(c =>
        (activeTab === 'all' || c.tab === activeTab) &&
        (activeStatus === 'all' || c.status === activeStatus)
    );

    return (
        <main className="w-full pt-16 bg-surface-base">
            <div className="max-w-6xl mx-auto px-gutter py-space-xl">
                <div className="flex flex-col w-full">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl pb-space-lg bg-surface-container-low/40 rounded-xl p-space-lg">
                        <div className="flex flex-col gap-space-xs">
                            <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">Swap Requests</h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-space-md mb-space-lg">
                        <div className="flex items-center justify-between overflow-x-auto no-scrollbar bg-surface-container-lowest rounded-xl p-1.5">
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setActiveTab('received')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'received' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Received</span>
                                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-status-pending-bg text-status-pending text-caption font-caption">2 pending</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('sent')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'sent' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Sent</span>
                                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-surface-container-high text-text-muted text-caption font-caption">1 pending</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('past')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'past' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Completed & Past</span>
                                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-surface-container-high text-text-muted text-caption font-caption">5</span>
                                </button>
                            </div>
                            <div className="hidden sm:flex items-center gap-space-xs text-text-muted px-space-sm font-caption text-caption">
                                <span className="material-symbols-outlined text-[14px]">info</span>
                                <span>Auto-expires after 7 days without response</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-space-sm">
                            <div className="flex items-center gap-1.5">
                                <span className="font-caption text-caption uppercase text-text-muted tracking-wider mr-1">Status:</span>
                                {['all', 'pending', 'accepted', 'completed'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveStatus(status)}
                                        className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-colors ${activeStatus === status ? 'bg-primary text-on-primary' : 'bg-surface-elevated text-text-muted hover:text-text-primary'}`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)} {status === 'all' && 'Statuses'}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-space-xs text-caption font-caption text-text-muted">
                                <span>Displaying <strong className="text-text-primary">{filteredCards.length}</strong> swaps</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-space-lg">
                        {filteredCards.map(card => (
                            <div key={card.id} className="swap-card bg-surface-card rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm transition-all hover:bg-surface-elevated/80 relative overflow-hidden">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-status-${card.status} via-status-${card.status}/60 to-transparent`}></div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs">
                                    <div className="flex items-center gap-space-md">
                                        <div className="relative">
                                            <img className="w-12 h-12 rounded-full object-cover shadow-sm" alt="Profile" src={card.avatar} />
                                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-surface-card ${card.status === 'completed' ? 'hidden' : `bg-status-${card.status === 'pending' ? 'accepted' : card.status}`}`}></span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-space-sm">
                                                <span className="font-title-md text-title-md text-text-primary">{card.title}</span>
                                            </div>
                                            <div className="flex items-center gap-space-xs text-text-muted font-caption text-caption">
                                                {!card.completedMode && <span className="material-symbols-outlined text-[14px]">location_on</span>}
                                                <span>{card.location}</span>
                                                <span>•</span>
                                                <span>{card.verified}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-space-sm">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-status-${card.status}-bg text-status-${card.status}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full bg-status-${card.status} ${card.status === 'pending' ? 'animate-pulse' : ''}`}></span>
                                            {card.status === 'pending' ? 'Action Required' : card.status === 'accepted' ? 'Active' : 'Completed'}
                                        </span>
                                    </div>
                                </div>

                                {!card.completedMode && (
                                    <div className="bg-surface-container-lowest/80 rounded-xl p-space-md">
                                        <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-space-sm">
                                            <div className="md:col-span-5 bg-surface-card rounded-lg p-space-md flex flex-col gap-1.5 shadow-sm">
                                                <span className="font-caption text-caption text-text-muted tracking-wider uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">{card.youOffer.icon}</span>
                                                    {card.youOffer.title}
                                                </span>
                                                <div className="flex items-center gap-space-xs flex-wrap">
                                                    {card.youOffer.tags.map((tag, i) => (
                                                        <span key={i} className={`px-2 py-1 rounded bg-badge-wanted-bg font-label-sm text-label-sm ${i === 0 ? 'text-primary-fixed' : 'text-text-secondary'}`}>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
                                                <div className={`w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center shadow-sm text-${card.status === 'accepted' ? 'status-accepted' : 'primary'}`}>
                                                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                                                </div>
                                            </div>
                                            <div className="md:col-span-5 bg-surface-card rounded-lg p-space-md flex flex-col gap-1.5 shadow-sm">
                                                <span className="font-caption text-caption text-text-muted tracking-wider uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-secondary">{card.theyOffer.icon}</span>
                                                    {card.theyOffer.title}
                                                </span>
                                                <div className="flex items-center gap-space-xs flex-wrap">
                                                    {card.theyOffer.tags.map((tag, i) => (
                                                        <span key={i} className={`px-2 py-1 rounded bg-badge-wanted-bg font-label-sm text-label-sm ${i === 0 ? 'text-text-primary' : 'text-text-secondary'}`}>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {card.note && (
                                    <div className="bg-surface-elevated/40 rounded-lg p-space-md flex items-start gap-space-sm">
                                        <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">format_quote</span>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-caption text-caption uppercase text-text-muted tracking-wider">Note</span>
                                            <p className="font-body-md text-text-primary italic">"{card.note}"</p>
                                        </div>
                                    </div>
                                )}

                                {card.status === 'pending' && card.tab === 'received' && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-space-sm gap-space-md">
                                        <div className="flex items-center gap-space-md text-caption font-caption text-text-muted">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">schedule</span> 3 hours estimated</span>
                                        </div>
                                        <div className="flex items-center gap-space-sm w-full sm:w-auto">
                                            <button className="w-1/2 sm:w-auto px-space-md py-2 rounded-lg font-label-md text-label-md text-status-rejected hover:bg-status-rejected-bg transition-colors flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-[18px]">close</span> Decline
                                            </button>
                                            <button className="w-1/2 sm:w-auto px-space-lg py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1.5">
                                                <span className="material-symbols-outlined text-[18px]">handshake</span> Accept Swap
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {card.completedMode && (
                                    <div className="bg-surface-elevated/50 rounded-lg p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mt-2">
                                        <div className="flex items-center gap-space-md">
                                            <div className="flex items-center gap-0.5 text-primary">
                                                {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                                            </div>
                                            <span className="font-label-md text-label-md text-text-primary">Rated 5.0 • <span className="font-caption text-caption text-text-muted">"Phenomenal sessions, super patient mentor."</span></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {filteredCards.length === 0 && (
                            <div className="bg-surface-card rounded-xl p-space-xl text-center flex flex-col items-center justify-center gap-space-md my-space-md">
                                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-text-muted">
                                    <span className="material-symbols-outlined text-[24px]">inbox</span>
                                </div>
                                <div className="flex flex-col gap-space-xs">
                                    <span className="font-title-md text-title-md text-text-primary">No Swap Requests Found</span>
                                    <p className="font-body-md text-text-muted max-w-sm">No swap agreements match the selected tab and status criteria.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
