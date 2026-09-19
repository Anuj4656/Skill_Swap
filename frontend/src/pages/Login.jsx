import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [activePill, setActivePill] = useState('Flexible');
    const navigate = useNavigate();
    const [toast, setToast] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        const password = document.getElementById('password').value;

        try {
            if (isLogin) {
                const emailOrUsername = document.getElementById('emailOrUsername').value;
                const response = await fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/auth/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: emailOrUsername, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    navigate('/my-swaps');
                } else {
                    const errData = await response.text();
                    console.error("Login failed:", errData);
                    setErrorMsg("Login failed. Please check your credentials.");
                }
            } else {
                const firstName = document.getElementById('first-name').value;
                const lastName = document.getElementById('last-name').value;
                const username = document.getElementById('register-username').value;
                const email = document.getElementById('register-email').value;

                const response = await fetch((import.meta.env.VITE_API_BASE_URL || (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000')) + '/api/auth/register/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        first_name: firstName,
                        last_name: lastName
                    })
                });
                if (response.ok) {
                    setIsLogin(true);
                    setToast("Registration successful! You may now log in.");
                    setTimeout(() => setToast(''), 3000);
                } else {
                    const errData = await response.text();
                    console.error("Registration failed:", errData);
                    try {
                        const parsed = JSON.parse(errData);
                        const firstError = Object.values(parsed)[0];
                        if (Array.isArray(firstError)) {
                            setErrorMsg(firstError[0]);
                        } else if (typeof firstError === 'string') {
                            setErrorMsg(firstError);
                        } else {
                            setErrorMsg("Registration failed. Please check your details.");
                        }
                    } catch (e) {
                        setErrorMsg("Registration failed. Please check your details.");
                    }
                }
            }
        } catch (error) {
            console.error("Auth error:", error);
        }
    };

    const getPillClass = (pill) => {
        if (activePill === pill) {
            return "availability-pill active py-2 px-2.5 rounded-lg font-label-sm text-label-sm text-center transition-all bg-badge-wanted-bg text-primary-fixed-dim";
        }
        return "availability-pill py-2 px-2.5 rounded-lg font-label-sm text-label-sm text-center transition-all bg-surface-base text-text-secondary hover:bg-surface-elevated hover:text-text-primary";
    };

    return (
        <div className="flex flex-col w-full items-center justify-center py-space-xl px-margin-mobile md:px-margin min-h-screen pt-24 relative">
            {/* Custom Toast Alert */}
            {toast && (
                <div className="fixed bottom-space-xl right-space-lg bg-surface-elevated border border-surface-container-high rounded-lg p-space-md shadow-lg text-text-primary z-50 flex items-center gap-space-sm border-l-4 border-l-status-accepted animate-fade-in-up">
                    <span className="material-symbols-outlined text-status-accepted">check_circle</span>
                    <span className="font-label-md text-label-md">{toast}</span>
                </div>
            )}

            <div className="w-full max-w-[480px] bg-surface-card rounded-xl p-space-md sm:p-space-lg shadow-xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col items-center text-center mb-space-lg relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-surface-elevated flex items-center justify-center p-2 mb-space-sm shadow-sm">
                        <img alt="Skill Swap Logo" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XAXuyozRnk2Os9KtnusOxzt1cPCQcK6fRnB61HaS2qcjJ5PLbXUDPNDjeTVaM0K3py9o6JHtF_JO7xOHkjKnDDA_QNJk2rbiheg0pqhWIFImLXhcYTipuQJS_sGb0GSpNfJAkku7naH1tQp87cyTjkYU_yqlBt4sQMfIodL261L9PQBHcRLrv8GO0C2xnK8Od14_Y-_ZeI7to1qacdhbaPl7U73hBPuVgNtHIFNoOxtfV7kMwc01WcWzOr" />
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">Skill Swap</h1>
                </div>

                <div className="grid grid-cols-2 p-1 bg-surface-base rounded-lg mb-space-lg relative z-10">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(true); setErrorMsg(''); }}
                        className={`py-2 text-center rounded-lg font-label-md text-label-md transition-all ${isLogin ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsLogin(false); setErrorMsg(''); }}
                        className={`py-2 text-center rounded-lg font-label-md text-label-md transition-all ${!isLogin ? 'bg-surface-elevated text-text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}
                    >
                        Register
                    </button>
                </div>

                {errorMsg && (
                    <div className="mb-space-md p-space-sm bg-status-rejected-bg border border-status-rejected text-status-rejected rounded-lg font-label-sm text-label-sm relative z-10 text-center flex items-center justify-center">
                        <span className="material-symbols-outlined mr-1.5 text-[18px]">error</span>
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-space-md relative z-10">
                    {!isLogin ? (
                        <>
                            <div className="grid grid-cols-2 gap-space-md transition-all duration-200">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm text-text-secondary" htmlFor="first-name">First Name</label>
                                    <input className="w-full h-[38px] px-3 bg-surface-base rounded-lg text-text-primary placeholder:text-text-muted font-body-md text-body-md transition-colors focus:outline-none focus:bg-surface-elevated" id="first-name" placeholder="Elena" required type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-label-sm text-label-sm text-text-secondary" htmlFor="last-name">Last Name</label>
                                    <input className="w-full h-[38px] px-3 bg-surface-base rounded-lg text-text-primary placeholder:text-text-muted font-body-md text-body-md transition-colors focus:outline-none focus:bg-surface-elevated" id="last-name" placeholder="Vance" required type="text" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="font-label-sm text-label-sm text-text-secondary" htmlFor="register-username">Username</label>
                                <input className="w-full h-[38px] px-3 bg-surface-base rounded-lg text-text-primary placeholder:text-text-muted font-body-md text-body-md transition-colors focus:outline-none focus:bg-surface-elevated" id="register-username" placeholder="elenavance99" required type="text" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="font-label-sm text-label-sm text-text-secondary" htmlFor="register-email">Email Address</label>
                                <input className="w-full h-[38px] px-3 bg-surface-base rounded-lg text-text-primary placeholder:text-text-muted font-body-md text-body-md transition-colors focus:outline-none focus:bg-surface-elevated" id="register-email" placeholder="elena@example.edu" required type="email" />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label-sm text-label-sm text-text-secondary" htmlFor="emailOrUsername">Username or Email</label>
                            <div className="relative">
                                <input className="w-full h-[38px] px-3 bg-surface-base rounded-lg text-text-primary placeholder:text-text-muted font-body-md text-body-md transition-colors focus:outline-none focus:bg-surface-elevated" id="emailOrUsername" placeholder="elena.vance or elena@example.edu" required type="text" />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label className="font-label-sm text-label-sm text-text-secondary" htmlFor="password">Password</label>
                            {isLogin && (
                                <button className="font-caption text-caption text-text-muted hover:text-primary transition-colors" type="button">
                                    Forgot password?
                                </button>
                            )}
                        </div>
                        <div className="relative flex items-center">
                            <input
                                className="w-full h-[38px] pl-3 pr-10 bg-surface-base rounded-lg text-text-primary placeholder:text-text-muted font-body-md text-body-md transition-colors focus:outline-none focus:bg-surface-elevated"
                                id="password"
                                placeholder="••••••••••••"
                                required
                                type={showPassword ? 'text' : 'password'}
                            />
                            <button
                                aria-label="Toggle password visibility"
                                className="absolute right-2.5 p-1 text-text-muted hover:text-text-primary focus:outline-none transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {!isLogin && (
                        <>
                            <div className="flex flex-col gap-2 pt-1">
                                <span className="font-label-sm text-label-sm text-text-secondary">Availability</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <button className={getPillClass('Weekends')} onClick={() => setActivePill('Weekends')} type="button">Weekends</button>
                                    <button className={getPillClass('Evenings')} onClick={() => setActivePill('Evenings')} type="button">Evenings</button>
                                    <button className={getPillClass('Flexible')} onClick={() => setActivePill('Flexible')} type="button">Flexible</button>
                                </div>
                            </div>
                            <div className="pt-1">
                                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                                    <input defaultChecked className="mt-1 w-4 h-4 rounded bg-surface-base text-primary-container focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer accent-[#2E8B82]" type="checkbox" />
                                    <span className="font-body-md text-body-md text-text-muted leading-snug">
                                        Make profile public to search by default
                                    </span>
                                </label>
                            </div>
                        </>
                    )}

                    <div className="pt-2">
                        <button className="w-full h-[38px] bg-[#2E8B82] hover:bg-[#349A90] active:bg-[#27756E] text-text-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm" type="submit">
                            <span>{isLogin ? 'Log in' : 'Create Account'}</span>
                            <span className="material-symbols-outlined text-[16px]">{isLogin ? 'login' : 'arrow_forward'}</span>
                        </button>
                    </div>
                </form>

                <div className="mt-space-md text-center relative z-10">
                    <button className="font-body-md text-body-md text-text-muted hover:text-text-primary transition-colors" onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }} type="button">
                        {isLogin ? (
                            <>Don't have an account yet? <span className="text-primary-fixed-dim font-label-md underline underline-offset-4">Register here</span></>
                        ) : (
                            <>Already have an account? <span className="text-primary-fixed-dim font-label-md underline underline-offset-4">Log in here</span></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
