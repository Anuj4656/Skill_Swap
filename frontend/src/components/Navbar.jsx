import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

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
                    <Link to="/dashboard" className={`${getNavClass('/dashboard')} gap-space-xs`}>
                        My Swaps
                        <span className="px-1.5 py-0.5 rounded-lg bg-surface-elevated text-text-muted text-caption font-caption border border-border-strong">2</span>
                    </Link>
                    <Link to="#" className={getNavClass('#')}>Community Skills</Link>
                </nav>
                <div className="flex items-center gap-space-md">
                    <button aria-label="Search" className="p-space-xs text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface-elevated" type="button">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </button>
                    <button aria-label="Notifications" className="p-space-xs text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface-elevated relative" type="button">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full"></span>
                    </button>
                    <div className="h-5 w-px bg-border-subtle"></div>
                    <Link to="/profile" className="flex items-center gap-space-sm pl-space-xs cursor-pointer group">
                        <img alt="Profile" className="w-8 h-8 rounded-full object-cover border border-border-subtle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUGDUtSX2YsLSl5QLaKJbo6lwG-GdQdnlqas1a0mfGTm0JpfcEYrrVn_--1_c1f7Mp3zgqrxhWeoDYdVM5cUcBbu9gvMfHOWFVtsb_Va_rfbLxO-qkEnT6hZN6BmfIv7mCNOt7fSmpekpKp7YdPc-_FID0jgXhN00SvBOvEsuTHG5swzKh1Bbnow2CNEMEoKp3t72A9-sEKt1j5qZOwpnslANgpCns5JrPsiyeE1BoiP3u4PtXD2IGNQ" />
                        <span className="font-label-md text-label-md text-text-primary group-hover:text-primary transition-colors">Elena Vance</span>
                        <span className="material-symbols-outlined text-[18px] text-text-muted group-hover:text-text-primary transition-colors">keyboard_arrow_down</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
