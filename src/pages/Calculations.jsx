import { useState } from 'react';

export default function Calculations({ onNavigate }) {
  // State quản lý bước hiện tại (1 đến 4)
  const [step, setStep] = useState(1);
  // State quản lý Modal Công thức ở bước 3
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  // State quản lý lỗi ở bước 1 (mô phỏng hàm validateStep1)
  const [powerInput, setPowerInput] = useState("15.5");
  const [powerError, setPowerError] = useState(false);

  const handleValidateStep1 = () => {
    if (parseFloat(powerInput) < 0) {
      setPowerError(true);
    } else {
      setPowerError(false);
      setStep(2);
    }
  };

  // Hàm phụ trợ đổi class cho thanh điều hướng bước
  const getNavClass = (stepNumber) => {
    if (step === stepNumber) return "pb-2 text-primary border-b-2 border-primary font-bold";
    return "pb-2 text-slate-400 font-medium hover:text-slate-600 transition-colors";
  };

  return (
    <div className="space-y-8">
      {/* THANH ĐIỀU HƯỚNG CÁC BƯỚC */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between px-10">
        <button className={getNavClass(1)} onClick={() => setStep(1)}>1. Nhập liệu</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(2)} onClick={() => setStep(2)}>2. Động cơ</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(3)} onClick={() => setStep(3)}>3. Động học</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(4)} onClick={() => setStep(4)}>4. Chi tiết máy</button>
      </div>

      {/* ================= BƯỚC 1: NHẬP LIỆU ================= */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Nhập số liệu kỹ thuật đầu vào</h2>
              <p className="text-slate-500">Nhập liệu & Kiểm định Real-time cho hệ thống thiết kế (UC-03)</p>
            </div>
            <button 
              onClick={handleValidateStep1}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2"
            >
              Tính toán
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-slate-700 font-bold border-b pb-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path></svg>
                    Thông số cơ bản
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Công suất thùng trộn (P) <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input 
                          value={powerInput}
                          onChange={(e) => setPowerInput(e.target.value)}
                          className={`w-full p-3 border rounded-lg focus:ring-primary focus:border-primary pr-16 font-mono text-lg font-bold outline-none transition-colors ${powerError ? 'border-red-500 bg-red-50' : 'bg-slate-50 border-slate-200'}`} 
                          type="number" 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">kW</span>
                      </div>
                      {powerError && <p className="text-red-500 text-xs mt-1">⚠️ EF1: Vui lòng chỉ nhập số dương hợp lệ</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Số vòng quay (n) <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input className="w-full p-3 bg-orange-50 border border-orange-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 pr-24 font-mono text-lg font-bold text-orange-700 outline-none" type="text" defaultValue="4500"/>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">vòng/phút</span>
                      </div>
                      <div className="bg-orange-100 p-2 rounded text-[11px] text-orange-800 leading-tight">
                        ⚠️ EF2: Thông số đang vượt ngưỡng thiết kế tiêu chuẩn. Bạn có chắc chắn?
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Thời gian phục vụ (L) <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input className="w-full p-3 bg-emerald-50 border border-emerald-200 rounded-lg pr-16 font-mono text-lg font-bold text-emerald-700 outline-none" type="text" defaultValue="10"/>
                      <span className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-400 text-sm">năm</span>
                      <svg className="w-5 h-5 text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                  <p className="text-xs text-slate-500 leading-relaxed italic">Ghi chú: Chế độ 2 ca/ngày, 300 ngày/năm, Tải va đập nhẹ</p>
                </div>
              </div>
            </div>
            {/* Cột Info */}
            <div className="space-y-6">
              <div className="bg-primary-light/30 border border-primary-light p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-primary font-bold mb-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path></svg>
                  Ghi chú kỹ thuật
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">Dữ liệu đầu vào đã vượt qua các kiểm tra tính hợp lệ cơ bản. Các giá trị nằm trong ngưỡng tiêu chuẩn của <strong>Khoa KHUD - ĐHBK</strong> cho thiết kế thùng trộn dung tích trung bình.</p>
                <div className="mt-6 pt-6 border-t border-primary-light/50 space-y-4">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Hằng số tham khảo</p>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-primary-light">
                    <span className="text-xs text-slate-500 italic">Khối lượng riêng (ρ)</span>
                    <span className="text-sm font-mono font-bold text-primary">1.2 kg/m³</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-primary-light">
                    <span className="text-xs text-slate-500 italic">Độ nhớt động lực (μ)</span>
                    <span className="text-sm font-mono font-bold text-primary">0.89 mPa.s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= BƯỚC 2: ĐỘNG CƠ ================= */}
      {step === 2 && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Đề xuất Động cơ Tối ưu</h2>
            <div className="bg-primary-light/50 text-primary-dark inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path></svg>
              Dựa trên thông số yêu cầu: P_ct = 7.5kW, n_sb = 1450 rpm
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border-2 border-primary shadow-xl overflow-hidden flex flex-col relative scale-105 z-10">
              <div className="bg-primary text-white text-[10px] font-bold py-1 px-4 text-center uppercase tracking-widest absolute top-0 right-0 left-0">Đề xuất tối ưu nhất</div>
              <div className="p-8 pt-10 flex-1 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">4A132S4Y3</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-5xl font-black text-primary">98%</span>
                    <span className="text-sm font-medium text-slate-400">Điểm phù hợp</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                  <div className="flex justify-between items-center text-sm"><span className="text-slate-600">Công suất (P_dm):</span><span className="font-bold text-slate-800">7.5kW</span></div>
                  <div className="flex justify-between items-center text-sm"><span className="text-slate-600">Vòng quay (n_dm):</span><span className="font-bold text-slate-800">1450 rpm</span></div>
                  <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3"><span className="text-slate-600">Hiệu suất:</span><span className="font-bold text-slate-800">88%</span></div>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-4 font-bold hover:bg-primary-dark transition-all" onClick={() => setStep(3)}>Lựa chọn động cơ này</button>
            </div>
            
            {/* Card Động cơ B */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Động cơ B (Lựa chọn 2)</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold text-slate-800">95%</span>
                  <span className="text-xs font-medium text-slate-400">Điểm phù hợp</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 space-y-4 flex-1">
                <div className="flex justify-between text-xs"><span className="text-slate-500 italic">P_dm:</span> <span className="font-bold">7.5kW</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500 italic">n_dm:</span> <span className="font-bold">1460 rpm</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500 italic">Hiệu suất:</span> <span className="font-bold">87%</span></div>
              </div>
              <button className="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all" onClick={() => setStep(3)}>Lựa chọn động cơ này</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BƯỚC 3: ĐỘNG HỌC ================= */}
      {step === 3 && (
        <div className="space-y-10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Kết quả Tính toán Động học (UC-04)</h2>
              <p className="text-slate-500">Hệ thống Thiết kế Dẫn động Thùng trộn</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowFormulaModal(true)}
                className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 flex items-center gap-2 hover:bg-slate-50"
              >
                Xem chi tiết công thức
              </button>
              <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2" onClick={() => setStep(4)}>
                Lưu & Tiếp tục
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><span className="w-2 h-6 bg-primary rounded"></span> Phân phối tỷ số truyền</h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                  <tr><th className="px-6 py-4 font-bold">Thông số</th><th className="px-6 py-4 font-bold">Ký hiệu</th><th className="px-6 py-4 font-bold text-right">Giá trị</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50"><td className="px-6 py-4 text-slate-700">Tỷ số truyền chung</td><td className="px-6 py-4 font-mono text-slate-500">u_chung</td><td className="px-6 py-4 text-right font-bold text-primary">12.50</td></tr>
                  <tr className="hover:bg-slate-50"><td className="px-6 py-4 text-slate-700">Tỷ số truyền hộp giảm tốc</td><td className="px-6 py-4 font-mono text-slate-500">u_hgt</td><td className="px-6 py-4 text-right font-bold">4.00</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= BƯỚC 4: CHI TIẾT MÁY ================= */}
      {step === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fade-in">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors text-sm font-medium">1. Chọn vật liệu</button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors text-sm font-medium">2. Bộ truyền xích</button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary-light text-primary font-bold text-sm">3. Bánh răng côn</button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 text-sm font-medium">4. Bánh răng trụ</button>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Bánh răng côn (Cấp nhanh)</h2>
                <p className="text-slate-500">Nhập thông số thiết kế cho bánh răng côn</p>
              </div>
              <div className="flex gap-2">
                <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Tính lại</button>
                <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-md shadow-primary/20" onClick={() => onNavigate('summary')}>Hoàn tất & Xem tóm tắt</button>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-700">
              <div className="bg-red-500 text-white rounded-full p-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"></path></svg></div>
              <p className="text-sm font-medium">Cảnh báo: Bánh răng không đạt điều kiện bền tiếp xúc. Vui lòng tăng kích thước hoặc chọn vật liệu khác.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Vật liệu bánh răng</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-primary outline-none">
                  <option>Steel C45</option>
                  <option>Steel 40Cr</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL CÔNG THỨC (BƯỚC 3) ================= */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Chi tiết Công thức Tính toán</h2>
                <p className="text-sm text-slate-400">UC-04: Động học Dẫn động Thùng trộn</p>
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full" onClick={() => setShowFormulaModal(false)}>Đóng [X]</button>
            </div>
            <div className="p-8 overflow-y-auto space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary font-bold">1. Công suất cần thiết trên trục máy công tác</div>
                <div className="bg-slate-50 p-10 rounded-2xl flex items-center justify-center text-3xl font-serif">
                  P<sub>ct</sub> = <div className="inline-flex flex-col items-center mx-2"><span className="border-b border-slate-900 px-2">F x v</span><span>1000</span></div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3">
              <button className="px-6 py-2.5 font-bold text-slate-500" onClick={() => setShowFormulaModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}