import React from 'react';

export default function Footer() {
    return (
        <footer id="footer" className="w-full bg-surface-container-low border-t border-border-subtle pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-space-sm mb-4">
                        <span className="font-title-lg text-title-lg text-text-primary font-bold">Skill Swap</span>
                    </div>
                    <p className="text-text-muted font-body-md text-body-md max-w-sm mb-6 leading-relaxed">
                        Join our collegial peer-to-peer knowledge exchange community. Trade what you know for what you want to learn, without spending a dime.
                    </p>
                    <div className="flex items-center gap-4 text-text-muted">
                        <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                            <span className="material-symbols-outlined text-[24px]">share</span>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                            <span className="material-symbols-outlined text-[24px]">connect_without_contact</span>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub">
                            <span className="material-symbols-outlined text-[24px]">code</span>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="font-label-lg text-label-lg text-text-primary font-semibold mb-4 uppercase tracking-wider">Company</h3>
                    <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-text-muted">
                        <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-label-lg text-label-lg text-text-primary font-semibold mb-4 uppercase tracking-wider">Resources</h3>
                    <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-text-muted">
                        <li><a href="#" className="hover:text-primary transition-colors">Guidelines</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Exchange Principles</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Community Forum</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-gutter pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="font-caption text-caption text-text-muted">© 2025 Skill Swap. All rights reserved.</span>
                <div className="flex gap-6 font-caption text-caption text-text-muted">
                    <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
