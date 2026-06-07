import { useState, useRef } from 'react';
import { formatNumber } from '../utils/formatUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

export default function Workspace({ onNavigate, projects, loading, errorMessage, onSelectProject, onDeleteProject, setProjects }) {
  const fileInputRefs = useRef({});
  const [uploadingProjectId, setUploadingProjectId] = useState(null);

  const handleCoverClick = (e, projectId) => {
    e.stopPropagation();
    if (fileInputRefs.current[projectId]) {
      fileInputRefs.current[projectId].click();
    }
  };

  const handleCoverChange = async (e, projectId) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingProjectId(projectId);
    try {
      const formData = new FormData();
      formData.append('cover', file);

      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/cover`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.status === 'error') {
        throw new Error(payload?.message || 'Upload failed');
      }

      const newCoverUrl = payload.data.cover_url;
      // Cập nhật state trực tiếp
      if (setProjects) {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, cover_url: newCoverUrl } : p));
      }

    } catch (error) {
      console.error("Lỗi upload ảnh bìa:", error);
      alert("Cập nhật ảnh bìa thất bại!");
    } finally {
      setUploadingProjectId(null);
      e.target.value = null;
    }
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dự án của tôi</h1>
          <p className="text-slate-500 mt-1">Quản lý danh sách các thiết kế thùng trộn và hệ thống truyền động.</p>
        </div>
      </div>

      {errorMessage && <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{errorMessage}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 flex items-center justify-center">
            <p className="text-slate-500 font-medium">Đang tải danh sách dự án...</p>
          </div>
        )}

        {!loading && projects?.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
            <div 
              className="h-40 bg-slate-100 relative overflow-hidden group/cover cursor-pointer"
              onClick={(e) => handleCoverClick(e, project.id)}
              title="Đổi ảnh dự án"
            >
              <img 
                alt="Project" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={project.cover_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"}
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors"></div>
              
              <div className="absolute inset-0 hidden group-hover/cover:flex items-center justify-center">
                 {uploadingProjectId === project.id ? (
                    <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                 ) : (
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                 )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={(el) => fileInputRefs.current[project.id] = el}
                onChange={(e) => handleCoverChange(e, project.id)} 
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 text-lg mb-2 truncate">{project.name}</h3>
              <p className="text-xs font-mono text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between gap-1 overflow-x-auto">
                <span>P: <span className="font-bold text-primary">{formatNumber(project.input_P)}</span> kW</span>
                <span className="text-slate-300">|</span> 
                <span>n: <span className="font-bold text-primary">{formatNumber(project.input_n_ct)}</span> rpm</span>
                <span className="text-slate-300">|</span> 
                <span>L: <span className="font-bold text-primary">{formatNumber(project.input_L)}</span> năm</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 py-2 text-sm rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors"
                  onClick={() => onSelectProject(project)}
                >
                  Mở dự án
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  title="Xóa dự án"
                  onClick={() => {
                    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này? Toàn bộ dữ liệu tính toán sẽ bị mất.')) {
                      onDeleteProject(project.id);
                    }
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {!loading && (!projects || projects.length === 0) && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center col-span-full">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
               <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
             </div>
             <p className="text-slate-500 font-medium">Chưa có dự án nào. Hãy bấm "Tạo dự án mới" để bắt đầu.</p>
          </div>
        )}

        {/* Nút Tạo Card Mới */}
        <button 
          onClick={() => onSelectProject(null)} // Reset project về null để tạo mới
          className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center hover:border-primary hover:bg-primary-light/10 group transition-all h-[340px]"
        >
          <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <p className="text-slate-500 font-bold group-hover:text-primary">Tạo dự án mới</p>
        </button>
      </div>
    </section>
  );
}