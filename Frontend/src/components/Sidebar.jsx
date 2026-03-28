export default function Sidebar({ currentScreen, onNavigate, onLogout }) {
  // Hàm phụ trợ để đổi màu nút active
  const getNavClass = (screenName) => {
    const baseClass = "flex items-center gap-3 w-full p-3 rounded-lg font-medium transition-colors ";
    // Nếu đang ở màn hình calculations (trong dự án), thì coi như không có tab nào ở Sidebar được active
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
        
        {/* Nút mới thay thế cho Tính toán & Báo cáo */}
        <button className={getNavClass('catalog')} onClick={() => onNavigate('catalog')}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          Thư viện Linh kiện
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