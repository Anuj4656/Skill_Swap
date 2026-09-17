import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [saveText, setSaveText] = useState('Save Profile');

    const handleSave = () => {
        setIsSaving(true);
        setSaveText('Saving...');
        setTimeout(() => {
            setSaveText('Saved!');
            setTimeout(() => {
                setIsSaving(false);
                setSaveText('Save Profile');
                navigate('/profile'); // simulate navigating to profile looking back
            }, 1000);
        }, 600);
    };

    return (
        <main className="w-full pt-16 bg-surface-base min-h-screen">
            <div className="max-w-6xl mx-auto px-gutter py-space-xl">
                <div className="flex flex-col w-full">

                    {/* Breadcrumb and Context Nav */}
                    <div className="flex items-center justify-between pb-space-lg">
                        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-sm text-label-sm text-text-muted">
                            <span className="hover:text-text-secondary transition-colors cursor-pointer">Account Settings</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-text-primary font-semibold">My Profile</span>
                        </nav>
                        <div className="flex items-center gap-space-sm">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container font-caption text-caption text-text-muted">
                                <span className="w-1.5 h-1.5 rounded-full bg-status-accepted"></span>
                                All changes auto-saved to draft
                            </span>
                        </div>
                    </div>

                    {/* Main Profile Form Wrapper */}
                    <div className="space-y-space-xl">

                        {/* Header Card: Identity, Location, Availability, Trust */}
                        <section className="bg-surface-card rounded-xl p-space-lg sm:p-space-xl shadow-md relative overflow-hidden">
                            <div className="flex flex-col lg:flex-row gap-space-xl items-start justify-between">
                                {/* Left: Photo and Direct Details */}
                                <div className="flex flex-col sm:flex-row gap-space-lg items-start flex-1 min-w-0">
                                    {/* Avatar Unit */}
                                    <div className="relative group shrink-0">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-surface-container-high ring-2 ring-surface-elevated">
                                            <img alt="Portrait of Elena Vance" className="w-full h-full object-cover group-hover:opacity-85 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUGDUtSX2YsLSl5QLaKJbo6lwG-GdQdnlqas1a0mfGTm0JpfcEYrrVn_--1_c1f7Mp3zgqrxhWeoDYdVM5cUcBbu9gvMfHOWFVtsb_Va_rfbLxO-qkEnT6hZN6BmfIv7mCNOt7fSmpekpKp7YdPc-_FID0jgXhN00SvBOvEsuTHG5swzKh1Bbnow2CNEMEoKp3t72A9-sEKt1j5qZOwpnslANgpCns5JrPsiyeE1BoiP3u4PtXD2IGNQ" />
                                        </div>
                                        <button aria-label="Change photo" className="absolute -bottom-1 -right-1 flex items-center justify-center p-2 rounded-full bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-container-highest shadow-sm transition-all" title="Change Profile Photo" type="button">
                                            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                        </button>
                                    </div>

                                    {/* Basic Metadata Fields */}
                                    <div className="space-y-space-md w-full max-w-md">
                                        <div>
                                            <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5" htmlFor="fullName">
                                                Full Name
                                            </label>
                                            <input className="w-full h-10 px-3.5 rounded-lg bg-surface-base text-text-primary font-headline-md text-headline-md focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted" id="fullName" placeholder="Your full name" type="text" defaultValue="Elena Vance" />
                                        </div>
                                        <div>
                                            <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5" htmlFor="userLocation">
                                                Location &amp; Timezone
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="material-symbols-outlined absolute left-3 text-text-muted text-[18px] pointer-events-none">location_on</span>
                                                <input className="w-full h-9 pl-9 pr-3.5 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted" id="userLocation" placeholder="City, State or Country" type="text" defaultValue="Portland, OR (PST / UTC-8)" />
                                            </div>
                                        </div>

                                        {/* Availability Selector */}
                                        <div>
                                            <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5">
                                                General Availability
                                            </label>
                                            <div aria-label="Availability" className="flex flex-wrap gap-2" role="radiogroup">
                                                <button aria-checked="false" className="px-3 py-1.5 rounded-lg text-label-sm font-label-sm bg-surface-elevated text-text-muted hover:text-text-primary hover:bg-surface-container-high transition-colors" role="radio" type="button">
                                                    Weekends
                                                </button>
                                                <button aria-checked="true" className="px-3 py-1.5 rounded-lg text-label-sm font-label-sm bg-primary-container text-on-primary-container flex items-center gap-1.5 shadow-sm" role="radio" type="button">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                                                    Evenings
                                                </button>
                                                <button aria-checked="false" className="px-3 py-1.5 rounded-lg text-label-sm font-label-sm bg-surface-elevated text-text-muted hover:text-text-primary hover:bg-surface-container-high transition-colors" role="radio" type="button">
                                                    Weekdays
                                                </button>
                                                <button aria-checked="false" className="px-3 py-1.5 rounded-lg text-label-sm font-label-sm bg-surface-elevated text-text-muted hover:text-text-primary hover:bg-surface-container-high transition-colors" role="radio" type="button">
                                                    Flexible
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Privacy Switch & Trust Metrics Ledger */}
                                <div className="w-full lg:w-80 flex flex-col gap-space-lg shrink-0">
                                    {/* Visibility Switch */}
                                    <div className="p-space-md rounded-lg bg-surface-elevated flex flex-col gap-space-xs">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[18px] text-primary">public</span>
                                                <span className="font-title-md text-title-md text-text-primary">Public Profile</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input defaultChecked className="sr-only peer" id="publicToggle" type="checkbox" />
                                                <div className="w-10 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-base after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-primary after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
                                            </label>
                                        </div>
                                        <p className="font-caption text-caption text-text-muted leading-relaxed">
                                            Your profile and offered skills are visible in Browse &amp; Search. Disabling hides you from prospective partners.
                                        </p>
                                    </div>

                                    {/* Trust Score Ledger Box */}
                                    <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-caption text-caption uppercase tracking-wider text-text-muted">Reputation Metric</span>
                                            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-status-accepted bg-status-accepted-bg px-2 py-0.5 rounded">
                                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                                Verified Peer
                                            </span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-headline-xl text-headline-xl text-text-primary tracking-tight">4.9</span>
                                            <span className="font-body-md text-body-md text-text-muted">/ 5.0 Trust Score</span>
                                        </div>
                                        <div className="pt-2 grid grid-cols-3 gap-2 text-center bg-surface-card rounded p-2">
                                            <div>
                                                <div className="flex items-center justify-center gap-0.5 text-text-primary font-label-md text-label-md">
                                                    5.0 <span className="material-symbols-outlined text-[13px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                </div>
                                                <span className="font-caption text-caption text-text-muted block mt-0.5">Rating</span>
                                            </div>
                                            <div>
                                                <div className="font-label-md text-label-md text-text-primary">12</div>
                                                <span className="font-caption text-caption text-text-muted block mt-0.5">Swaps</span>
                                            </div>
                                            <div>
                                                <div className="font-label-md text-label-md text-status-accepted">100%</div>
                                                <span className="font-caption text-caption text-text-muted block mt-0.5">Completion</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Two-Column Skill Inventory Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
                            {/* Section 1: Skills I Offer */}
                            <section className="bg-surface-card rounded-xl p-space-lg flex flex-col justify-between shadow-md">
                                <div>
                                    <div className="flex items-start justify-between pb-space-md">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                                <h2 className="font-headline-md text-headline-md text-text-primary">Skills I Offer</h2>
                                            </div>
                                            <p className="font-body-md text-body-md text-text-muted mt-1">
                                                Skills you can teach or mentor peers in during collaborative sessions.
                                            </p>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-elevated text-text-secondary">3 Active</span>
                                    </div>

                                    <div className="space-y-space-xs mt-space-sm">
                                        <div className="group flex items-center justify-between p-3 rounded-lg bg-surface-base hover:bg-surface-elevated transition-colors">
                                            <div className="flex flex-col min-w-0 pr-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-label-md text-label-md text-text-primary truncate">Product Design &amp; Prototyping</span>
                                                    <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-primary-fixed-dim">Advanced</span>
                                                </div>
                                                <span className="font-caption text-caption text-text-muted mt-0.5">Category: Design &amp; Creative</span>
                                            </div>
                                            <button aria-label="Remove Product Design" className="shrink-0 p-1.5 text-text-muted hover:text-status-rejected hover:bg-status-rejected-bg rounded transition-colors" type="button">
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>

                                        <div className="group flex items-center justify-between p-3 rounded-lg bg-surface-base hover:bg-surface-elevated transition-colors">
                                            <div className="flex flex-col min-w-0 pr-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-label-md text-label-md text-text-primary truncate">Figma Design Systems</span>
                                                    <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-primary-fixed-dim">Advanced</span>
                                                </div>
                                                <span className="font-caption text-caption text-text-muted mt-0.5">Category: Design &amp; Creative</span>
                                            </div>
                                            <button aria-label="Remove Figma Design Systems" className="shrink-0 p-1.5 text-text-muted hover:text-status-rejected hover:bg-status-rejected-bg rounded transition-colors" type="button">
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>

                                        <div className="group flex items-center justify-between p-3 rounded-lg bg-surface-base hover:bg-surface-elevated transition-colors">
                                            <div className="flex flex-col min-w-0 pr-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-label-md text-label-md text-text-primary truncate">User Research &amp; Usability Testing</span>
                                                    <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-text-secondary">Intermediate</span>
                                                </div>
                                                <span className="font-caption text-caption text-text-muted mt-0.5">Category: Design &amp; Creative</span>
                                            </div>
                                            <button aria-label="Remove User Research &amp; Usability Testing" className="shrink-0 p-1.5 text-text-muted hover:text-status-rejected hover:bg-status-rejected-bg rounded transition-colors" type="button">
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-space-lg pt-space-md rounded-lg bg-surface-elevated p-space-md">
                                    <span className="font-label-sm text-label-sm text-text-secondary block mb-space-sm">Add New Offered Skill</span>
                                    <div className="space-y-space-sm">
                                        <div>
                                            <label className="sr-only" htmlFor="offeredSkillInput">Skill Name</label>
                                            <input className="w-full h-9 px-3 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary transition-all" id="offeredSkillInput" placeholder="Select or type a skill (e.g. React Fundamentals)" type="text" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <div>
                                                <label className="sr-only" htmlFor="offeredCategorySelect">Category</label>
                                                <div className="relative flex items-center">
                                                    <select className="w-full h-9 pl-3 pr-8 rounded-lg bg-surface-base text-text-secondary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer" id="offeredCategorySelect">
                                                        <option value="design">Design &amp; Creative</option>
                                                        <option value="dev">Software Development</option>
                                                        <option value="product">Product Management</option>
                                                        <option value="marketing">Growth &amp; Marketing</option>
                                                        <option value="data">Data &amp; Analytics</option>
                                                    </select>
                                                    <span className="material-symbols-outlined absolute right-2 text-text-muted text-[18px] pointer-events-none">expand_more</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="sr-only" htmlFor="proficiencySelect">Proficiency</label>
                                                <div className="relative flex items-center">
                                                    <select className="w-full h-9 pl-3 pr-8 rounded-lg bg-surface-base text-text-secondary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer" id="proficiencySelect" defaultValue="intermediate">
                                                        <option value="advanced">Advanced (Mentored peers)</option>
                                                        <option value="intermediate">Intermediate (Competent)</option>
                                                        <option value="beginner">Beginner (Foundational)</option>
                                                    </select>
                                                    <span className="material-symbols-outlined absolute right-2 text-text-muted text-[18px] pointer-events-none">expand_more</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full mt-1 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary-fixed font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            Add Offered Skill
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2: Skills I Want */}
                            <section className="bg-surface-card rounded-xl p-space-lg flex flex-col justify-between shadow-md">
                                <div>
                                    <div className="flex items-start justify-between pb-space-md">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                                                <h2 className="font-headline-md text-headline-md text-text-primary">Skills I Want</h2>
                                            </div>
                                            <p className="font-body-md text-body-md text-text-muted mt-1">
                                                Skills you are looking to learn from fellow members in exchange.
                                            </p>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-elevated text-text-secondary">2 Active</span>
                                    </div>

                                    <div className="space-y-space-xs mt-space-sm">
                                        <div className="group flex items-center justify-between p-3 rounded-lg bg-surface-base hover:bg-surface-elevated transition-colors">
                                            <div className="flex items-center gap-space-sm min-w-0 pr-2">
                                                <span className="material-symbols-outlined text-[18px] text-tertiary">psychology</span>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-label-md text-label-md text-text-primary truncate">Python for Data Analysis</span>
                                                    <span className="font-caption text-caption text-text-muted">Target: Pandas, NumPy &amp; EDA workflows</span>
                                                </div>
                                            </div>
                                            <button aria-label="Remove Python for Data Analysis" className="shrink-0 p-1.5 text-text-muted hover:text-status-rejected hover:bg-status-rejected-bg rounded transition-colors" type="button">
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>

                                        <div className="group flex items-center justify-between p-3 rounded-lg bg-surface-base hover:bg-surface-elevated transition-colors">
                                            <div className="flex items-center gap-space-sm min-w-0 pr-2">
                                                <span className="material-symbols-outlined text-[18px] text-tertiary">database</span>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-label-md text-label-md text-text-primary truncate">PostgreSQL Schema Architecture</span>
                                                    <span className="font-caption text-caption text-text-muted">Target: Query optimization, index strategies</span>
                                                </div>
                                            </div>
                                            <button aria-label="Remove PostgreSQL Schema Architecture" className="shrink-0 p-1.5 text-text-muted hover:text-status-rejected hover:bg-status-rejected-bg rounded transition-colors" type="button">
                                                <span className="material-symbols-outlined text-[18px]">close</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-space-lg pt-space-md rounded-lg bg-surface-elevated p-space-md">
                                    <span className="font-label-sm text-label-sm text-text-secondary block mb-space-sm">Add Desired Learning Goal</span>
                                    <div className="space-y-space-sm">
                                        <div>
                                            <label className="sr-only" htmlFor="wantedSkillInput">Skill Name</label>
                                            <input className="w-full h-9 px-3 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary transition-all" id="wantedSkillInput" placeholder="Skill name (e.g. Next.js App Router, Cloud Architecture)" type="text" />
                                        </div>
                                        <button className="w-full h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-tertiary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                            Add Wanted Skill
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Persistent Bottom Action Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-card shadow-lg">
                            <div className="flex items-center gap-space-xs text-text-muted font-caption text-caption">
                                <span className="material-symbols-outlined text-[16px] text-text-muted">lock</span>
                                Profile details are shared exclusively with confirmed swap peers and in browse mode.
                            </div>
                            <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                                <Link to="/profile" className="px-4 py-2 rounded-lg font-label-md text-label-md text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors">
                                    Discard
                                </Link>
                                <button
                                    className="px-5 py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-80 disabled:cursor-not-allowed"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    type="button"
                                >
                                    <span className={`material-symbols-outlined text-[18px] ${isSaving && saveText === 'Saving...' ? 'animate-spin' : ''}`}>
                                        {isSaving ? (saveText === 'Saved!' ? 'done_all' : 'refresh') : 'check'}
                                    </span>
                                    {saveText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
