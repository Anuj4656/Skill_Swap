import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import './Navbar.css'; // Let's assume we create a basic css for it

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-brand">
                    <Layers size={24} className="brand-icon" />
                    <span className="brand-name">SkillSwap</span>
                </Link>

                <div className="nav-links">
                    <Link to="/login" className="nav-link">Log in</Link>
                    <Link to="/register" className="nav-cta">Register</Link>
                </div>
            </div>
        </nav>
    );
}
