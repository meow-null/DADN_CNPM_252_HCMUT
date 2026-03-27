import { useEffect, useMemo, useState } from 'react';

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
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const dynamicKinematics = useMemo(() => {
    if (kinematicsResult?.kinematics) {
      return kinematicsResult.kinematics;
    }
    return null;
  }, [kinematicsResult]);

  const getNavClass = (stepNumber) => {
    if (step === stepNumber) return 'pb-2 text-primary border-b-2 border-primary font-bold';
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

      const savedProject = activeProject
        ? await calcRequest(`/projects/${activeProject.id}`, { method: 'PUT', body: payload })
        : await calcRequest('/projects', { method: 'POST', body: payload });

      onProjectSaved(savedProject);
      setStep(2);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể lưu dữ liệu đầu vào.');
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
      setStep(3);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể tính toán động học.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between px-10">
        <button className={getNavClass(1)} onClick={() => setStep(1)}>1. Nhập liệu</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(2)} onClick={() => setStep(2)}>2. Động cơ</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(3)} onClick={() => setStep(3)}>3. Động học</button>
        <div className="h-px bg-slate-200 flex-1 mx-4"></div>
        <button className={getNavClass(4)} onClick={() => setStep(4)}>4. Chi tiết máy</button>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Nhập số liệu kỹ thuật đầu vào</h2>
              <p className="text-slate-500">Dữ liệu này sẽ được lưu vào dự án qua API backend.</p>
            </div>
            <button
              onClick={handleSaveInput}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all"
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu & Tiếp tục'}
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Tên dự án</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ví dụ: Hệ dẫn động thùng trộn"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Công suất (P)</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                type="number"
                value={form.input_P}
                onChange={(e) => setForm((prev) => ({ ...prev, input_P: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Số vòng quay (n)</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                type="number"
                value={form.input_n_ct}
                onChange={(e) => setForm((prev) => ({ ...prev, input_n_ct: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Thời gian phục vụ (L)</label>
              <input
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                type="number"
                value={form.input_L}
                onChange={(e) => setForm((prev) => ({ ...prev, input_L: e.target.value }))}
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Đề xuất Động cơ Tối ưu</h2>
          </div>
          <div className="bg-white rounded-2xl border-2 border-primary shadow-xl overflow-hidden flex flex-col relative max-w-xl mx-auto">
            <div className="bg-primary text-white text-[10px] font-bold py-1 px-4 text-center uppercase tracking-widest">Đề xuất tối ưu nhất</div>
            <div className="p-8 flex-1 space-y-6">
              <h3 className="text-xl font-bold text-slate-800">4A132S4Y3</h3>
              <p className="text-slate-600">Dữ liệu mẫu cho bước chọn động cơ. Khi bấm chọn sẽ tính động học thật từ backend.</p>
            </div>
            <button className="w-full bg-primary text-white py-4 font-bold hover:bg-primary-dark transition-all" onClick={handleCalculateKinematics}>
              {isSubmitting ? 'Đang tính...' : 'Lựa chọn động cơ này'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-10 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Kết quả Tính toán Động học</h2>
              <p className="text-slate-500">Kết quả lấy từ endpoint POST/GET kinematics.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowFormulaModal(true)}
                className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
              >
                Xem chi tiết công thức
              </button>
              <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all" onClick={() => setStep(4)}>
                Lưu & Tiếp tục
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                <tr><th className="px-6 py-4 font-bold">Thông số</th><th className="px-6 py-4 font-bold">Ký hiệu</th><th className="px-6 py-4 font-bold text-right">Giá trị</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr><td className="px-6 py-4 text-slate-700">Hiệu suất toàn hệ</td><td className="px-6 py-4 font-mono text-slate-500">eta</td><td className="px-6 py-4 text-right font-bold text-primary">{dynamicKinematics?.eta ?? '-'} </td></tr>
                <tr><td className="px-6 py-4 text-slate-700">Công suất cần thiết</td><td className="px-6 py-4 font-mono text-slate-500">P_ct</td><td className="px-6 py-4 text-right font-bold">{dynamicKinematics?.P_ct ?? '-'}</td></tr>
                <tr><td className="px-6 py-4 text-slate-700">Tỷ số truyền chung</td><td className="px-6 py-4 font-mono text-slate-500">u_ch</td><td className="px-6 py-4 text-right font-bold">{dynamicKinematics?.u_ch_sb ?? '-'}</td></tr>
                <tr><td className="px-6 py-4 text-slate-700">Số vòng quay sơ bộ</td><td className="px-6 py-4 font-mono text-slate-500">n_sb</td><td className="px-6 py-4 text-right font-bold">{dynamicKinematics?.n_sb ?? '-'}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

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
          </div>
        </div>
      )}

      {showFormulaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
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
          </div>
        </div>
      )}
    </div>
  );
}
