import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <span className="material-symbols-outlined text-[72px] text-primary mb-6">search_off</span>
            <h1 className="text-8xl font-headline-lg font-bold text-text-primary mb-2">404</h1>
            <h2 className="text-3xl font-title-lg text-text-primary mb-6">Page Not Found</h2>
            <p className="text-text-muted max-w-md mx-auto mb-8 font-body-lg text-lg">
                The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
            </p>
            <Link to="/" className="px-6 py-3 bg-primary text-on-primary rounded-xl font-label-lg hover:bg-primary-fixed-dim transition-colors shadow-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">home</span>
                Back to Dashboard
            </Link>
        </div>
    );
}
