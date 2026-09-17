import React from 'react';

export default function HomeRaw() {
  return (
    <>
<header className="fixed top-0 inset-x-0 z-50 bg-[#0c192c] text-white border-b border-slate-800 shadow-md backdrop-blur-md"><div className="h-16 max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-2.5 group" data-path="explore-skills" href="#"><div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20 group-hover:bg-blue-500 transition-colors"><span className="material-symbols-outlined text-[19px]">sync_alt</span></div><div className="flex flex-col"><span className="font-headline-sm text-white tracking-tight font-bold text-lg">SkillSwap</span></div></a><nav className="hidden lg:flex items-center gap-1.5"><a aria-current="page" className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-medium text-xs tracking-tight shadow-sm" data-path="explore-skills" href="#">Explore Skills</a><div className="relative inline-flex items-center"><a className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-xs pr-7" data-path="my-requests" href="#">My Requests</a><span className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-mono text-[10px] leading-tight font-bold pointer-events-none">3</span></div><a className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-xs" data-path="my-profile" href="#">My Profile</a></nav></div><div className="flex items-center gap-space-sm md:gap-space-md"><button className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all active:scale-[0.98] shadow-sm shadow-blue-500/25" type="button"><span className="material-symbols-outlined text-[16px] mr-1">add</span><span className="hidden sm:inline">Request Swap</span><span className="sm:hidden">Swap</span></button><div className="relative flex items-center justify-center"><button aria-label="Notifications" className="p-2 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors relative flex items-center justify-center bg-slate-800/80" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0c192c]"></span></button></div><div className="h-6 w-[1px] bg-slate-700/80 hidden sm:block"></div><div className="flex items-center gap-2 pl-1"><div className="w-8 h-8 rounded-full border border-blue-400/40 bg-blue-900/60 text-blue-200 flex items-center justify-center font-mono text-xs font-semibold ring-2 ring-blue-500/20">ER</div><div className="hidden md:flex flex-col text-left"><span className="font-medium text-xs text-white leading-tight truncate max-w-[120px]">Elena Rostova</span><div className="inline-flex items-center gap-1 mt-0.5"><span className="px-1.5 py-0.2 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] leading-none">★ 4.9 (18 swaps)</span></div></div></div></div></div></header><main className="w-full pt-16 bg-slate-50/60 flex-1"><div className="flex flex-col w-full">
{/*  Discovery Header & Interactive Search Matrix  */}
<section className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-xl pb-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg"><div className="max-w-2xl"><div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3 border border-blue-100"><span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Peer-to-Peer Exchange</div><h1 className="font-headline-xl text-3xl md:text-4xl text-slate-900 tracking-tight mb-2 font-bold">Exchange practical skills, grow together.</h1><p className="font-body-lg text-sm md:text-base text-slate-600">Trade design, coding, languages, and more with trusted community peers—no money involved.</p></div><div className="flex items-center gap-3 p-3 bg-white border border-slate-200/80 rounded-xl shadow-sm self-start md:self-auto"><div className="flex -space-x-2"><div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center font-mono text-[11px] font-bold shadow-xs">MV</div><div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-600 text-white flex items-center justify-center font-mono text-[11px] font-bold shadow-xs">AN</div><div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-600 text-white flex items-center justify-center font-mono text-[11px] font-bold shadow-xs">KS</div></div><div className="flex flex-col"><span className="font-semibold text-xs text-slate-900">1,480 Active Swappers</span><span className="text-[11px] text-slate-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>94 swaps occurring today</span></div></div></div>
{/*  Multifunctional Filter & Query Console  */}
<div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-sm"><div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-center"><div className="lg:col-span-5 relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 transition-all focus-within:bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"><span className="material-symbols-outlined text-blue-600 mr-2 text-[20px]">search</span><input className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-xs font-sans focus:ring-0" id="skill-search" placeholder="Search by skill, e.g. Figma, Python, French, SEO..." type="text" /><button className="text-slate-400 hover:text-slate-800 p-0.5 hidden" id="clear-search"><span className="material-symbols-outlined text-[16px]">cancel</span></button></div><div className="lg:col-span-3 relative flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"><span className="material-symbols-outlined text-slate-500 mr-2 text-[18px]">location_on</span><select className="w-full bg-transparent border-none outline-none text-slate-900 text-xs cursor-pointer pr-6 appearance-none font-sans"><option value="">Any Location / Remote</option><option value="berlin">Berlin, Germany</option><option value="london">London, UK</option><option value="tokyo">Tokyo, Japan</option><option value="paris">Paris, France</option><option value="austin">Austin, TX</option><option value="toronto">Toronto, Canada</option></select><span className="material-symbols-outlined text-slate-400 absolute right-2.5 pointer-events-none text-[16px]">expand_more</span></div><div className="lg:col-span-3 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-blue-600 text-[18px]">calendar_today</span><span className="font-medium text-xs text-slate-700">Available this week</span></div><label className="relative inline-flex items-center cursor-pointer"><input checked="" className="sr-only peer" id="avail-toggle" type="checkbox" /><div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-600"></div></label></div><div className="lg:col-span-1"><button className="w-full h-full min-h-[38px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center text-xs shadow-sm shadow-blue-600/20 transition-transform active:scale-95" title="Run Filter"><span className="material-symbols-outlined text-[18px]">tune</span></button></div></div><div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"><button className="category-pill active flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs whitespace-nowrap transition-all shadow-sm shadow-blue-500/25" data-category="all"><span className="material-symbols-outlined text-[16px]">apps</span><span className="font-medium">All Skills</span><span className="px-1.5 py-0.2 rounded-full bg-blue-700 text-white font-mono text-[10px]">142</span></button><button className="category-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs whitespace-nowrap transition-all hover:bg-slate-50" data-category="design"><span className="material-symbols-outlined text-[16px] text-pink-500">palette</span><span className="font-medium">Design &amp; Creative</span><span className="px-1.5 py-0.2 rounded-full bg-pink-50 text-pink-700 font-mono text-[10px]">38</span></button><button className="category-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs whitespace-nowrap transition-all hover:bg-slate-50" data-category="tech"><span className="material-symbols-outlined text-[16px] text-blue-600">terminal</span><span className="font-medium">Programming &amp; Tech</span><span className="px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px]">45</span></button><button className="category-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs whitespace-nowrap transition-all hover:bg-slate-50" data-category="languages"><span className="material-symbols-outlined text-[16px] text-amber-500">translate</span><span className="font-medium">Languages</span><span className="px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 font-mono text-[10px]">26</span></button><button className="category-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs whitespace-nowrap transition-all hover:bg-slate-50" data-category="office"><span className="material-symbols-outlined text-[16px] text-emerald-600">monitoring</span><span className="font-medium">Office &amp; Productivity</span><span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px]">19</span></button><button className="category-pill flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs whitespace-nowrap transition-all hover:bg-slate-50" data-category="arts"><span className="material-symbols-outlined text-[16px] text-purple-500">music_note</span><span className="font-medium">Music &amp; Arts</span><span className="px-1.5 py-0.2 rounded-full bg-purple-50 text-purple-700 font-mono text-[10px]">14</span></button></div></div>
</section>
{/*  Active Filter Summary & Sorting Controls  */}
<section className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg mb-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-white p-2.5 px-4 rounded-xl border border-slate-200/90 shadow-sm"><div className="flex items-center gap-space-sm flex-wrap"><span className="font-medium text-xs text-slate-700">Showing <strong className="text-slate-900">28 peers</strong> offering skills</span><div className="flex items-center gap-1.5"><span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200/60"><span className="">This Week Only</span><button className="hover:text-blue-950 flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button></span><span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"><span className="">All Categories</span></span></div></div><div className="flex items-center gap-1.5"><span className="text-xs text-slate-500">Sort by:</span><div className="relative inline-block"><select className="bg-slate-50 text-slate-900 font-medium text-xs rounded-lg border border-slate-200 py-1 px-2.5 pr-6 appearance-none cursor-pointer focus:outline-none focus:border-blue-600" id="sort-order"><option value="rating">Highest Rated</option><option value="active">Most Active</option><option value="newest">Newest</option></select><span className="material-symbols-outlined text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-[15px]">unfold_more</span></div></div></div>
</section>
{/*  Core Grid of User Discovery Cards  */}
<section className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg pb-space-xl">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="peers-container">{/*  Card 1: Marcus Vance  */}
<article className="peer-card group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative shadow-sm" data-category="design tech" data-name="Marcus Vance">
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-4">
<div className="flex items-center gap-3">
<div className="relative">
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              MV
            </div>
<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Online now"></span>
</div>
<div>
<h3 className="font-semibold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">Marcus Vance</h3>
<div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
<span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
<span className="">Berlin, Germany</span>
</div>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
<span className="text-emerald-600">★</span>
<span className="">5.0</span>
<span className="text-emerald-700/70 text-[11px] font-normal">(22)</span>
</div>
</div>
<div className="flex items-center gap-1.5 mb-4 text-slate-600 text-xs bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-blue-600">schedule</span>
<span className="">Available: <span className="text-slate-900 font-medium">Weekends &amp; Evenings</span></span>
</div>
<div className="space-y-3 mb-2">
<div>
<span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1.5">Offers</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Figma UI/UX</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Design Systems</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Prototyping</span>
</div>
</div>
<div>
<span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Wants</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Python basics</span>
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Data Analysis</span>
</div>
</div>
</div>
</div>
</div>
<div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 rounded-b-xl flex items-center justify-between gap-2">
<a className="font-medium text-xs text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1" href="#">
<span className="">View Profile</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
<button className="open-swap-btn px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-blue-600/20" data-offer="Figma UI/UX" data-peer="Marcus Vance">
<span className="material-symbols-outlined text-[15px]">handshake</span>
<span className="">Request Swap</span>
</button>
</div>
</article>
{/*  Card 2: Amina Nour  */}
<article className="peer-card group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative shadow-sm" data-category="tech languages" data-name="Amina Nour">
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-4">
<div className="flex items-center gap-3">
<div className="relative">
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              AN
            </div>
<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Online now"></span>
</div>
<div>
<h3 className="font-semibold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">Amina Nour</h3>
<div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
<span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
<span className="">London, UK</span>
</div>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
<span className="text-emerald-600">★</span>
<span className="">4.9</span>
<span className="text-emerald-700/70 text-[11px] font-normal">(31)</span>
</div>
</div>
<div className="flex items-center gap-1.5 mb-4 text-slate-600 text-xs bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-blue-600">schedule</span>
<span className="">Available: <span className="text-slate-900 font-medium">Flexible</span></span>
</div>
<div className="space-y-3 mb-2">
<div>
<span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1.5">Offers</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Fullstack React</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Node.js</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Tailwind CSS</span>
</div>
</div>
<div>
<span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Wants</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Spanish conversation</span>
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Graphic Design</span>
</div>
</div>
</div>
</div>
</div>
<div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 rounded-b-xl flex items-center justify-between gap-2">
<a className="font-medium text-xs text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1" href="#">
<span className="">View Profile</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
<button className="open-swap-btn px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-blue-600/20" data-offer="Fullstack React" data-peer="Amina Nour">
<span className="material-symbols-outlined text-[15px]">handshake</span>
<span className="">Request Swap</span>
</button>
</div>
</article>
{/*  Card 3: Kenji Sato  */}
<article className="peer-card group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative shadow-sm" data-category="languages office" data-name="Kenji Sato">
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-4">
<div className="flex items-center gap-3">
<div className="relative">
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              KS
            </div>
<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-slate-400 ring-2 ring-white" title="Away / In Session"></span>
</div>
<div>
<h3 className="font-semibold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">Kenji Sato</h3>
<div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
<span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
<span className="">Tokyo, Japan (Remote)</span>
</div>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
<span className="text-emerald-600">★</span>
<span className="">4.8</span>
<span className="text-emerald-700/70 text-[11px] font-normal">(14)</span>
</div>
</div>
<div className="flex items-center gap-1.5 mb-4 text-slate-600 text-xs bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-blue-600">schedule</span>
<span className="">Available: <span className="text-slate-900 font-medium">Weekdays</span></span>
</div>
<div className="space-y-3 mb-2">
<div>
<span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1.5">Offers</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Japanese (Native)</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Product Strategy</span>
</div>
</div>
<div>
<span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Wants</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Video Editing</span>
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Premiere Pro</span>
</div>
</div>
</div>
</div>
</div>
<div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 rounded-b-xl flex items-center justify-between gap-2">
<a className="font-medium text-xs text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1" href="#">
<span className="">View Profile</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
<button className="open-swap-btn px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-blue-600/20" data-offer="Japanese (Native)" data-peer="Kenji Sato">
<span className="material-symbols-outlined text-[15px]">handshake</span>
<span className="">Request Swap</span>
</button>
</div>
</article>
{/*  Card 4: Chloe Dubois  */}
<article className="peer-card group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative shadow-sm" data-category="languages office tech" data-name="Chloe Dubois">
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-4">
<div className="flex items-center gap-3">
<div className="relative">
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              CD
            </div>
<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Online now"></span>
</div>
<div>
<h3 className="font-semibold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">Chloe Dubois</h3>
<div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
<span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
<span className="">Paris, France</span>
</div>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
<span className="text-emerald-600">★</span>
<span className="">4.9</span>
<span className="text-emerald-700/70 text-[11px] font-normal">(19)</span>
</div>
</div>
<div className="flex items-center gap-1.5 mb-4 text-slate-600 text-xs bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-blue-600">schedule</span>
<span className="">Available: <span className="text-slate-900 font-medium">Evenings</span></span>
</div>
<div className="space-y-3 mb-2">
<div>
<span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1.5">Offers</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Copywriting</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">SEO Content</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">French</span>
</div>
</div>
<div>
<span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Wants</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Webflow</span>
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">HTML/CSS</span>
</div>
</div>
</div>
</div>
</div>
<div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 rounded-b-xl flex items-center justify-between gap-2">
<a className="font-medium text-xs text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1" href="#">
<span className="">View Profile</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
<button className="open-swap-btn px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-blue-600/20" data-offer="Copywriting" data-peer="Chloe Dubois">
<span className="material-symbols-outlined text-[15px]">handshake</span>
<span className="">Request Swap</span>
</button>
</div>
</article>
{/*  Card 5: David Miller  */}
<article className="peer-card group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative shadow-sm" data-category="tech design" data-name="David Miller">
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-4">
<div className="flex items-center gap-3">
<div className="relative">
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              DM
            </div>
<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Online now"></span>
</div>
<div>
<h3 className="font-semibold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">David Miller</h3>
<div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
<span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
<span className="">Austin, TX</span>
</div>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
<span className="text-emerald-600">★</span>
<span className="">4.7</span>
<span className="text-emerald-700/70 text-[11px] font-normal">(9)</span>
</div>
</div>
<div className="flex items-center gap-1.5 mb-4 text-slate-600 text-xs bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-blue-600">schedule</span>
<span className="">Available: <span className="text-slate-900 font-medium">Weekends</span></span>
</div>
<div className="space-y-3 mb-2">
<div>
<span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1.5">Offers</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Django &amp; Python</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">PostgreSQL</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Docker</span>
</div>
</div>
<div>
<span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Wants</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Mobile App Design</span>
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Figma</span>
</div>
</div>
</div>
</div>
</div>
<div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 rounded-b-xl flex items-center justify-between gap-2">
<a className="font-medium text-xs text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1" href="#">
<span className="">View Profile</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
<button className="open-swap-btn px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-blue-600/20" data-offer="Django &amp; Python" data-peer="David Miller">
<span className="material-symbols-outlined text-[15px]">handshake</span>
<span className="">Request Swap</span>
</button>
</div>
</article>
{/*  Card 6: Sophia Chen  */}
<article className="peer-card group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative shadow-sm" data-category="design arts" data-name="Sophia Chen">
<div className="p-5 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-start justify-between gap-space-sm mb-4">
<div className="flex items-center gap-3">
<div className="relative">
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-rose-800 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              SC
            </div>
<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Online now"></span>
</div>
<div>
<h3 className="font-semibold text-base text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">Sophia Chen</h3>
<div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
<span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
<span className="">Toronto, Canada</span>
</div>
</div>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
<span className="text-emerald-600">★</span>
<span className="">5.0</span>
<span className="text-emerald-700/70 text-[11px] font-normal">(17)</span>
</div>
</div>
<div className="flex items-center gap-1.5 mb-4 text-slate-600 text-xs bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-lg">
<span className="material-symbols-outlined text-[16px] text-blue-600">schedule</span>
<span className="">Available: <span className="text-slate-900 font-medium">Flexible</span></span>
</div>
<div className="space-y-3 mb-2">
<div>
<span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1.5">Offers</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">Motion Graphics</span>
<span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-medium">After Effects</span>
</div>
</div>
<div>
<span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Wants</span>
<div className="flex flex-wrap gap-1.5">
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Piano Basics</span>
<span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs">Music Theory</span>
</div>
</div>
</div>
</div>
</div>
<div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 rounded-b-xl flex items-center justify-between gap-2">
<a className="font-medium text-xs text-slate-600 hover:text-blue-700 transition-colors flex items-center gap-1" href="#">
<span className="">View Profile</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
<button className="open-swap-btn px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-blue-600/20" data-offer="Motion Graphics" data-peer="Sophia Chen">
<span className="material-symbols-outlined text-[15px]">handshake</span>
<span className="">Request Swap</span>
</button>
</div>
</article></div>
{/*  Load More / Community Pagination Banner  */}
<div className="mt-space-xl flex flex-col items-center justify-center gap-2 text-center">
<button className="px-6 py-2.5 rounded-lg border border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/40 text-slate-800 font-medium text-xs shadow-sm transition-all flex items-center gap-2" id="load-more-btn"><span className="material-symbols-outlined text-[18px] text-blue-600">expand_more</span><span className="">Load more skill partners</span></button>
<span className="font-mono text-[11px] text-slate-500">Viewing 6 of 28 available active swappers</span>
</div>
</section>
</div>
{/*  Interactive Quick Swap Modal Drawer  */}
<div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-slate-950/60 backdrop-blur-xs opacity-0 pointer-events-none transition-opacity duration-200" id="swap-modal">
<div className="bg-white w-full max-w-lg rounded-xl border border-slate-200 shadow-2xl p-space-lg relative transform scale-95 transition-transform duration-200" id="modal-container">
<div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
<div className="flex items-center gap-2.5">
<div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">handshake</span>
</div>
<div>
<h2 className="font-semibold text-base text-slate-900">Initiate Skill Swap</h2>
<p className="font-mono text-xs text-slate-500" id="modal-subhead">Propose an exchange with Marcus Vance</p>
</div>
</div>
<button className="p-1 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors" id="close-modal-btn">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<form className="space-y-4" id="swap-request-form" onsubmit="event.preventDefault(); submitSwapForm();">
<div>
<label className="block font-medium text-xs text-slate-700 mb-1">Peer's Offered Skill</label>
<input className="w-full bg-slate-50 text-slate-800 rounded-lg px-3 py-2 text-xs border border-slate-300 font-mono cursor-not-allowed" id="target-skill-field" readonly="" type="text" />
</div>
<div>
<label className="block font-medium text-xs text-slate-700 mb-1">What will you offer in return?</label>
<select className="w-full bg-white text-slate-900 rounded-lg px-3 py-2 text-xs border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none font-sans" required="">
<option value="react">Fullstack React &amp; Next.js</option>
<option value="branding">Brand Identity &amp; Strategy</option>
<option value="video">Motion &amp; Video Editing</option>
<option value="spanish">Spanish Conversation (B2)</option>
</select>
</div>
<div>
<div className="flex items-center justify-between mb-1">
<label className="font-medium text-xs text-slate-700">Personal Note &amp; Goals</label>
<span className="font-mono text-[11px] text-slate-400" id="char-counter">0/300</span>
</div>
<textarea className="w-full bg-slate-50 focus:bg-white text-slate-900 rounded-lg p-3 text-xs border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none font-sans" id="swap-note" maxlength="300" placeholder="Introduce yourself, outline your weekly schedule, and detail what you hope to achieve together..." rows="3"></textarea>
</div>
<div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
<button className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium text-xs transition-colors" id="cancel-swap-btn" type="button">
            Cancel
          </button>
<button className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shadow-blue-600/20" type="submit">
<span className="material-symbols-outlined text-[16px]">send</span>
<span className="">Send Proposal</span>
</button>
</div>
</form>
</div>
</div>
{/*  Toast Notification System  */}
<div className="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-2.5 bg-slate-900 text-white border border-slate-800 px-4 py-3 rounded-xl shadow-xl text-xs" id="toast">
<span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
<span className="font-medium" id="toast-message">Swap request dispatched!</span>
</div>
{/*  Interactive Search & Modal Client Logic  */}

</main><footer className="w-full bg-white border-t border-slate-200 mt-auto"><div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg py-8"><div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100"><div className="flex flex-col items-center md:items-start text-center md:text-left"><div className="flex items-center gap-2 mb-1"><span className="font-bold text-sm text-slate-900">SkillSwap</span><span className="text-slate-400 text-xs">•</span><span className="text-xs text-slate-600 font-medium">Peer-to-peer talent &amp; skill exchange</span></div><p className="text-xs text-slate-500 max-w-md">Learn new abilities, share your craft, and build trust-based connections without monetary barriers.</p></div><div className="flex flex-wrap items-center justify-center gap-4 md:gap-6"><a className="text-xs text-slate-600 hover:text-blue-700 transition-colors" data-path="trust-and-safety" href="#">Trust &amp; Safety</a><a className="text-xs text-slate-600 hover:text-blue-700 transition-colors" data-path="help-center" href="#">Help Center</a></div></div><div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left"><span className="text-xs text-slate-500">© 2025 SkillSwap. All rights reserved.</span><div className="flex items-center gap-4 text-xs text-slate-500"><a className="hover:text-blue-700 transition-colors" href="#">Privacy</a><a className="hover:text-blue-700 transition-colors" href="#">Terms</a></div></div></div></footer>



    </>
  );
}
