export default function Sidebar({ currentScreen, onNavigate, onLogout }) {
  // Hàm phụ trợ để đổi màu nút active
  const getNavClass = (screenName) => {
    const baseClass = "flex items-center gap-3 w-full p-3 rounded-lg font-medium transition-colors ";
    if (currentScreen === screenName) {
      return baseClass + "bg-primary-light text-primary font-bold";
    }
    return baseClass + "text-slate-600 hover:bg-slate-50";
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" alt="Logo HCMUT" className="h-10 w-10 object-contain" />
        <span className="font-bold text-lg tracking-tight text-primary-dark whitespace-nowrap">Hệ Dẫn Động</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button className={getNavClass('workspace')} onClick={() => onNavigate('workspace')}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
          Dự án của tôi
        </button>
        <button className={getNavClass('calculations')} onClick={() => onNavigate('calculations')}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          Tính toán kỹ thuật
        </button>
        <button className={getNavClass('reports')} onClick={() => onNavigate('reports')}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Báo cáo kỹ thuật
        </button>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors" onClick={onLogout}>
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-primary text-white flex items-center justify-center font-bold">
            U
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Nguyễn Văn A</p>
            <p className="text-[10px] text-red-500 font-bold uppercase hover:underline">ĐĂNG XUẤT</p>
          </div>
        </div>
      </div>
    </aside>
  );
}