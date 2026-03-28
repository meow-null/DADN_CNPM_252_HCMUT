export default function Workspace({ onNavigate, projects, loading, errorMessage, onSelectProject, onDeleteProject }) {
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dự án của tôi</h1>
          <p className="text-slate-500 mt-1">Quản lý danh sách các thiết kế thùng trộn và hệ thống truyền động.</p>
        </div>
        <button 
          onClick={() => onSelectProject(null)} // Reset project về null để tạo mới
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path></svg>
          Tạo dự án mới
        </button>
      </div>

      <div className="flex border-b border-slate-200">
        <button className="px-6 py-3 text-primary border-b-2 border-primary font-medium">Tất cả</button>
        <button className="px-6 py-3 text-slate-500 hover:text-slate-700 font-medium">Đang thực hiện</button>
        <button className="px-6 py-3 text-slate-500 hover:text-slate-700 font-medium">Đã hoàn thành</button>
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
            <div className="h-40 bg-slate-100 relative overflow-hidden">
              {/* Thêm hiệu ứng hover ảnh mượt mà */}
              <img alt="Project" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"/>
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase shadow-sm">
                {project.step === 'inputs' ? '1. Nhập liệu' : 
                 project.step === 'kinematics' ? '2. Động học' : 
                 project.step === 'design_partial' ? '3. Chi tiết máy' : 
                 project.step === 'design_done' ? 'Hoàn thành' : 'Khởi tạo'}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 text-lg mb-2 truncate">{project.name}</h3>
              <p className="text-xs font-mono text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                P: <span className="font-bold text-primary">{project.input_P}</span> kW <span className="mx-1 text-slate-300">|</span> n: <span className="font-bold text-primary">{project.input_n_ct}</span> rpm
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
          <p className="text-slate-500 font-bold group-hover:text-primary">Bắt đầu thiết kế mới</p>
        </button>
      </div>
    </section>
  );
}