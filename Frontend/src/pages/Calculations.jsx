import { useEffect, useMemo, useState } from 'react';
import MotorRecommendation from './MotorRecommendation';
import UC05Detail from './UC05Detail';
import { formatNumber } from '../utils/formatUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

// --- DATA TIÊU CHUẨN TRÍCH XUẤT TỪ DATABASE ---
const MATERIAL_GRADES = [
  { name: 'Thép 45', HB: 215, sigma_b: 750, sigma_ch: 450, sigma_Hlim: 500, sigma_Flim: 387 },
  { name: 'Thép 40X', HB: 245, sigma_b: 850, sigma_ch: 550, sigma_Hlim: 560, sigma_Flim: 441 },
  { name: 'Thép 40XH', HB: 265, sigma_b: 800, sigma_ch: 600, sigma_Hlim: 600, sigma_Flim: 477 },
  { name: 'Thép 35XM', HB: 241, sigma_b: 900, sigma_ch: 800, sigma_Hlim: 552, sigma_Flim: 433 },
  { name: 'Thép 20X', HB: 480, sigma_b: 650, sigma_ch: 400, sigma_Hlim: 1150, sigma_Flim: 750 },
];

const CHAIN_STEPS = [
  { p: 12.7, Q: 18.2, q: 0.65, A: 39.6, s_allow: 7.8, n_ref: 200 },
  { p: 15.875, Q: 22.7, q: 0.8, A: 51.5, s_allow: 7.8, n_ref: 200 },
  { p: 19.05, Q: 31.8, q: 1.9, A: 106, s_allow: 8.2, n_ref: 200 },
  { p: 25.4, Q: 56.7, q: 2.6, A: 180, s_allow: 8.2, n_ref: 200 },
  { p: 31.75, Q: 88.5, q: 3.8, A: 262, s_allow: 8.5, n_ref: 200 },
  { p: 38.1, Q: 127.0, q: 5.5, A: 395, s_allow: 8.5, n_ref: 200 },
  { p: 44.45, Q: 172.4, q: 7.5, A: 473, s_allow: 8.5, n_ref: 200 },
  { p: 50.8, Q: 226.8, q: 9.7, A: 645, s_allow: 8.5, n_ref: 200 },
];

const STANDARD_MODULES = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
const STANDARD_CENTER_DISTANCES = [80, 100, 125, 140, 160, 180, 200, 225, 250, 280, 315];
const STANDARD_SHAFT_DIAMS = [10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100];

// Dữ liệu tra cứu Then (Key) - Mockup based on TCVN
const KEY_TABLE = [
  { d_min: 22, d_max: 30, b: 8, h: 7, t1: 4.0 },
  { d_min: 30, d_max: 38, b: 10, h: 8, t1: 5.0 },
  { d_min: 38, d_max: 44, b: 12, h: 8, t1: 5.0 },
  { d_min: 44, d_max: 50, b: 14, h: 9, t1: 5.5 },
  { d_min: 50, d_max: 58, b: 16, h: 10, t1: 6.0 },
  { d_min: 58, d_max: 65, b: 18, h: 11, t1: 7.0 },
];

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

