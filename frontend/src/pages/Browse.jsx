import React, { useState } from 'react';
import SkillCard from '../components/SkillCard';

export default function Browse() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Design & Creative', 'Development', 'Language', 'Craft & DIY', 'Music', 'Academic'];

    const users = [
        {
            id: 1, name: 'Marcus Chen', location: 'Portland, OR', availability: 'Available weekends',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUIKSDWSzbBkuuat5L3_aS3VZNjVhFYz4rDaxksPyX39j3gh5d6Ekx7x3Lv4PVQKD7_QT5avdXPMHkh769xgEhvi_8AJnGS9WdIZaz0I45bLabwzuI_tW09Cao-7DUaf7HNnijfqJrL_HQR66yIHB_aSmngBW6yAkokYNgw8SDrwkH7YwAb7zIfVr1Q4w1BoUNbZvtRrUKT6fVO3CBUa836ncIDFdNU6fkspBLBbD8H0YRgPZ3S-409w',
            offering: ['Python', 'PostgreSQL', 'FastAPI'],
            lookingFor: ['Figma / UI Design', 'Ceramics'],
            rating: 4.9, swaps: 14
        },
        {
            id: 2, name: 'Sarah Miller', location: 'Chicago, IL', availability: 'Available evenings',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9udVhMOUDGWxu9eFjWJ_QLKT_PdaG49RXrmdtdu9mxl8Ji3SkQR3JAMSeDh9HCIEjZcCIWtIjkeJpYVoehZWJomggVw5zwSBDNIXsFk8snQKejmOBlYbarE7CEO9HNM3ijs-2Vi92vDp7uMfkpyIJAN1UlfIDT8m25IFU7wFgtxGehbxhI9-GJY_K82SafdccjN4Q1alQm5x2pIBmZ9cjimJ5SAuKPIOYQfFZsTQwb3zOl_rwM2TvYw',
            offering: ['Product Design', 'Design Systems'],
            lookingFor: ['Django', 'React'],
            rating: 5.0, swaps: 22
        },
        {
            id: 3, name: 'David Adebayo', location: 'Austin, TX', availability: 'Flexible',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAnKYBGWgXmvfdynBCHNFubbniZJYxxEcVy0k8_IYO-Au5YL5pmHp6BvWuBsW2_JPAf6kCYXZNRZTJECPgz771CrIrcypujwbulCj3t2ialE3ROhKWctILYIzsoSwgmG-00hhZHSqqADv43yo-8QTR7KdH6ggeYCA2DruGkcgqulzQHBMUsCVswsGUknIhqg3p6tP86oLVTeLOysbqWkLS-294dHAqN2NLnDKGbmOQIlKJGyk2UnnE_Q',
            offering: ['Acoustic Guitar', 'Audio Mixing'],
            lookingFor: ['Spanish Conversation'],
            rating: 4.8, swaps: 9
        },
        {
            id: 4, name: 'Maya Lin', location: 'Seattle, WA', availability: 'Available weekends',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfV3yM2yyYSb8lX_xcLcoq9NmGroHMB50d0nyt3jZnJOhY2RNAim-Vhs53O41OgnytiC68UeZzOBoeI_cGS9TLwGR4AYDX8YPssB6PyYrxgO5sCBjlpvS_tA2zOcsJdQUQV8ONstOIWPqDrlApDSFUipoNh493M5S7K-KLMkmpxpTHWqo__0u25kpJZma8A3-wfYLJMGesSReVFjY3CIHR_6_DXhpuaMHOx5PkfGO5pz2N2wiYOpoPYQ',
            offering: ['Woodworking', 'Furniture Restoration'],
            lookingFor: ['Tax Preparation', 'Web Development'],
            rating: 4.9, swaps: 18
        },
        {
            id: 5, name: 'Lucas Rossi', location: 'Brooklyn, NY', availability: 'Available evenings',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5pHR12VB6eCu4xA8Jw2RoY3E1bc7V8z-rprO8KGBh4LCa60hjtWFVexQT-l25kiROJogTAjNuAdh8lnPL-bx2qaeYOr-Tr2EuN17J2928J6OchTz7TJI_S_vd3IasOA4x2A1zJc_XgG2zbUvPt-BY_uigBzsLaGl0ZjiuOW8RGOuiDdgZ5JD1fkyWfn4NuR6mIdnZ9r3ha4bLVGou-MZ6f5NY_UPPCWHt_DmNoSAT1TKbf31nthkaUg',
            offering: ['Italian (Native)', 'Pasta Making'],
            lookingFor: ['Tailwind CSS', 'TypeScript'],
            rating: 4.7, swaps: 8
        },
        {
            id: 6, name: 'Amara Okafor', location: 'San Francisco, CA', availability: 'Flexible',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjxyO5tYW0DJXgmBoVpn_gPCbE_bMD3zSC10QPcbVl9leGszqNNsMdKH-VBTdfXyvx4thWMZjumzof0MwMtjOo4U3u93SUJ6pwXojqM4ebk5qxJk7Ku8ieEJ9qZlDdS30ahkSbmS-qpoLOWKL3QWHb7YdLdLxSORTVdai7-ecKKlkYfSzQkKlziAl6iuZAL8SV4n9UejB7kpzkO-hQJFo6z3W0Ev3i3VJYcN-NdeUxDFOOhf1XOzEkJQ',
            offering: ['Technical Writing', 'SEO Strategy'],
            lookingFor: ['Sourdough Baking', 'Gardening'],
            rating: 5.0, swaps: 31
        }
    ];

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
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`category-pill whitespace-nowrap px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${activeCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container text-text-secondary hover:text-text-primary hover:bg-surface-elevated'}`}
                                    type="button"
                                >
                                    {cat}
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
