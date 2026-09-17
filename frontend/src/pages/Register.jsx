import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Create an account</h2>
                    <p>Join SkillSwap to start collaborating.</p>
                </div>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Alice Johnson" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="you@example.com" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="btn-primary">Create account</button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Log in here</Link></p>
                </div>
            </div>
        </div>
    );
}
