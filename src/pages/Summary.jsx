export default function Summary({ onNavigate }) {
  return (
    <section className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Bảng Tóm tắt Thông số Thiết kế</h2>
          <p className="text-slate-500">Kết quả thiết kế chi tiết máy đã qua kiểm nghiệm độ bền cuối cùng.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('calculations')}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            Đổi vật liệu
          </button>
          <button 
            onClick={() => onNavigate('reports')}
            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
          >
            Lưu thiết kế & Hoàn tất
          </button>
        </div>
      </div>

      {/* THANH TIẾN ĐỘ */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-slate-700 uppercase tracking-widest">TIẾN ĐỘ DỰ ÁN</span>
          <span className="font-black text-primary text-xl">100%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full shadow-inner"></div>
        </div>
      </div>

      {/* BẢNG THÔNG SỐ */}
      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3">Bộ truyền ngoài (Truyền động Đai/Xích)</h3>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1">Đạt yêu cầu</span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Chi tiết / Thông số</th>
                  <th className="px-6 py-4">Ký hiệu</th>
                  <th className="px-6 py-4">Giá trị</th>
                  <th className="px-6 py-4">Đơn vị</th>
                  <th className="px-6 py-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-700">Đường kính bánh đai nhỏ</td>
                  <td className="px-6 py-4 font-mono text-slate-400">d1</td>
                  <td className="px-6 py-4 font-bold">160</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">mm</td>
                  <td className="px-6 py-4 text-emerald-500 font-medium">OK</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-700">Chiều dài đai</td>
                  <td className="px-6 py-4 font-mono text-slate-400">L</td>
                  <td className="px-6 py-4 font-bold">1800</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">mm</td>
                  <td className="px-6 py-4 text-emerald-500 font-medium">OK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}