export default function Calculations({ onNavigate, activeProject, onProjectSaved, onKinematicsSaved, kinematicsResult, initialStep, onStepChange }) {
  const [step, setInternalStep] = useState(initialStep || 1);
  const [subStep, setSubStep] = useState(2); // Thêm state quản lý sub-menu, mặc định mở tab 2 (Bánh răng côn)

  // Sync internal step with prop
  useEffect(() => {
    if (initialStep) setInternalStep(initialStep);
  }, [initialStep]);

  const setStep = (newStep) => {
    setInternalStep(newStep);
    onStepChange?.(newStep);
  };
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedMotor, setSelectedMotor] = useState(null);

  // ----------------------------------

  // ----------------------------------

  const [form, setForm] = useState({
    name: '',
    input_P: '',
    input_n_ct: '',
    input_L: '',
  });

  useEffect(() => {
    if (activeProject) {
      setForm({
        name: activeProject.name || '',
        input_P: String(activeProject.input_P ?? ''),
        input_n_ct: String(activeProject.input_n_ct ?? ''),
        input_L: String(activeProject.input_L ?? ''),
      });
    } else {
      setForm({
        name: '',
        input_P: '',
        input_n_ct: '',
        input_L: '',
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
        input_P: form.input_P === '' ? '' : Number(form.input_P),
        input_n_ct: form.input_n_ct === '' ? '' : Number(form.input_n_ct),
        input_L: form.input_L === '' ? '' : Number(form.input_L),
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
      {/* Navigation Wizard - Đã sửa: Cho phép nhấn quay lại các bước cũ */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between px-10">
        <button
          onClick={() => setStep(1)}
          className={`${getNavClass(1)} ${step > 1 ? 'cursor-pointer hover:text-primary' : ''}`}
          disabled={step === 1}
        >
          1. Nhập liệu
        </button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button
          onClick={() => setStep(2)}
          className={`${getNavClass(2)} ${step > 2 ? 'cursor-pointer hover:text-primary' : ''}`}
          disabled={step <= 2}
        >
          2. Động học
        </button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button
          onClick={() => setStep(3)}
          className={`${getNavClass(3)} ${step > 3 ? 'cursor-pointer hover:text-primary' : ''}`}
          disabled={step <= 3}
        >
          3. Chọn Động cơ
        </button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button
          onClick={() => setStep(4)}
          className={`${getNavClass(4)} cursor-default`}
          disabled={true}
        >
          4. Chi tiết máy
        </button>
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
                placeholder="6.5"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Số vòng quay n (v/p)</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-lg"
                type="number"
                value={form.input_n_ct}
                onChange={(e) => setForm((prev) => ({ ...prev, input_n_ct: e.target.value }))}
                placeholder="75"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Thời gian phục vụ L (năm)</label>
              <input
                className="w-full md:w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-lg"
                type="number"
                value={form.input_L}
                onChange={(e) => setForm((prev) => ({ ...prev, input_L: e.target.value }))}
                placeholder="10"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ĐỘNG HỌC */}
      {step === 2 && (
        <div className="space-y-10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 font-semibold hover:bg-slate-50 hover:text-slate-700 shadow-sm transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Nhập liệu
              </button>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Kết quả Tính toán Động học</h2>
                <p className="text-slate-500 mt-1">Hệ thống phân phối tỷ số truyền và tính toán công suất cần thiết.</p>
              </div>
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
                    onClick={() => setStep(3)} // Chuyển sang Bước 3: Chọn động cơ
                  >
                    Sang bước Chọn Động cơ
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
                  <p className="text-3xl font-black text-primary">{formatNumber(data.eta * 100)}%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1">Công suất P<sub>ct</sub></p>
                  <p className="text-3xl font-black text-slate-900">{formatNumber(data.P_ct)} <span className="text-sm font-medium text-slate-400">kW</span></p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1">Tỷ số truyền chung</p>
                  <p className="text-3xl font-black text-slate-900">{formatNumber(data.u_ch_sb)}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1">Vòng quay n<sub>sb</sub></p>
                  <p className="text-3xl font-black text-slate-900">{formatNumber(data.n_sb)} <span className="text-sm font-medium text-slate-400">rpm</span></p>
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
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{formatNumber(data.u_h_sb)}</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">Bánh răng côn (Cấp nhanh)</td>
                        <td className="px-6 py-4 text-center text-slate-500 font-serif italic text-lg">u<sub>1</sub></td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{formatNumber(data.u_1)}</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-700">Bánh răng trụ (Cấp chậm)</td>
                        <td className="px-6 py-4 text-center text-slate-500 font-serif italic text-lg">u<sub>2</sub></td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{formatNumber(data.u_2)}</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-primary">Bộ truyền xích (Bộ truyền ngoài)</td>
                        <td className="px-6 py-4 text-center text-primary font-serif italic text-lg">u<sub>x</sub></td>
                        <td className="px-6 py-4 text-right font-bold text-primary">{formatNumber(data.u_x_sb)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* STEP 3: CHỌN ĐỘNG CƠ (UC-06) */}
      {step === 3 && (
        <MotorRecommendation
          activeProject={activeProject}
          kinematicsResult={kinematicsResult}
          onMotorSelected={(res) => {
            setSelectedMotor(res);
            onProjectSaved({ ...activeProject, motors: res, selected_motor_snapshot: res });
            setStep(4);
          }}
          onNavigate={onNavigate}
          onGoBack={() => setStep(2)}
        />
      )}

      {/* STEP 4: CHI TIẾT MÁY (UC-05) - Pipeline A→F */}
      {step === 4 && (
        <div className="animate-fade-in">
          <UC05Detail
            activeProject={activeProject}
            kinematicsResult={kinematicsResult}
            onNavigate={onNavigate}
            onGoBack={() => setStep(3)}
            onKinematicsSaved={onKinematicsSaved}
            onProjectSaved={onProjectSaved}
          />
        </div>
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
