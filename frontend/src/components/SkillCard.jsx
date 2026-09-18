import React from 'react';
import { Link } from 'react-router-dom';

export default function SkillCard({ user }) {
    return (
        <article className="bg-surface-card rounded-xl p-space-lg flex flex-col justify-between hover:bg-surface-elevated transition-colors duration-200">
            <div>
                <div className="flex items-start justify-between gap-space-sm mb-space-md">
                    <div className="flex items-center gap-space-sm">
                        <img className="w-12 h-12 rounded-full object-cover bg-surface-container" alt={user.name} src={user.avatar} />
                        <div>
                            <h2 className="font-title-md text-title-md text-text-primary">{user.name}</h2>
                            <div className="flex items-center gap-space-xs text-text-muted font-caption text-caption">
                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                {user.location}
                            </div>
                        </div>
                    </div>
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-status-accepted-bg text-status-accepted">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-accepted"></span>
                        {user.availability}
                    </span>
                </div>

                <div className="space-y-space-md mb-space-md">
                    <div>
                        <span className="font-caption text-caption tracking-wider uppercase text-primary-container block mb-1.5">Offering</span>
                        <div className="flex flex-wrap gap-1.5">
                            {user.offering.map((skill, index) => (
                                <span key={index} className="font-label-sm text-label-sm px-2 py-0.5 rounded-lg bg-badge-wanted-bg text-primary-fixed">{skill.name || skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="font-caption text-caption tracking-wider uppercase text-text-muted block mb-1.5">Looking For</span>
                        <div className="flex flex-wrap gap-1.5">
                            {user.lookingFor.map((skill, index) => (
                                <span key={index} className="font-label-sm text-label-sm px-2 py-0.5 rounded-lg bg-surface-container text-text-secondary">{skill.name || skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-space-md mt-space-md bg-surface-container-low/60 -mx-space-lg -mb-space-lg p-space-lg rounded-b-xl">
                <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-status-pending text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-title-md text-title-md text-text-primary">{user.rating}</span>
                        <span className="font-caption text-caption text-text-muted">({user.swaps} swaps)</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-space-xs">
                    <Link to={`/profile/${user.id}`} className="flex items-center justify-center w-full h-9 rounded-lg font-label-md text-label-md bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors">
                        Profile
                    </Link>
                    <button className="w-full h-9 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors" type="button">
                        Request Swap
                    </button>
                </div>
            </div>
        </article>
    );
}
