export default function Header({ currentScreen, onNavigate, activeProjectName }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      
      <div className="flex items-center">
        {/* Logic hiển thị nút Quay lại khi ở trong phòng dự án */}
        {currentScreen === 'calculations' || currentScreen === 'summary' || currentScreen === 'reports' ? (
          <button 
            onClick={() => onNavigate('workspace')}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors bg-slate-50 hover:bg-primary-light px-3 py-1.5 rounded-lg border border-slate-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Thoát Dự án
          </button>
        ) : (
          <div className="text-sm text-slate-500">
            Hệ thống › <span className="text-slate-900 font-medium">
              Dự án của tôi
            </span>
          </div>
        )}

        {/* Tên dự án đang mở */}
        {(currentScreen === 'calculations' || currentScreen === 'summary' || currentScreen === 'reports') && activeProjectName && (
          <div className="ml-4 pl-4 border-l border-slate-300 text-sm font-bold text-primary-dark">
            {activeProjectName}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary outline-none" placeholder="Tìm kiếm nhanh..." type="text"/>
          <svg className="h-4 w-4 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
      </div>
    </header>
  );
}