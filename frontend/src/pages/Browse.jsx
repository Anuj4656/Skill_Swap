import React, { useState, useEffect } from 'react';
import SkillCard from '../components/SkillCard';

export default function Browse() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState({ id: 'all', name: 'All' });
    const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/categories/')
            .then(res => res.json())
            .then(data => {
                setCategories([{ id: 'all', name: 'All' }, ...data]);
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    useEffect(() => {
        let url = 'http://127.0.0.1:8000/api/users/';
        const params = new URLSearchParams();
        if (searchQuery) {
            params.append('skill', searchQuery);
        }

        // Wait, UserBrowseView filters by skill using ?skill=. It does not natively filter by category yet unless I pass category_id, but the PRD says browse users by skill. For now, fetch users and filter by skill if search query is there.
        if (params.toString()) {
            url += '?' + params.toString();
        }

        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // Map over DRF response to match SkillCard component format.
                const mappedUsers = data.map(u => ({
                    id: u.id,
                    name: `${u.user.first_name} ${u.user.last_name}`,
                    location: u.location || 'Unknown',
                    availability: u.availability ? `Available ${u.availability}` : 'Flexible',
                    avatar: u.photo || 'https://www.gravatar.com/avatar/00?d=mp',
                    offering: u.skills_offered || [],
                    lookingFor: u.skills_wanted || [],
                    rating: typeof u.trust_score === 'number' && u.trust_score > 0 ? (Math.round(u.trust_score * 10) / 10).toFixed(1) : 'New',
                    swaps: u.completed_swaps || 0
                }));
                setUsers(mappedUsers);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setLoading(false);
            });
    }, [searchQuery]);

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
                        <div className="flex flex-col sm:flex-row items-stretch gap-space-sm">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-text-muted text-[20px] pointer-events-none">search</span>
                                <input
                                    className="w-full h-12 pl-11 pr-space-md bg-surface-container rounded-xl text-text-primary placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:bg-surface-elevated transition-colors"
                                    placeholder="Search by skill (e.g. Python, UI Design, Pottery) or name..."
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
                            <div className="flex items-center gap-space-sm">
                                <div className="relative min-w-[170px]">
                                    <select className="w-full h-12 px-space-md bg-surface-container rounded-xl text-text-secondary font-label-md text-label-md appearance-none focus:outline-none focus:bg-surface-elevated cursor-pointer transition-colors">
                                        <option value="all">Availability: All</option>
                                        <option value="weekends">Weekends</option>
                                        <option value="evenings">Evenings</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[18px]">expand_more</span>
                                </div>
                                <div className="relative min-w-[180px]">
                                    <select className="w-full h-12 px-space-md bg-surface-container rounded-xl text-text-secondary font-label-md text-label-md appearance-none focus:outline-none focus:bg-surface-elevated cursor-pointer transition-colors">
                                        <option value="trust">Sort by: Trust Score</option>
                                        <option value="swaps">Sort by: Most Swaps</option>
                                        <option value="rating">Sort by: Highest Rating</option>
                                        <option value="recent">Sort by: Recently Joined</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[18px]">swap_vert</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-space-xs overflow-x-auto pb-1" id="category-pills">
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
                        {users.map(user => <SkillCard key={user.id} user={user} />)}
                    </section>

                    <footer className="flex flex-col sm:flex-row items-center justify-between py-space-md px-space-lg bg-surface-container rounded-xl gap-space-md">
                        <div className="font-body-md text-body-md text-text-muted">Showing <span className="font-label-md text-label-md text-text-primary">{users.length} members</span></div>
                        <div className="flex items-center gap-space-xs">
                            <button className="h-9 px-space-md rounded-lg font-label-sm text-label-sm bg-surface-elevated text-text-muted cursor-not-allowed opacity-60 flex items-center gap-1" disabled type="button">
                                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                                Previous
                            </button>
                            <div className="flex items-center gap-1 px-space-xs">
                                <button className="w-8 h-8 rounded-lg font-label-sm text-label-sm bg-primary text-on-primary flex items-center justify-center">1</button>
                                <button className="w-8 h-8 rounded-lg font-label-sm text-label-sm text-text-secondary hover:bg-surface-elevated flex items-center justify-center transition-colors">2</button>
                                <button className="w-8 h-8 rounded-lg font-label-sm text-label-sm text-text-secondary hover:bg-surface-elevated flex items-center justify-center transition-colors">3</button>
                                <span className="text-text-muted px-1 text-caption">…</span>
                                <button className="w-8 h-8 rounded-lg font-label-sm text-label-sm text-text-secondary hover:bg-surface-elevated flex items-center justify-center transition-colors">8</button>
                            </div>
                            <button className="h-9 px-space-md rounded-lg font-label-sm text-label-sm bg-surface-elevated text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors" type="button">
                                Next
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </main>
    );
}
