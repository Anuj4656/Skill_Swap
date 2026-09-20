import React, { useState, useEffect } from 'react';
import SkillCard from '../components/SkillCard';
import { SkeletonCard } from '../components/Skeletons';
import { getImageUrl } from '../utils';

export default function Browse() {
    const [allUsers, setAllUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchMode, setSearchMode] = useState('skill'); // 'skill' or 'name'
    const [activeCategory, setActiveCategory] = useState({ id: 'all', name: 'All' });
    const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);
    const [availability, setAvailability] = useState('all');
    const [sortMode, setSortMode] = useState('recent');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/categories/')
            .then(res => res.json())
            .then(data => {
                setCategories([{ id: 'all', name: 'All' }, ...data]);
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/users/', { headers })
            .then(res => res.json())
            .then(data => {
                const mappedUsers = data.map(u => ({
                    id: u.id,
                    name: `${u.user.first_name} ${u.user.last_name}`,
                    location: u.location || 'Unknown',
                    availability: u.availability ? `Available ${u.availability}` : 'Flexible',
                    avatar: getImageUrl(u.photo),
                    offering: u.skills_offered || [],
                    lookingFor: u.skills_wanted || [],
                    trust_score: typeof u.trust_score === 'number' && u.trust_score > 0 ? (Math.round(u.trust_score * 10) / 10).toFixed(1) : 'New',
                    avg_rating: typeof u.avg_rating === 'number' && u.avg_rating > 0 ? (Math.round(u.avg_rating * 10) / 10).toFixed(1) : 'New',
                    swaps: u.completed_swaps || 0
                }));
                setAllUsers(mappedUsers);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = [...allUsers];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (searchMode === 'skill') {
                result = result.filter(u =>
                    u.offering.some(s => s.name?.toLowerCase().includes(query)) ||
                    u.lookingFor.some(s => s.name?.toLowerCase().includes(query))
                );
            } else {
                result = result.filter(u => u.name?.toLowerCase().includes(query));
            }
        }

        if (activeCategory.id !== 'all') {
            result = result.filter(u => u.offering.some(s => s.category === activeCategory.id));
        }

        if (availability !== 'all') {
            result = result.filter(u => u.availability.toLowerCase().includes(availability.toLowerCase()));
        }

        if (sortMode === 'trust' || sortMode === 'rating') {
            result.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        } else if (sortMode === 'swaps') {
            result.sort((a, b) => b.swaps - a.swaps);
        } else if (sortMode === 'recent') {
            result.sort((a, b) => b.id - a.id);
        }

        setDisplayedUsers(result);
        setCurrentPage(1); // Reset to page 1 on filter changes
    }, [allUsers, searchQuery, searchMode, activeCategory, availability, sortMode]);

    const totalPages = Math.max(1, Math.ceil(displayedUsers.length / ITEMS_PER_PAGE));
    const paginatedUsers = displayedUsers.slice(
        0,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <main className="w-full pt-16 bg-surface-base">
            <div className="max-w-6xl mx-auto px-gutter py-space-xl">
                <div className="flex flex-col w-full">

                    <section className="flex flex-col md:flex-row md:items-end justify-between pb-space-xl gap-space-lg">
                        <div className="max-w-2xl">
                            <h1 className="font-headline-xl text-headline-xl text-text-primary tracking-tight">
                                Find skills to swap in your community
                            </h1>
                        </div>
                    </section>

                    <section className="flex flex-col gap-space-md mb-space-xl">
                        <div className="flex flex-col lg:flex-row items-stretch gap-space-md">
                            <div className="relative flex-1 flex flex-row">
                                <select
                                    className="h-12 px-space-md bg-surface-elevated rounded-l-xl border-r border-border-subtle text-text-secondary font-label-md text-label-md focus:outline-none cursor-pointer transition-colors"
                                    value={searchMode}
                                    onChange={(e) => setSearchMode(e.target.value)}
                                >
                                    <option value="skill">Skill</option>
                                    <option value="name">Person</option>
                                </select>
                                <div className="relative flex-1">
                                    <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-text-muted text-[20px] pointer-events-none">search</span>
                                    <input
                                        className="w-full h-12 pl-11 pr-space-md bg-surface-container rounded-r-xl text-text-primary placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:bg-surface-elevated transition-colors"
                                        placeholder={searchMode === 'skill' ? "Search by skill (e.g. Python, UI Design, Pottery)..." : "Search by user name..."}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="absolute right-space-md top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch gap-space-sm">
                                <div className="relative flex-1 sm:min-w-[170px]">
                                    <select
                                        className="w-full h-12 pl-space-md pr-11 bg-surface-container rounded-xl text-text-secondary font-label-md text-label-md appearance-none focus:outline-none focus:bg-surface-elevated cursor-pointer transition-colors"
                                        value={availability}
                                        onChange={(e) => setAvailability(e.target.value)}
                                    >
                                        <option value="all">Availability: All</option>
                                        <option value="weekends">Weekends</option>
                                        <option value="evenings">Evenings</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[18px]">expand_more</span>
                                </div>
                                <div className="relative min-w-[180px]">
                                    <select
                                        className="w-full h-12 pl-space-md pr-11 bg-surface-container rounded-xl text-text-secondary font-label-md text-label-md appearance-none focus:outline-none focus:bg-surface-elevated cursor-pointer transition-colors"
                                        value={sortMode}
                                        onChange={(e) => setSortMode(e.target.value)}
                                    >
                                        <option value="recent">Sort by: Recently Joined</option>
                                        <option value="trust">Sort by: Trust Score</option>
                                        <option value="swaps">Sort by: Most Swaps</option>
                                        <option value="rating">Sort by: Highest Rating</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[18px]">swap_vert</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-space-xs overflow-x-auto scrollbar-hide pb-1" id="category-pills">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`category-pill whitespace-nowrap px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${activeCategory.id === cat.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-text-secondary hover:text-text-primary hover:bg-surface-elevated'}`}
                                    type="button"
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg w-full mb-space-xl">
                        {paginatedUsers.map(user => <SkillCard key={user.id} user={user} />)}
                        {displayedUsers.length === 0 && !loading && (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-space-xl text-text-muted font-body-lg text-body-lg">
                                No users found matching your filters.
                            </div>
                        )}
                        {loading && (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </>
                        )}
                    </section>

                    {currentPage < totalPages && (
                        <footer className="flex justify-center py-space-md px-space-lg mb-space-sm">
                            <button
                                className="h-10 px-space-xl rounded-full font-label-md text-label-md bg-surface-elevated text-text-primary hover:bg-surface-container-high transition-colors shadow-sm flex items-center justify-center gap-2"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                type="button"
                            >
                                <span>Load More Talents</span>
                                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            </button>
                        </footer>
                    )}
                </div>
            </div>
        </main>
    );
}
