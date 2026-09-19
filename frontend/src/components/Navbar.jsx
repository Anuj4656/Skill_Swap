import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../utils';
import Modal from './Modal';

export default function Navbar() {
    const location = useLocation();
    const [userProfile, setUserProfile] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false });
    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/profile/me/', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => {
                    if (res.ok) return res.json();
                    return null;
                })
                .then(data => {
                    if (data) setUserProfile(data);
                })
                .catch(err => console.error("Error fetching navbar user context", err));
        }
    }, [location.pathname]); // Refetch if logged in status could change, using pathname as simple trigger or rely on global state.

    const getNavClass = (path) => {
        const isActive = location.pathname === path;
        const baseClass = "inline-flex items-center h-full transition-colors font-label-md text-label-md pt-0.5";
        return isActive
            ? `${baseClass} text-text-primary border-b-2 border-primary`
            : `${baseClass} text-text-muted hover:text-text-primary`;
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-low/95 backdrop-blur-md border-b border-border-subtle">
            <div className="h-16 max-w-6xl mx-auto px-gutter flex items-center justify-between">
                <Link to="/" className="flex items-center gap-space-sm">
                    <img alt="Skill Swap Logo" className="h-8 w-auto object-contain" src="/favicon.svg" />
                    <span className="font-title-md text-title-md text-text-primary tracking-tight">Skill Swap</span>
                </Link>
                <nav className="flex items-center gap-space-lg h-full">
                    <Link to="/browse" className={getNavClass('/browse')}>Browse Users</Link>
                    <Link to="/my-swaps" className={`${getNavClass('/my-swaps')} gap-space-xs`}>
                        <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                        My Swaps
                    </Link>
                    <a href="#footer" className={getNavClass('#footer')}>About Us</a>
                    {userProfile?.is_staff && (
                        <a href={(import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000') + "/admin/"} className={getNavClass('/admin')}>Admin</a>
                    )}
                </nav>
                <div className="flex items-center gap-space-md">


                    {userProfile ? (
                        <div className="flex items-center gap-space-md pl-space-xs">
                            <Link to="/profile" className="flex items-center gap-space-sm cursor-pointer group">
                                <img alt="Profile" className="w-8 h-8 rounded-full object-cover border border-border-subtle" src={getImageUrl(userProfile.photo)} />
                                <span className="font-label-md text-label-md text-text-primary group-hover:text-primary transition-colors">
                                    {userProfile.first_name} {userProfile.last_name}
                                </span>
                            </Link>
                            <button
                                onClick={() => {
                                    setModalConfig({
                                        isOpen: true,
                                        type: 'confirm',
                                        title: 'Confirm Logout',
                                        message: 'Are you sure you want to log out of your account?',
                                        isDestructive: false,
                                        onConfirm: () => {
                                            localStorage.removeItem('access_token');
                                            localStorage.removeItem('refresh_token');
                                            window.location.href = '/login';
                                        }
                                    });
                                }}
                                className="font-label-md text-label-md text-text-muted hover:text-primary transition-colors border border-border-subtle px-space-sm py-1 rounded-md hover:border-primary"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-space-sm pl-space-xs cursor-pointer group">
                            <span className="font-label-md text-label-md text-text-primary group-hover:text-primary transition-colors">
                                Login
                            </span>
                        </Link>
                    )}
                </div>
            </div>
            <Modal {...modalConfig} onClose={closeModal} />
        </header>
    );
}
