import { useState, useRef, useEffect } from 'react';

export default function Header({ currentScreen, onNavigate, activeProjectName, searchQuery, setSearchQuery, projects, onSelectProject }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProjects = projects ? projects.filter(p => p.name.toLowerCase().includes((searchQuery || '').toLowerCase())) : [];

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
      
      <div className="flex items-center">
        {/* Back navigation inside project */}
        {currentScreen === 'calculations' || currentScreen === 'summary' || currentScreen === 'reports' ? (
          <button 
            onClick={() => onNavigate('workspace')}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-premium bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200/60 shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Thoát Dự án
          </button>
        ) : (
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 animate-fade-in">
            <span>Hệ thống</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold">
              {currentScreen === 'workspace' ? 'Không gian làm việc' : currentScreen === 'catalog' ? 'Thư viện Linh kiện' : 'Dự án của tôi'}
            </span>
          </div>
        )}

        {/* Current Active Project tag */}
        {(currentScreen === 'calculations' || currentScreen === 'summary' || currentScreen === 'reports') && activeProjectName && (
          <div className="ml-4 pl-4 border-l border-slate-200 text-sm font-extrabold text-slate-800 flex items-center gap-2 font-heading">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {activeProjectName}
          </div>
        )}
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <input 
            className="pl-10 pr-4 py-2 bg-slate-100/80 border border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-white rounded-full text-xs w-60 focus:ring-2 focus:ring-blue-100 outline-none transition-premium font-medium" 
            placeholder="Tìm kiếm dự án..." 
            type="text"
            value={searchQuery || ''}
            onChange={(e) => {
              setSearchQuery && setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <svg className="h-3.5 w-3.5 absolute left-3.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          
          {isDropdownOpen && searchQuery && (
            <div className="absolute top-12 left-0 w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto backdrop-blur-md animate-fade-in">
              {filteredProjects.length > 0 ? (
                <ul className="py-2">
                  {filteredProjects.map(project => (
                    <li 
                      key={project.id} 
                      className="px-5 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none transition-premium"
                      onClick={() => {
                        onSelectProject && onSelectProject(project);
                        setSearchQuery('');
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="font-bold text-xs text-slate-850 truncate">{project.name}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-xs font-bold text-slate-400">
                  Không tìm thấy dự án nào
                </div>
              )}
            </div>
          )}
        </div>
        
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-premium hover:bg-slate-100 rounded-full relative">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}