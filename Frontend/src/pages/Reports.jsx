import { useState } from 'react';

export default function Reports({ onNavigate, activeProject, kinematicsResult }) {
  // Quản lý trạng thái bật/tắt của Modal Preview PDF
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const kinematics = kinematicsResult?.kinematics;

  return (
    <section className="space-y-10 animate-fade-in relative">
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={() => onNavigate('summary')}
            className="mb-4 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors w-fit shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Quay lại Tổng kết
          </button>
          <h2 className="text-3xl font-bold text-slate-900">Tổng kết Dự án & Xuất báo cáo</h2>
          <p className="text-slate-500">Tóm tắt các thông số chính đã tính toán và xuất báo cáo thuyết minh kỹ thuật.</p>
        </div>
        <button 
          onClick={() => setShowPreviewModal(true)}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          Xuất báo cáo thuyết minh
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-bold tracking-widest">
            <tr><th className="px-8 py-5">Thông số</th><th className="px-8 py-5">Ký hiệu</th><th className="px-8 py-5">Đơn vị</th><th className="px-8 py-5 text-right">Giá trị</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="px-8 py-5 font-medium">Công suất</td><td className="px-8 py-5 text-slate-400 font-mono">P</td><td className="px-8 py-5 text-slate-400">kW</td><td className="px-8 py-5 text-right font-bold text-primary text-lg">{activeProject?.input_P ?? '-'}</td></tr>
            <tr><td className="px-8 py-5 font-medium">Số vòng quay</td><td className="px-8 py-5 text-slate-400 font-mono">n</td><td className="px-8 py-5 text-slate-400">vòng/phút</td><td className="px-8 py-5 text-right font-bold text-primary text-lg">{activeProject?.input_n_ct ?? '-'}</td></tr>
            <tr><td className="px-8 py-5 font-medium">Tỷ số truyền</td><td className="px-8 py-5 text-slate-400 font-mono">u</td><td className="px-8 py-5 text-slate-400">-</td><td className="px-8 py-5 text-right font-bold text-primary text-lg">{kinematics?.u_ch_sb ?? '-'}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">Tùy chọn Xuất Báo cáo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="block p-6 bg-primary-light/10 border-2 border-primary rounded-2xl cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 font-bold">PDF</div>
              <div><p className="font-bold text-slate-800">File PDF</p><p className="text-xs text-slate-400">Định dạng chuẩn để in ấn & lưu trữ</p></div>
            </div>
          </div>
          <div className="block p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">DOCX</div>
              <div><p className="font-bold text-slate-800">File Docx (Word)</p><p className="text-xs text-slate-400">Dễ dàng chỉnh sửa nội dung</p></div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 pt-6">
          <button onClick={() => setShowPreviewModal(true)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors">
            Xem trước (Preview)
          </button>
          <button className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all">
            Xác nhận Xuất file
          </button>
        </div>
      </div>

      {/* MODAL PREVIEW PDF */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#e2e8f0] rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-fade-in">
            <div className="bg-white p-4 flex items-center justify-between border-b border-slate-200">
              <span className="font-bold text-slate-700">Preview: Thuyet-Minh-Ky-Thuat.pdf</span>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors" onClick={() => setShowPreviewModal(false)}>Đóng [X]</button>
            </div>
            <div className="flex-1 overflow-y-auto p-12 flex justify-center custom-scrollbar">
              <div className="bg-white w-full max-w-[800px] shadow-lg min-h-[1000px] p-20 flex flex-col items-center">
                <h1 className="text-3xl font-serif font-black text-center uppercase tracking-widest mb-2">THUYẾT MINH KỸ THUẬT</h1>
                <p className="text-primary font-bold mb-16 italic">Hệ dẫn động thùng trộn</p>
                <div className="w-full h-px bg-slate-100 mb-16"></div>
                <div className="w-full space-y-8">
                  <h2 className="text-2xl font-bold text-slate-800">Chương 1: Động học & Chọn Động Cơ</h2>
                  <p className="text-slate-600 leading-relaxed text-justify">Dựa vào công suất cần thiết trên trục công tác và số vòng quay sơ bộ đã tính toán ở phần trước, ta tiến hành chọn động cơ điện...</p>
                  <div className="bg-slate-50 border border-slate-100 p-8 rounded-xl space-y-4">
                    <p className="text-center italic text-slate-500">Công suất cần thiết của động cơ:</p>
                    <div className="flex items-center justify-center gap-6 text-xl font-serif italic">
                      P<sub>ct</sub> = <div className="inline-flex flex-col items-center"><span className="border-b border-slate-400 px-2">P<sub>lv</sub></span><span>η</span></div> = <span className="text-primary font-black text-2xl">6.12 (kW)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}