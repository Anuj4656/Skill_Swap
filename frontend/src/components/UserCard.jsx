import React from 'react';
import { Star, MapPin } from 'lucide-react';
import SkillChip from './SkillChip';
import './UserCard.css';

export default function UserCard({ user }) {
    // basic destructuring of mock or real user data
    const { name, location, availability, trust_score, skills_offered, skills_wanted, photo } = user;

    return (
        <div className="user-card">
            <div className="card-header">
                <div className="avatar-container">
                    {photo ? (
                        <img src={photo} alt={name} className="avatar-img" />
                    ) : (
                        <div className="avatar-placeholder">{name.charAt(0)}</div>
                    )}
                    <span className={`availability-badge ${availability}`}></span>
                </div>

                <div className="header-info">
                    <h3>{name}</h3>
                    <div className="header-meta">
                        {location && <span className="meta-item"><MapPin size={12} /> {location}</span>}
                        <span className="meta-item trust-score"><Star size={12} fill="currentColor" /> {trust_score.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            <div className="card-skills">
                <div className="skill-section">
                    <span className="section-label">Can Teach</span>
                    <div className="skill-tags">
                        {skills_offered?.map((skill, idx) => (
                            <SkillChip key={idx} skillName={skill.name} type="offers" />
                        ))}
                    </div>
                </div>

                <div className="skill-section">
                    <span className="section-label">Wants to Learn</span>
                    <div className="skill-tags">
                        {skills_wanted?.map((skill, idx) => (
                            <SkillChip key={idx} skillName={skill.name} type="wants" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="card-actions">
                <button className="btn-primary w-full">Request Swap</button>
            </div>
        </div>
    );
}
