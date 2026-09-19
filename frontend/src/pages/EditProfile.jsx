import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../utils';
import Modal from '../components/Modal';

export default function EditProfile() {
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [saveText, setSaveText] = useState('Save Profile');
    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
            fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/skills/', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/offered/', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/wanted/', { headers: { 'Authorization': `Bearer ${token}` } })
        ])
            .then(async ([profileRes, skillsRes, offeredRes, wantedRes]) => {
                const data = await profileRes.json();
                const skillsData = await skillsRes.json();
                const offeredData = await offeredRes.json();
                const wantedData = await wantedRes.json();

                const skillsFinal = Array.isArray(skillsData) ? skillsData : skillsData.results || [];

                setFirstName(data.user?.first_name || '');
                setLastName(data.user?.last_name || '');
                setLocation(data.location || '');
                setAvailability(data.availability || 'flexible');
                setIsPublic(data.is_public);
                setPhoto(getImageUrl(data.photo));

                setAvailableSkills(skillsFinal);
                setOffered(Array.isArray(offeredData) ? offeredData : offeredData.results || []);
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
        const res = await fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/offered/', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill_id: selectedOfferedSkill })
        });
        if (res.ok) {
            const newItem = await res.json();
            setOffered([...offered, newItem]);
        }
    };

    const handleRemoveOffered = (id) => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Remove Skill',
            message: 'Are you sure you want to remove this skill?',
            isDestructive: true,
            onConfirm: async () => {
                const token = localStorage.getItem('access_token');
                const res = await fetch(`${(import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'))}/api/profile/me/offered/${id}/`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) setOffered(prev => prev.filter(item => item.id !== id));
            }
        });
    };

    const handleAddWanted = async () => {
        if (!selectedWantedSkill) return;
        const token = localStorage.getItem('access_token');
        const res = await fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/wanted/', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill_id: selectedWantedSkill })
        });
        if (res.ok) {
            const newItem = await res.json();
            setWanted([...wanted, newItem]);
        }
    };

    const handleRemoveWanted = (id) => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Remove Skill',
            message: 'Are you sure you want to remove this skill?',
            isDestructive: true,
            onConfirm: async () => {
                const token = localStorage.getItem('access_token');
                const res = await fetch(`${(import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'))}/api/profile/me/wanted/${id}/`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) setWanted(prev => prev.filter(item => item.id !== id));
            }
        });
    };

    const handleSave = () => {
        setIsSaving(true);
        setSaveText('Saving...');

        const token = localStorage.getItem('access_token');
        const payload = {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            location: location,
            availability: availability,
            is_public: isPublic,
            photo: typeof photo === 'string' ? photo : null
        };

        fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
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

    const handleDeleteAccount = () => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Delete Account',
            message: 'Are you sure you want to permanently delete your account? This action cannot be undone.',
            isDestructive: true,
            onConfirm: async () => {
                const token = localStorage.getItem('access_token');
                try {
                    const res = await fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/', {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok || res.status === 204) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        navigate('/login');
                    } else {
                        alert("Failed to delete account. Please try again.");
                    }
                } catch (e) {
                    console.error(e);
                    alert("Error occurring while trying to delete account.");
                }
            }
        });
    };

    if (loading) return null;

    return (
        <main className="w-full pt-16 bg-surface-base min-h-screen">
            <div className="max-w-6xl mx-auto px-gutter py-space-xl">
                <div className="flex flex-col w-full">

                    {/* Breadcrumb and Context Nav */}
                    <div className="flex items-center justify-between pb-space-lg">
                        <nav aria-label="Breadcrumb" className="flex items-center">
                            <Link to="/profile" className="flex items-center gap-space-xs font-label-sm text-label-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer group">
                                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                <span className="font-semibold">Back to Profile</span>
                            </Link>
                        </nav>
                        <div className="flex items-center gap-space-sm">
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
                                            <img alt="Portrait" className="w-full h-full object-cover group-hover:opacity-85 transition-opacity" src={getImageUrl(photo)} />
                                        </div>
                                        <button
                                            aria-label="Change photo"
                                            className="absolute -bottom-1 -right-1 flex items-center justify-center p-2 rounded-full bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-container-highest shadow-sm transition-all"
                                            title="Change Profile Photo"
                                            onClick={() => {
                                                setModalConfig({
                                                    isOpen: true,
                                                    type: 'prompt',
                                                    title: 'Change Profile Picture',
                                                    message: 'Enter the URL of your new profile picture.',
                                                    defaultValue: typeof photo === 'string' ? photo : "",
                                                    onConfirm: (url) => {
                                                        if (url !== null) {
                                                            setPhoto(url.trim());
                                                        }
                                                    }
                                                });
                                            }}
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                        </button>
                                    </div>

                                    {/* Basic Metadata Fields */}
                                    <div className="space-y-space-md w-full max-w-lg">
                                        <div className="grid grid-cols-2 gap-space-md">
                                            <div>
                                                <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <input value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full h-10 px-3.5 rounded-lg bg-surface-base text-text-primary font-headline-md text-headline-md focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted" id="firstName" placeholder="First" type="text" />
                                            </div>
                                            <div>
                                                <label className="block font-caption text-caption text-text-muted uppercase tracking-wider mb-1.5" htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <input value={lastName} onChange={e => setLastName(e.target.value)} className="w-full h-10 px-3.5 rounded-lg bg-surface-base text-text-primary font-headline-md text-headline-md focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-text-muted" id="lastName" placeholder="Last" type="text" />
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

                                {/* Right: Privacy Switch */}
                                <div className="w-full lg:w-80 flex flex-col gap-space-lg shrink-0">
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
                                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-elevated text-text-secondary whitespace-nowrap">{offered.length} Active</span>
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
                                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-elevated text-text-secondary whitespace-nowrap">{wanted.length} Active</span>
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
                            <div className="flex items-center gap-space-xs text-text-muted font-caption text-caption w-full sm:w-auto text-center sm:text-left">
                                <span className="material-symbols-outlined text-[16px] text-text-muted hidden sm:inline">lock</span>
                                Profile details are shared exclusively with confirmed swap peers and in browse mode.
                            </div>
                            <div className="flex items-center gap-space-sm w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-border-subtle pt-3 sm:pt-0 mt-2 sm:mt-0">
                                <button
                                    className="sm:mr-4 px-3 sm:px-4 py-2 flex items-center gap-1.5 rounded-lg font-label-md text-label-md text-status-rejected hover:bg-status-rejected-bg transition-colors"
                                    onClick={handleDeleteAccount}
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                                    <span className="hidden sm:inline">Delete Account</span>
                                </button>
                                <div className="flex items-center gap-space-sm">
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
            </div>
            <Modal {...modalConfig} onClose={closeModal} />
        </main>
    );
}
