import React from 'react';

export default function AuthRaw() {
  return (
    <>

{/*  Top Announcement / Trust Ribbon  */}

{/*  Navigation Header  */}
<header className="w-full bg-white/90 backdrop-blur-md border-b border-[#e2e8f0] sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0037b0] to-[#1d4ed8] flex items-center justify-center shadow-md shadow-blue-900/10">
<span className="font-mono text-xs font-bold text-white tracking-wider">SS</span>
</div>
<div>
<span className="font-bold text-lg tracking-tight text-[#0b1c30]">Skill<span className="text-[#1d4ed8]">Swap</span></span>
<span className="hidden sm:inline-block ml-1.5 text-[10px] uppercase font-semibold tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">Corporate</span>
</div>
</div>
</div>
<div>
<a className="inline-flex items-center gap-1.5 text-xs font-medium text-[#434655] hover:text-[#1d4ed8] transition-colors border border-[#e2e8f0] hover:border-[#1d4ed8]/30 bg-white hover:bg-blue-50/50 px-3 py-1.5 rounded-lg shadow-sm" data-path="discovery" href="#">
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
<span className="">Return to Discovery</span>
</a>
</div>
</div>
</header>
{/*  Main Login Workspace  */}
<main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12 relative overflow-hidden">
{/*  Subtle Background Accent Grid  */}
<div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
<div className="w-full max-w-4xl mx-auto relative z-10">
{/*  Primary Card Container  */}
<div className="rounded-2xl border border-[#e2e8f0] bg-white shadow-card overflow-hidden">
{/*  Blueprint Metadata / Status Header Bar  */}

{/*  Two Column High-Fidelity Grid  */}
<div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
{/*  Left Column: Platform Overview & Schema  */}
<div className="md:col-span-5 p-6 lg:p-8 bg-gradient-to-b from-[#f8fafc] to-[#eff4ff]/30 flex flex-col justify-between gap-6"><div className="space-y-6"><div><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#1d4ed8] border border-blue-100 mb-3">How It Works</span><h2 className="text-2xl font-bold text-[#0b1c30] tracking-tight mb-2">Swap skills, not money.</h2><p className="text-sm text-[#565e74] leading-relaxed">A collaborative community designed for friction-free knowledge transfer and peer learning.</p></div><div className="space-y-3"><div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm"><div className="flex items-center gap-2.5 mb-1"><span className="material-symbols-outlined text-[20px] text-[#1d4ed8]">school</span><h3 className="text-sm font-semibold text-[#0b1c30]">Share what you know</h3></div><p className="text-xs text-[#565e74]">List skills, tools, and topics you are excited to teach or mentor others in.</p></div><div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm"><div className="flex items-center gap-2.5 mb-1"><span className="material-symbols-outlined text-[20px] text-[#1d4ed8]">lightbulb</span><h3 className="text-sm font-semibold text-[#0b1c30]">Learn what you need</h3></div><p className="text-xs text-[#565e74]">Find experienced peers to help you master new concepts and technologies.</p></div><div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm"><div className="flex items-center gap-2.5 mb-1"><span className="material-symbols-outlined text-[20px] text-emerald-600">handshake</span><h3 className="text-sm font-semibold text-[#0b1c30]">Direct reciprocity</h3></div><p className="text-xs text-[#565e74]">Coordinate friendly 1-on-1 sessions with no fees, points, or complications.</p></div></div></div><div className="border border-[#e2e8f0] bg-white rounded-xl p-3.5 shadow-sm"><div className="grid grid-cols-2 gap-2 text-center"><div className="p-2.5 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]"><div className="text-xl font-bold text-[#0b1c30]">14,000+</div><div className="text-xs font-medium text-[#565e74] mt-0.5">Completed Swaps</div></div><div className="p-2.5 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]"><div className="text-xl font-bold text-[#1d4ed8]">99%</div><div className="text-xs font-medium text-[#565e74] mt-0.5">Positive Ratings</div></div></div></div></div>
{/*  Right Column: Authentication Form  */}
<div className="md:col-span-7 p-6 lg:p-8 bg-white flex flex-col justify-between">
<div>
{/*  Form Section Header  */}

{/*  Title  */}
<h1 className="text-2xl font-bold tracking-tight text-[#0b1c30] mb-1.5">Welcome back</h1>
<p className="text-sm text-[#565e74] mb-6">
  Enter your credentials to access your skill exchanges.
</p>
{/*  Login Form  */}
<form className="space-y-4" id="wireframe-login-form" onsubmit="event.preventDefault();">
{/*  Identifier Input  */}
<div className="space-y-1.5">
<div className="flex items-center justify-between">
<label className="text-xs font-semibold text-[#0b1c30]" htmlFor="login-id">
  Email or Username
</label>

</div>
<div className="relative flex items-center">
<input className="w-full h-11 pl-3.5 pr-10 bg-white border border-[#cbd5e1] text-[#0b1c30] text-sm placeholder:text-[#94a3b8] focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 rounded-lg transition-all" id="login-id" placeholder="name@example.com" required="" type="text" />
<span className="material-symbols-outlined absolute right-3 pointer-events-none text-[18px] text-[#64748b]">
  alternate_email
</span>
</div>
</div>
{/*  Password Input  */}
<div className="space-y-1.5">
<div className="flex items-center justify-between">
<label className="text-xs font-semibold text-[#0b1c30]" htmlFor="login-password">
  Password
</label>
<a className="text-xs font-medium text-[#1d4ed8] hover:text-[#0037b0] hover:underline transition-colors" href="#">
  Forgot password?
</a>
</div>
<div className="relative flex items-center">
<input className="w-full h-11 pl-3.5 pr-10 bg-white border border-[#cbd5e1] text-[#0b1c30] text-sm placeholder:text-[#94a3b8] focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 rounded-lg transition-all font-mono" id="login-password" placeholder="••••••••••••" required="" type="password" />
<button aria-label="Toggle password visibility" className="absolute right-0 top-0 h-11 w-10 flex items-center justify-center text-[#64748b] hover:text-[#0b1c30] focus:outline-none transition-colors" id="toggle-pwd-btn" type="button">
<span className="material-symbols-outlined text-[18px]" id="pwd-icon">visibility</span>
</button>
</div>
</div>
{/*  Remember Me Checkbox  */}
<div className="pt-1">
<label className="inline-flex items-center gap-2 cursor-pointer select-none">
<input className="w-4 h-4 rounded border-[#cbd5e1] text-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 cursor-pointer transition-colors" id="remember-me" type="checkbox" />
<span className="text-xs text-[#565e74]">Remember session for 30 days</span>
</label>
</div>
{/*  Submit Button  */}
<button className="w-full h-11 bg-[#1d4ed8] hover:bg-[#0037b0] active:bg-[#002b8a] text-white font-medium text-sm flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer mt-3" type="submit">
<span className="">Log In</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</form>
</div>
{/*  Footer / Register Switcher  */}
<div className="pt-5 mt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
<span className="text-[#565e74]">Don't have an account?</span>
<a className="font-semibold text-[#1d4ed8] hover:text-[#0037b0] hover:underline transition-colors flex items-center gap-1" data-path="register" href="#">Sign up <span className="text-sm">→</span></a>
</div>
</div>
</div>
</div>
</div>
</main>
{/*  Technical Corporate Footer  */}
<footer className="w-full border-t border-[#e2e8f0] bg-white py-4"><div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#565e74]"><div className="">© 2025 SkillSwap. All rights reserved.</div><div className="flex items-center gap-4"><a href="#" className="hover:text-[#1d4ed8] transition-colors">Privacy Policy</a><a href="#" className="hover:text-[#1d4ed8] transition-colors">Terms of Service</a><a href="#" className="hover:text-[#1d4ed8] transition-colors">Support</a></div></div></footer>




    </>
  );
}
