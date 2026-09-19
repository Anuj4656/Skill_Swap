import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../utils';

export default function Navbar() {
    const location = useLocation();
    const [userProfile, setUserProfile] = useState(null);

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
                    <img alt="Skill Swap Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XAXuyozRnk2Os9KtnusOxzt1cPCQcK6fRnB61HaS2qcjJ5PLbXUDPNDjeTVaM0K3py9o6JHtF_JO7xOHkjKnDDA_QNJk2rbiheg0pqhWIFImLXhcYTipuQJS_sGb0GSpNfJAkku7naH1tQp87cyTjkYU_yqlBt4sQMfIodL261L9PQBHcRLrv8GO0C2xnK8Od14_Y-_ZeI7to1qacdhbaPl7U73hBPuVgNtHIFNoOxtfV7kMwc01WcWzOr" />
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

                    <button aria-label="Notifications" className="p-space-xs text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface-elevated relative" type="button">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
                    </button>
                    <div className="h-5 w-px bg-border-subtle"></div>
                    {userProfile ? (
                        <div className="flex items-center gap-space-md pl-space-xs">
                            <Link to="/profile" className="flex items-center gap-space-sm cursor-pointer group">
                                <img alt="Profile" className="w-8 h-8 rounded-full object-cover border border-border-subtle" src={getImageUrl(userProfile.photo)} />
                                <span className="font-label-md text-label-md text-text-primary group-hover:text-primary transition-colors">
                                    {userProfile.first_name} {userProfile.last_name}
                                </span>
                            </Link>
                            <button
                                onClick={() => { localStorage.removeItem('access_token'); localStorage.removeItem('refresh_token'); window.location.href = '/login'; }}
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
        </header>
    );
}
