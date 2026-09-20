import React, { useState } from 'react';
import { getImageUrl } from '../utils';
import { SkeletonSwapRow } from '../components/Skeletons';
import Modal from '../components/Modal';

export default function MySwaps() {
    const [activeTab, setActiveTab] = useState('received');
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));
    const [activeStatus, setActiveStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    const [cards, setCards] = useState([]);
    const [ratingModal, setRatingModal] = useState(null);
    const [ratingScore, setRatingScore] = useState(5);
    const [ratingComment, setRatingComment] = useState("");
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/swaps/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // Need to know current user to map tab: 'sent' vs 'received'
                fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(res => res.json())
                    .then(profile => {
                        const currentUserId = profile.user.id;

                        const mappedCards = data.map(swap => {
                            const isRequester = swap.requester.id === currentUserId;
                            const otherUser = isRequester ? swap.receiver : swap.requester;

                            let tab = 'past';
                            if (swap.status === 'pending') {
                                tab = isRequester ? 'sent' : 'received';
                            } else if (swap.status === 'accepted') {
                                tab = 'active';
                            } else if (swap.status === 'rejected') {
                                tab = 'rejected';
                            } else if (swap.status === 'completed') {
                                tab = 'past';
                            }

                            return {
                                id: swap.id,
                                tab: tab,
                                status: swap.status,
                                title: `${otherUser.first_name} ${otherUser.last_name}`,
                                avatar: getImageUrl(otherUser?.photo),
                                location: otherUser.location || 'Location Not Set',
                                youOffer: {
                                    icon: 'school',
                                    title: 'You Give',
                                    tags: [isRequester ? swap.skill_offered.name : swap.skill_wanted.name]
                                },
                                theyOffer: {
                                    icon: 'handyman',
                                    title: 'They Give',
                                    tags: [isRequester ? swap.skill_wanted.name : swap.skill_offered.name]
                                },
                                note: swap.note || '',
                                isRated: swap.is_rated || false,
                                completedMode: swap.status === 'completed' || swap.status === 'rejected'
                            };
                        });

                        mappedCards.sort((a, b) => b.id - a.id);
                        setCards(mappedCards);
                        setLoading(false);
                    })
                    .catch(() => setLoading(false));
            })
            .catch(err => {
                console.error("Error fetching swaps:", err);
                setLoading(false);
            });
    }, []);

    const handleUpdateSwap = (id, status) => {
        const token = localStorage.getItem('access_token');
        fetch(`${(import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'))}/api/swaps/${id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(updated => {
                setCards(prev => prev.map(c => {
                    if (c.id === id) {
                        return {
                            ...c,
                            status: updated.status,
                            completedMode: updated.status === 'completed' || updated.status === 'rejected',
                            tab: updated.status === 'completed' ? 'past' : updated.status === 'rejected' ? 'rejected' : updated.status === 'accepted' ? 'active' : c.tab
                        };
                    }
                    return c;
                }));
            })
            .catch(err => console.error("Error updating swap:", err));
    };
    const handleDeleteSwap = (id) => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Cancel Request',
            message: 'Are you sure you want to cancel this request?',
            isDestructive: true,
            onConfirm: () => {
                const token = localStorage.getItem('access_token');
                fetch(`${(import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'))}/api/swaps/${id}/`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(res => {
                    if (res.ok) {
                        setCards(prev => prev.filter(c => c.id !== id));
                    }
                }).catch(err => console.error("Error cancelling swap:", err));
            }
        });
    };

    const submitRating = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem('access_token');
        fetch(`${(import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'))}/api/swaps/${ratingModal?.id}/rate/`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ score: ratingScore, comment: ratingComment })
        }).then(res => {
            if (res.ok) {
                setCards(prev => prev.map(c => c.id === ratingModal?.id ? { ...c, isRated: true } : c));
                setRatingModal(null);
                setRatingScore(5);
                setRatingComment("");
            }
        }).catch(err => console.error("Error rating swap:", err))
            .finally(() => setIsSubmitting(false));
    };


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
                        <div className="flex items-center justify-center overflow-x-auto no-scrollbar bg-surface-container-lowest rounded-xl p-1.5">
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setActiveTab('received')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'received' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Received</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('sent')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'sent' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Sent</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('active')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'active' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Active</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('past')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'past' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Completed</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('rejected')}
                                    className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${activeTab === 'rejected' ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                                >
                                    <span>Rejected</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-space-lg">
                        {loading && [...Array(3)].map((_, i) => <SkeletonSwapRow key={i} />)}

                        {!loading && filteredCards.map(card => (
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
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">schedule</span> Pending Review</span>
                                        </div>
                                        <div className="flex items-center gap-space-sm w-full sm:w-auto">
                                            <button onClick={() => handleUpdateSwap(card.id, 'rejected')} className="w-1/2 sm:w-auto px-space-md py-2 rounded-lg font-label-md text-label-md text-status-rejected hover:bg-status-rejected-bg transition-colors flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-[18px]">close</span> Decline
                                            </button>
                                            <button onClick={() => handleUpdateSwap(card.id, 'accepted')} className="w-1/2 sm:w-auto px-space-lg py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1.5">
                                                <span className="material-symbols-outlined text-[18px]">handshake</span> Accept Swap
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {card.status === 'pending' && card.tab === 'sent' && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-space-sm gap-space-md">
                                        <div className="flex items-center gap-space-md text-caption font-caption text-text-muted">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">schedule</span> Sent</span>
                                        </div>
                                        <div className="flex items-center gap-space-sm w-full sm:w-auto">
                                            <button onClick={() => handleDeleteSwap(card.id)} className="w-1/2 sm:w-auto px-space-md py-2 rounded-lg font-label-md text-label-md text-status-rejected hover:bg-status-rejected-bg transition-colors flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-[18px]">delete</span> Cancel Request
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {card.status === 'accepted' && card.tab === 'active' && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-space-sm gap-space-md border-t border-surface-container-high mt-space-sm">
                                        <div className="flex items-center gap-space-md text-caption font-caption text-text-muted">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">handshake</span> Swap In Progress</span>
                                        </div>
                                        <div className="flex items-center gap-space-sm w-full sm:w-auto">
                                            <button onClick={() => handleUpdateSwap(card.id, 'completed')} className="w-full sm:w-auto px-space-md py-2 rounded-lg font-label-md text-label-md bg-status-accepted-bg text-status-accepted hover:bg-status-accepted/20 transition-colors flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-[18px]">done_all</span> Mark Session Complete
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {card.completedMode && !card.isRated && card.status === 'completed' && (
                                    <div className="bg-surface-elevated/50 rounded-lg p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mt-2">
                                        <div className="flex items-center gap-space-md">
                                            <span className="font-label-md text-label-md text-text-primary">Session Completed. Verify the exchange to build trust!</span>
                                        </div>
                                        <button onClick={() => setRatingModal(card)} className="px-space-md py-2 rounded-lg font-label-md bg-primary text-on-primary transition-colors hover:opacity-90">
                                            Leave a Review
                                        </button>
                                    </div>
                                )}
                                {card.completedMode && card.isRated && (
                                    <div className="bg-surface-elevated/50 rounded-lg p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mt-2">
                                        <div className="flex items-center gap-space-md text-status-accepted">
                                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                            <span className="font-label-md text-label-md text-text-primary">You rated this member.</span>
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

            {ratingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-gutter transition-opacity duration-200">
                    <div className="bg-surface-elevated rounded-xl max-w-md w-full p-space-lg shadow-2xl">
                        <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high mb-space-md">
                            <div className="flex items-center gap-space-sm">
                                <h2 className="font-title-md text-text-primary">Leave a Review</h2>
                                {ratingModal?.avatar && (
                                    <div className="flex items-center gap-2 max-w-[200px]">
                                        <span className="text-text-muted font-caption text-caption">for</span>
                                        <img src={ratingModal.avatar} alt="Profile" className="w-6 h-6 rounded-full object-cover shadow-sm" />
                                        <span className="font-label-md text-label-md text-text-primary truncate">{ratingModal.title}</span>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setRatingModal(null)} className="p-1 rounded bg-surface-container-high hover:bg-surface-container-highest transition-colors text-text-secondary" type="button">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <form onSubmit={submitRating} className="flex flex-col gap-space-md">
                            <div>
                                <label className="block font-label-sm text-text-secondary mb-2">Rating</label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRatingScore(star)}
                                            onMouseEnter={() => setHoveredStar(star)}
                                            onMouseLeave={() => setHoveredStar(0)}
                                            className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                        >
                                            <span
                                                className={`material-symbols-outlined text-[32px] transition-colors ${(hoveredStar || ratingScore) >= star
                                                    ? 'text-status-pending drop-shadow-sm'
                                                    : 'text-surface-container-highest'
                                                    }`}
                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                            >
                                                star
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block font-label-sm text-text-secondary mb-2">Comment</label>
                                <textarea rows="3" required value={ratingComment} onChange={(e) => setRatingComment(e.target.value)} className="w-full bg-surface-container-lowest border border-surface-container-high focus:border-border-strong rounded-lg px-space-md py-2 text-text-primary font-body-md transition-colors outline-none resize-none" placeholder="Provide feedback about the session..." />
                            </div>
                            <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container-high">
                                <button onClick={() => setRatingModal(null)} disabled={isSubmitting} className="px-space-md py-2 rounded-lg text-text-secondary hover:text-text-primary bg-surface-container-high disabled:opacity-50" type="button">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="px-space-md py-2 rounded-lg bg-primary text-on-primary disabled:opacity-75 flex items-center gap-2">
                                    {isSubmitting ? <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span> : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
            <Modal {...modalConfig} onClose={closeModal} />
        </main >
    );
}
