import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [saveText, setSaveText] = useState('Save Profile');
    const [loading, setLoading] = useState(true);

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState('flexible');
    const [isPublic, setIsPublic] = useState(true);
    const [photo, setPhoto] = useState('');

    // Skills state
    const [offered, setOffered] = useState([]);
    const [wanted, setWanted] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
    const [selectedWantedSkill, setSelectedWantedSkill] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return navigate('/login');

        Promise.all([
            fetch('http://127.0.0.1:8000/api/profile/me/', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch('http://127.0.0.1:8000/api/skills/', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch('http://127.0.0.1:8000/api/user-skills-offered/', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch('http://127.0.0.1:8000/api/user-skills-wanted/', { headers: { 'Authorization': `Bearer ${token}` } })
        ])
            .then(async ([profileRes, skillsRes, offeredRes, wantedRes]) => {
                const data = await profileRes.json();
                const skillsData = await skillsRes.json();
                const offeredData = await offeredRes.json();
                const wantedData = await wantedRes.json();

                setFirst(data.user?.first_name || '');
                setLast(data.user?.last_name || '');
                setLocation(data.location || '');
                setAvailability(data.availability || 'flexible');
                setIsPublic(data.is_public);
                setPhoto(data.photo || 'https://www.gravatar.com/avatar/00?d=mp');

                setAvailableSkills(skillsData);
                setOffered(offeredData);
                setWanted(wantedData);

                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data", err);
                setLoading(false);
            });
    }, [navigate]);

    const handleAddOffered = async () => {
        if (!selectedOfferedSkill) return;
        const token = localStorage.getItem('access_token');
        const res = await fetch('http://127.0.0.1:8000/api/user-skills-offered/', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill_id: selectedOfferedSkill })
        });
        if (res.ok) {
            const newItem = await res.json();
            setOffered([...offered, newItem]);
        }
    };

    const handleRemoveOffered = async (id) => {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/user-skills-offered/${id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setOffered(offered.filter(item => item.id !== id));
    };

    const handleAddWanted = async () => {
        if (!selectedWantedSkill) return;
        const token = localStorage.getItem('access_token');
        const res = await fetch('http://127.0.0.1:8000/api/user-skills-wanted/', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill_id: selectedWantedSkill })
        });
        if (res.ok) {
            const newItem = await res.json();
            setWanted([...wanted, newItem]);
        }
    };

    const handleRemoveWanted = async (id) => {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://127.0.0.1:8000/api/user-skills-wanted/${id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setWanted(wanted.filter(item => item.id !== id));
    };

    const handleSave = () => {
        setIsSaving(true);
        setSaveText('Saving...');

        const token = localStorage.getItem('access_token');
        fetch('http://127.0.0.1:8000/api/profile/me/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: first,
                last_name: last,
                location: location,
                availability: availability,
                is_public: isPublic
            })
        })
            .then(res => {
                if (res.ok) {
                    setSaveText('Saved!');
                    setTimeout(() => {
                        setIsSaving(false);
                        setSaveText('Save Profile');
                        navigate('/profile');
                    }, 1000);
                } else {
                    throw new Error("Failed to save");
                }
            })
            .catch(err => {
                console.error("Save error", err);
                setIsSaving(false);
                setSaveText('Save Failed');
                setTimeout(() => setSaveText('Save Profile'), 2000);
            });
    };

    if (loading) return null;

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
                                            <img alt="Portrait" className="w-full h-full object-cover group-hover:opacity-85 transition-opacity" src={photo} />
                                        </div>
                                        <button aria-label="Change photo" className="absolute -bottom-1 -right-1 flex items-center justify-center p-2 rounded-full bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-container-highest shadow-sm transition-all" title="Change Profile Photo" type="button">
                                            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                        </button>
                                    </div>

                                    {/* Basic Metadata Fields */}
                                    <div className="space-y-space-md w-full max-w-md">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <input value={first} onChange={e => setFirst(e.target.value)} className="w-full h-10 px-3.5 rounded-lg bg-surface-base text-text-primary font-headline-md text-headline-md focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted" id="firstName" type="text" />
                                            </div>
                                            <div>
                                                <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5" htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <input value={last} onChange={e => setLast(e.target.value)} className="w-full h-10 px-3.5 rounded-lg bg-surface-base text-text-primary font-headline-md text-headline-md focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted" id="lastName" type="text" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5" htmlFor="userLocation">
                                                Location &amp; Timezone
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="material-symbols-outlined absolute left-3 text-text-muted text-[18px] pointer-events-none">location_on</span>
                                                <input value={location} onChange={e => setLocation(e.target.value)} className="w-full h-9 pl-9 pr-3.5 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted" id="userLocation" placeholder="City, State or Country" type="text" />
                                            </div>
                                        </div>

                                        {/* Availability Selector */}
                                        <div>
                                            <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5">
                                                General Availability
                                            </label>
                                            <div aria-label="Availability" className="flex flex-wrap gap-2" role="radiogroup">
                                                {['weekends', 'evenings', 'weekdays', 'flexible'].map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setAvailability(opt)}
                                                        className={`px-3 py-1.5 rounded-lg text-label-sm font-label-sm capitalize transition-colors ${availability === opt
                                                            ? 'bg-primary-container text-on-primary-container shadow-sm flex items-center gap-1.5'
                                                            : 'bg-surface-elevated text-text-muted hover:text-text-primary hover:bg-surface-container-high'
                                                            }`}
                                                        type="button">
                                                        {availability === opt && <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>}
                                                        {opt}
                                                    </button>
                                                ))}
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
                                                <input checked={isPublic} onChange={e => setIsPublic(e.target.checked)} className="sr-only peer" id="publicToggle" type="checkbox" />
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
                                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-elevated text-text-secondary">{offered.length} Active</span>
                                    </div>

                                    <div className="space-y-space-xs mt-space-sm">
                                        {offered.map(item => (
                                            <div key={item.id} className="group flex items-center justify-between p-3 rounded-lg bg-surface-base hover:bg-surface-elevated transition-colors">
                                                <div className="flex flex-col min-w-0 pr-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-label-md text-label-md text-text-primary truncate">{item.skill?.name}</span>
                                                    </div>
                                                    <span className="font-caption text-caption text-text-muted mt-0.5">Category: {item.skill?.category?.name || 'Uncategorized'}</span>
                                                </div>
                                                <button onClick={() => handleRemoveOffered(item.id)} aria-label="Remove Skill" className="shrink-0 p-1.5 text-text-muted hover:text-status-rejected hover:bg-status-rejected-bg rounded transition-colors" type="button">
                                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-space-lg pt-space-md rounded-lg bg-surface-elevated p-space-md">
                                    <span className="font-label-sm text-label-sm text-text-secondary block mb-space-sm">Add New Offered Skill</span>
                                    <div className="space-y-space-sm">
                                        <div className="relative">
                                            <label className="sr-only" htmlFor="offeredSkillSelect">Select Skill</label>
                                            <select value={selectedOfferedSkill} onChange={e => setSelectedOfferedSkill(e.target.value)} className="w-full h-9 pl-3 pr-8 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer" id="offeredSkillSelect">
                                                <option value="" disabled>Select a skill you can teach...</option>
                                                {availableSkills.map(skill => (
                                                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                                                ))}
                                            </select>
                                            <span className="material-symbols-outlined absolute right-2 top-1.5 text-text-muted text-[18px] pointer-events-none">expand_more</span>
                                        </div>

                                        <button onClick={handleAddOffered} className="w-full mt-1 h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary-fixed font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors" type="button">
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
                                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-elevated text-text-secondary">{wanted.length} Active</span>
                                    </div>

                                    <div className="space-y-space-xs mt-space-sm">
                                        {wanted.map(item => (
                                            <div key={item.id} className="group flex items-center justify-between p-3 rounded-lg bg-surface-base hover:bg-surface-elevated transition-colors">
                                                <div className="flex items-center gap-space-sm min-w-0 pr-2">
                                                    <span className="material-symbols-outlined text-[18px] text-tertiary">psychology</span>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-label-md text-label-md text-text-primary truncate">{item.skill?.name}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleRemoveWanted(item.id)} aria-label="Remove Target Skill" className="shrink-0 p-1.5 text-text-muted hover:text-status-rejected hover:bg-status-rejected-bg rounded transition-colors" type="button">
                                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-space-lg pt-space-md rounded-lg bg-surface-elevated p-space-md">
                                    <span className="font-label-sm text-label-sm text-text-secondary block mb-space-sm">Add Desired Learning Goal</span>
                                    <div className="space-y-space-sm">
                                        <div className="relative">
                                            <label className="sr-only" htmlFor="wantedSkillSelect">Select Wanted Skill</label>
                                            <select value={selectedWantedSkill} onChange={e => setSelectedWantedSkill(e.target.value)} className="w-full h-9 pl-3 pr-8 rounded-lg bg-surface-base text-text-primary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer" id="wantedSkillSelect">
                                                <option value="" disabled>Select a skill you want to learn...</option>
                                                {availableSkills.map(skill => (
                                                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                                                ))}
                                            </select>
                                            <span className="material-symbols-outlined absolute right-2 top-1.5 text-text-muted text-[18px] pointer-events-none">expand_more</span>
                                        </div>
                                        <button onClick={handleAddWanted} className="w-full h-9 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-tertiary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors" type="button">
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
