export default function Sidebar({ currentScreen, onNavigate, onLogout, userName }) {
  // Electric active styling
  const getNavClass = (screenName) => {
    const baseClass = "flex items-center gap-3 w-full p-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ";
    if (currentScreen === screenName) {
      return baseClass + "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 border border-blue-500/20";
    }
    return baseClass + "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50";
  };

  return (
    <aside className="w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.4)] relative z-10 transition-all duration-500">
      {/* Decorative premium line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-80"></div>

      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-4 group">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" alt="Logo HCMUT" className="h-9 w-9 object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-base tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">CAD/CAM</span>
          <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase mt-0.5">Hệ Dẫn Động</span>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2.5">
        <button className={getNavClass('workspace')} onClick={() => onNavigate('workspace')}>
          <svg className="h-5 w-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
          <span className="text-sm">Dự án của tôi</span>
        </button>
        
        <button className={getNavClass('catalog')} onClick={() => onNavigate('catalog')}>
          <svg className="h-5 w-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          <span className="text-sm">Thư viện Linh kiện</span>
        </button>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/50">
        <div className="flex items-center gap-3 p-2.5 bg-slate-900/60 rounded-2xl border border-slate-900 hover:border-slate-800 transition-premium cursor-pointer group" onClick={onLogout}>
          <div className="w-9 h-9 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
            {(userName || 'User').trim().charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors">{userName || 'Kỹ sư thiết kế'}</p>
            <p className="text-[9px] text-red-500 font-extrabold uppercase tracking-wider group-hover:text-red-400 transition-colors">ĐĂNG XUẤT</p>
          </div>
          <div className="text-slate-600 group-hover:text-slate-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>
        </div>
      </div>
    </aside>
  );
}