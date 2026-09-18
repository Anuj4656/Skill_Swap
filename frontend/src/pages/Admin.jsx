import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [pendingSkills, setPendingSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetch('http://127.0.0.1:8000/api/admin/skills/pending/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    navigate('/dashboard'); // Not an admin, redirect fallback
                    throw new Error('Not authorized');
                }
                return res.json();
            })
            .then(data => {
                setPendingSkills(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [navigate]);

    const handleAction = (id, action) => {
        const token = localStorage.getItem('access_token');

        fetch(`http://127.0.0.1:8000/api/admin/skills/${id}/${action}/`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            if (res.ok) {
                // Remove the skill from the pending list optimistically
                setPendingSkills(prev => prev.filter(skill => skill.id !== id));
            }
        }).catch(err => console.error("Error performing admin action:", err));
    };

    return (
        <main className="w-full pt-24 pb-space-2xl min-h-screen bg-surface-container-lowest">
            <div className="max-w-6xl mx-auto px-gutter">
                <div className="flex flex-col mb-space-lg">
                    <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">Admin Dashboard</h1>
                    <p className="font-body-md text-text-muted mt-1">Manage platform taxonomy and community reports.</p>
                </div>

                <div className="bg-surface-card rounded-xl shadow-sm p-space-lg">
                    <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-surface-container-high">
                        <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[20px] text-primary">sell</span>
                            <h2 className="font-title-md text-title-md text-text-primary">Pending Skills for Approval</h2>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-text-secondary font-label-sm">{pendingSkills.length}</span>
                    </div>

                    {loading ? (
                        <p className="text-text-muted font-body-md text-center py-6">Loading pending skills...</p>
                    ) : pendingSkills.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2">
                            <span className="material-symbols-outlined text-[48px] text-border-strong" style={{ fontVariationSettings: "'FILL' 0" }}>task_alt</span>
                            <p className="text-text-muted font-body-md">All community skill requests have been reviewed.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-space-sm">
                            {pendingSkills.map(skill => (
                                <div key={skill.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md bg-surface-container-low/50 rounded-lg border border-surface-container hover:border-border-subtle transition-colors gap-space-md">
                                    <div>
                                        <h3 className="font-title-sm text-title-sm text-text-primary mb-1">{skill.name}</h3>
                                        <span className="font-caption text-caption text-text-muted uppercase tracking-wider bg-surface-container-high px-2 py-0.5 rounded">{skill.category?.name || 'Uncategorized'}</span>
                                    </div>
                                    <div className="flex items-center gap-space-sm">
                                        <button onClick={() => handleAction(skill.id, 'reject')} className="px-space-md py-1.5 rounded-lg bg-surface-elevated hover:bg-status-rejected hover:text-on-primary text-text-secondary font-label-sm transition-colors border border-surface-container-high hover:border-status-rejected shadow-sm">Reject / Delete</button>
                                        <button onClick={() => handleAction(skill.id, 'approve')} className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-sm hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">Approve</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
