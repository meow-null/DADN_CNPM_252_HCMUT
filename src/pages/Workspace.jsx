export default function Workspace({ onNavigate }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dự án của tôi</h1>
          <p className="text-slate-500 mt-1">Quản lý danh sách các thiết kế thùng trộn và hệ thống truyền động.</p>
        </div>
        <button 
          onClick={() => onNavigate('calculations')}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-40 bg-slate-100 relative">
            <img alt="Project" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"/>
            <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Đang thực hiện</span>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Hệ thống trộn bê tông...</h3>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span className="flex items-center gap-1">12/10/2023</span>
              <span className="flex items-center gap-1">2h trước</span>
            </div>
          </div>
        </div>

        {/* Nút Tạo Card Mới */}
        <button 
          onClick={() => onNavigate('calculations')}
          className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center hover:border-primary group transition-all h-[328px]"
        >
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <p className="text-slate-500 font-medium group-hover:text-primary">Tạo dự án mới</p>
        </button>
      </div>
    </section>
  );
}