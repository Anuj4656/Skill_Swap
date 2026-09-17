import React from 'react';
import './SkillChip.css';

export default function SkillChip({ skillName, type = 'default', isPending = false }) {
    // type can be 'offers' (teal) or 'wants' (slate/indigo)
    return (
        <span className={`skill-chip skill-chip-${type}`}>
            {skillName}
            {isPending && <span className="chip-pending-badge" title="Pending Approval">⏳</span>}
        </span>
    );
}
