import { useEffect, useMemo, useState } from 'react';
import MotorRecommendation from './MotorRecommendation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

async function calcRequest(path, options = {}) {
  const { method = 'GET', body } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.status === 'error') {
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }
  return payload?.data;
}

export default function Calculations({ onNavigate, activeProject, onProjectSaved, onKinematicsSaved, kinematicsResult }) {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(2); // Thêm state quản lý sub-menu, mặc định mở tab 2 (Bánh răng côn)
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedMotor, setSelectedMotor] = useState(null);

  // --- LOGIC GIẢ LẬP API CHO UC-05 ---
  const [isCalculatingGear, setIsCalculatingGear] = useState(false);
  const [gearData, setGearData] = useState({
    status: 'error',
    m_te: 2.5,
    d_e1: 50,
    R_e: 103.5,
    sigma_H: 540,
    allowable_sigma_H: 500,
    message: 'Cảnh báo: Ứng suất tiếp xúc tính toán đang vượt quá ứng suất cho phép (σ<sub>H</sub> > [σ<sub>H</sub>] = 500 MPa). Vui lòng đổi mác thép hoặc nhiệt luyện.'
  });

  const handleRecalculateGear = () => {
    setIsCalculatingGear(true);
    // Giả lập Backend xử lý 1s
    setTimeout(() => {
      setGearData({
        status: 'success',
        m_te: 2.5,
        d_e1: 50,
        R_e: 103.5,
        sigma_H: 480,
        allowable_sigma_H: 600,
        message: 'Tuyệt vời! Cặp bánh răng côn đã thỏa mãn điều kiện bền (σ<sub>H</sub> < [σ<sub>H</sub>]). Bạn có thể tiếp tục.'
      });
      setIsCalculatingGear(false);
    }, 1000);
  };
  // ----------------------------------

  const [form, setForm] = useState({
    name: '',
    input_P: '15.5',
    input_n_ct: '450',
    input_L: '10',
  });

  useEffect(() => {
    if (activeProject) {
      setForm({
        name: activeProject.name || '',
        input_P: String(activeProject.input_P ?? ''),
        input_n_ct: String(activeProject.input_n_ct ?? ''),
        input_L: String(activeProject.input_L ?? ''),
      });
    }
  }, [activeProject]);

  const data = useMemo(() => {
    return kinematicsResult?.kinematics ? kinematicsResult.kinematics : null;
  }, [kinematicsResult]);

  const getNavClass = (stepNumber) => {
    if (step === stepNumber) return 'pb-2 text-primary border-b-2 border-primary font-bold transition-all';
    return 'pb-2 text-slate-400 font-medium hover:text-slate-600 transition-colors';
  };

  const handleSaveInput = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const payload = {
        name: form.name,
        input_P: Number(form.input_P),
        input_n_ct: Number(form.input_n_ct),
        input_L: Number(form.input_L),
      };
      
      // 1. Lưu thông số đầu vào
      const savedProject = activeProject
        ? await calcRequest(`/projects/${activeProject.id}`, { method: 'PUT', body: payload })
        : await calcRequest('/projects', { method: 'POST', body: payload });
      
      // 2. Tự động gọi tính toán Động học dựa trên input mới
      const result = await calcRequest(`/projects/${savedProject.id}/kinematics`, { method: 'POST' });
      
      // 3. Cập nhật state toàn cục và chuyển tab
      onProjectSaved(result.project);
      onKinematicsSaved(result);
      setStep(2); 
    } catch (error) {
      setErrorMessage(error.message || 'Lỗi khi lưu dữ liệu hoặc tính toán tự động.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculateKinematics = async () => {
    if (!activeProject?.id) {
      setErrorMessage('Bạn cần lưu dữ liệu đầu vào trước khi tính động học.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const result = await calcRequest(`/projects/${activeProject.id}/kinematics`, { method: 'POST' });
      onProjectSaved(result.project);
      onKinematicsSaved(result);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể tính toán động học.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Navigation Wizard - Đã sửa lại thứ tự */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between px-10">
        <button className={getNavClass(1)} onClick={() => setStep(1)}>1. Nhập liệu</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(2)} onClick={() => setStep(2)}>2. Động học</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(3)} onClick={() => setStep(3)}>3. Chi tiết máy</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(4)} onClick={() => setStep(4)}>4. Chọn Động cơ</button>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {errorMessage}
        </div>
      )}

      {/* STEP 1: NHẬP LIỆU */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Nhập số liệu kỹ thuật đầu vào</h2>
              <p className="text-slate-500 mt-1">Thiết lập các thông số cơ bản cho bài toán dẫn động thùng trộn.</p>
            </div>
            <button
              onClick={handleSaveInput}
              disabled={isSubmitting}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu & Chuyển sang Động học'}
              {!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Tên dự án</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ví dụ: Hệ dẫn động thùng trộn"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Công suất P (kW)</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-lg"
                type="number"
                value={form.input_P}
                onChange={(e) => setForm((prev) => ({ ...prev, input_P: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Số vòng quay n (v/p)</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-lg"
                type="number"
                value={form.input_n_ct}
                onChange={(e) => setForm((prev) => ({ ...prev, input_n_ct: e.target.value }))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Thời gian phục vụ L (năm)</label>
              <input
                className="w-full md:w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-lg"
                type="number"
                value={form.input_L}
                onChange={(e) => setForm((prev) => ({ ...prev, input_L: e.target.value }))}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ĐỘNG HỌC */}
      {step === 2 && (
        <div className="space-y-10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Kết quả Tính toán Động học</h2>
              <p className="text-slate-500 mt-1">Hệ thống phân phối tỷ số truyền và tính toán công suất cần thiết.</p>
            </div>
            <div className="flex gap-4">
              {!data && (
                <button
                  onClick={handleCalculateKinematics}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Chạy thuật toán Động học'}
                </button>
              )}
              {data && (
                <>
                  <button
                    onClick={() => setShowFormulaModal(true)}
                    className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition-all"
                  >
                    Xem chi tiết công thức
                  </button>
                  <button 
                    className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2" 
                    onClick={() => setStep(3)} // Đã đổi: Nhảy sang Chi tiết máy
                  >
                    Sang bước Chi tiết máy
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {!data && !isSubmitting && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Chưa có kết quả tính toán</h3>
              <p className="text-slate-500">Vui lòng nhấn nút "Chạy thuật toán Động học" ở góc trên bên phải để bắt đầu.</p>
            </div>
          )}

          {data && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-5 text-primary">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1">Hiệu suất tổng (η)</p>
                  <p className="text-3xl font-black text-primary">{(data.eta * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1">Công suất P<sub>ct</sub></p>
                  <p className="text-3xl font-black text-slate-900">{data.P_ct} <span className="text-sm font-medium text-slate-400">kW</span></p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1">Tỷ số truyền chung</p>
                  <p className="text-3xl font-black text-slate-900">{data.u_ch_sb}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1">Vòng quay n<sub>sb</sub></p>
                  <p className="text-3xl font-black text-slate-900">{data.n_sb} <span className="text-sm font-medium text-slate-400">rpm</span></p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded"></span> Phân phối tỷ số truyền sơ bộ
                </h3>
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Bộ truyền</th>
                        <th className="px-6 py-4 text-center">Ký hiệu</th>
                        <th className="px-6 py-4 text-right">Giá trị sơ bộ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">Hộp giảm tốc (Tổng)</td>
                        <td className="px-6 py-4 text-center text-slate-500 font-serif italic text-lg">u<sub>h</sub></td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{data.u_h_sb}</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">Bánh răng côn (Cấp nhanh)</td>
                        <td className="px-6 py-4 text-center text-slate-500 font-serif italic text-lg">u<sub>1</sub></td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{data.u_1}</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">Bánh răng trụ (Cấp chậm)</td>
                        <td className="px-6 py-4 text-center text-slate-500 font-serif italic text-lg">u<sub>2</sub></td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{data.u_2}</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-primary">Bộ truyền xích (Bộ truyền ngoài)</td>
                        <td className="px-6 py-4 text-center text-primary font-serif italic text-lg">u<sub>x</sub></td>
                        <td className="px-6 py-4 text-right font-bold text-primary">{data.u_x_sb}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: CHI TIẾT MÁY (UC-05) */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fade-in">
          {/* Menu điều hướng phụ cho UC-05 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-2 sticky top-6 shadow-sm">
              <div className="p-3 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-2">
                Quy trình thiết kế
              </div>
              <button 
                onClick={() => setSubStep(1)} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all ${subStep === 1 ? 'bg-primary-light text-primary font-bold shadow-inner' : 'text-slate-500 hover:bg-slate-50 font-medium'}`}
              >
                1. Vật liệu & Xích
              </button>
              <button 
                onClick={() => setSubStep(2)} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all ${subStep === 2 ? 'bg-primary-light text-primary font-bold shadow-inner' : 'text-slate-500 hover:bg-slate-50 font-medium'}`}
              >
                2. Bánh răng côn
              </button>
              <button 
                onClick={() => setSubStep(3)} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all ${subStep === 3 ? 'bg-primary-light text-primary font-bold shadow-inner' : 'text-slate-500 hover:bg-slate-50 font-medium'}`}
              >
                3. Bánh răng trụ
              </button>
              <button 
                onClick={() => setSubStep(4)} 
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-all ${subStep === 4 ? 'bg-primary-light text-primary font-bold shadow-inner' : 'text-slate-500 hover:bg-slate-50 font-medium'}`}
              >
                4. Trục & Ổ lăn
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            
            {/* SUB-STEP 1: VẬT LIỆU & XÍCH */}
            {subStep === 1 && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-700">Module Vật liệu & Xích</h3>
                <p className="text-slate-500 mt-2">Giao diện tính toán bộ truyền xích ống con lăn sẽ được thêm vào đây.</p>
              </div>
            )}

            {/* SUB-STEP 2: BÁNH RĂNG CÔN */}
            {subStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                {/* Header Bánh răng côn */}
                <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-sm">2</span>
                      Bánh răng côn (Cấp nhanh)
                    </h2>
                    <p className="text-slate-500 mt-1 text-sm">Tính toán mô-đun, kích thước hình học và kiểm nghiệm độ bền.</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      disabled={gearData.status !== 'success'} 
                      className={`px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-md transition-all text-sm flex items-center gap-2 ${gearData.status !== 'success' ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:bg-primary-dark'}`}
                      onClick={() => setStep(4)}
                    >
                      Tiếp tục Chọn Động cơ
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                  </div>
                </div>

                {/* Banner Thông báo Động (Error/Success) */}
                <div className={`${gearData.status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700 animate-pulse'} border p-4 rounded-xl flex items-center gap-3 shadow-sm transition-all duration-500`}>
                  <div className={`${gearData.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'} text-white rounded-full p-1`}>
                    {gearData.status === 'success' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    )}
                  </div>
                  <p className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: gearData.message }}></p>
                </div>

                {/* Form Chọn Vật liệu */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-primary rounded-full"></span> 
                      Thông số Vật liệu & Cấu hình
                    </h3>
                    <button 
                      onClick={handleRecalculateGear} 
                      disabled={isCalculatingGear}
                      className="px-5 py-2 bg-slate-100 border border-slate-200 rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition-all text-sm shadow-sm flex items-center gap-2 disabled:opacity-50"
                    >
                      {isCalculatingGear ? (
                         <span className="flex items-center gap-2">
                           <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                           Đang xử lý...
                         </span>
                      ) : (
                         <>
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                           Cập nhật & Tính lại
                         </>
                      )}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700">Mác thép bánh răng</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-slate-700">
                        <option value="45">Thép C45</option>
                        <option value="40Cr">Thép 40Cr</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-700">Phương pháp Nhiệt luyện</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium text-slate-700">
                        <option value="toi_cai_thien">Tôi cải thiện (HB 240-280)</option>
                        <option value="toi_be_mat">Tôi bề mặt (HRC 45-50)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-primary rounded-full"></span> 
                    Kết quả Tính toán Kích thước & Kiểm bền
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/50 transition-colors">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Mô-đun vòng ngoài</p>
                      <p className="text-2xl font-black text-slate-900 flex items-end justify-between">
                        {gearData.m_te} <span className="text-sm font-serif italic text-slate-400 font-medium">m<sub>te</sub></span>
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/50 transition-colors">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Đ.kính chia bánh nhỏ</p>
                      <p className="text-2xl font-black text-slate-900 flex items-end justify-between">
                        {gearData.d_e1} <span className="text-sm font-serif italic text-slate-400 font-medium">d<sub>e1</sub> (mm)</span>
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/50 transition-colors">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Chiều dài côn ngoài</p>
                      <p className="text-2xl font-black text-slate-900 flex items-end justify-between">
                        {gearData.R_e} <span className="text-sm font-serif italic text-slate-400 font-medium">R<sub>e</sub> (mm)</span>
                      </p>
                    </div>
                    
                    <div className={`${gearData.status === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'} p-6 rounded-2xl border shadow-sm relative overflow-hidden transition-all duration-500`}>
                      <div className={`absolute -right-2 -bottom-2 opacity-10 font-serif text-6xl font-black ${gearData.status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {gearData.status === 'success' ? '✓' : '!'}
                      </div>
                      <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${gearData.status === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>Ứng suất tiếp xúc</p>
                      <p className={`text-2xl font-black flex items-end justify-between relative z-10 ${gearData.status === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                        {gearData.sigma_H} 
                        <span className={`text-sm font-serif italic font-medium ${gearData.status === 'success' ? 'text-emerald-500' : 'text-red-400'}`}>σ<sub>H</sub> (MPa)</span>
                      </p>
                      <p className={`text-[10px] mt-1 font-medium ${gearData.status === 'success' ? 'text-emerald-600/70' : 'text-red-500/70'}`}>
                        Giới hạn: [σ<sub>H</sub>] = {gearData.allowable_sigma_H} MPa
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                    Xem toàn bộ thông số rải răng (z<sub>1</sub>, z<sub>2</sub>, b...) &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* SUB-STEP 3 & 4: (Đang chờ code) */}
            {(subStep === 3 || subStep === 4) && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-700">Đang phát triển</h3>
                <p className="text-slate-500 mt-2">Giao diện tính toán cho {subStep === 3 ? "Bánh răng trụ" : "Trục & Ổ lăn"} sẽ được cập nhật sớm.</p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* STEP 4: CHỌN ĐỘNG CƠ (UC-06) */}
      {step === 4 && (
        <MotorRecommendation
          activeProject={activeProject}
          kinematicsResult={kinematicsResult}
          onMotorSelected={setSelectedMotor}
          onNavigate={onNavigate}
        />
      )}

      {/* MODAL CÔNG THỨC */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Chi tiết Công thức Tính toán</h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">UC-04: Động học Dẫn động Thùng trộn</p>
              </div>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700 transition-colors" 
                onClick={() => setShowFormulaModal(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-8 sm:p-10 overflow-y-auto space-y-10">
              <div className="space-y-4">
                <p className="font-bold text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center text-sm">1</span>
                  Công suất cần thiết trên trục máy công tác
                </p>
                <div className="bg-slate-50/80 border border-slate-100 py-10 rounded-2xl flex items-center justify-center text-3xl font-serif text-slate-800 shadow-inner">
                  <span>P<sub>ct</sub> = </span>
                  <div className="inline-flex flex-col items-center mx-3">
                    <span className="border-b-2 border-slate-800 px-3 pb-1">F &times; v</span>
                    <span className="pt-1">1000</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-bold text-primary flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center text-sm">2</span>
                  Hiệu suất hệ thống dẫn động
                </p>
                <div className="bg-slate-50/80 border border-slate-100 py-10 rounded-2xl flex items-center justify-center text-2xl font-serif text-slate-800 shadow-inner">
                  <span>&eta; = &eta;<sub>kn</sub> &times; &eta;<sub>ol</sub><sup>4</sup> &times; &eta;<sub>brc</sub> &times; &eta;<sub>brt</sub> &times; &eta;<sub>x</sub></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}