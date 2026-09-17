import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-surface-container-low border-t border-border-subtle py-space-xl">
            <div className="max-w-6xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                    <span className="font-label-md text-label-md text-text-primary">Skill Swap</span>
                    <span className="font-caption text-caption text-text-muted">— Collegial peer-to-peer knowledge exchange</span>
                </div>
                <div className="flex items-center gap-space-lg font-caption text-caption text-text-muted">
                    <a className="hover:text-text-primary transition-colors" href="#">Guidelines</a>
                    <a className="hover:text-text-primary transition-colors" href="#">Exchange Principles</a>
                    <a className="hover:text-text-primary transition-colors" href="#">Help Center</a>
                    <span className="text-border-strong">•</span>
                    <span>© 2025 Skill Swap</span>
                </div>
            </div>
        </footer>
    );
}
