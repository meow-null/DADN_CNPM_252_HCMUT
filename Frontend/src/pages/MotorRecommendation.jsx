import { useEffect, useMemo, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

async function motorRequest(path, options = {}) {
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

/** Badge màu theo series */
function seriesBadge(series) {
  switch (series) {
    case 'K':  return { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' };
    case 'DK': return { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200'  };
    case '4A': return { bg: 'bg-teal-100',   text: 'text-teal-700',   border: 'border-teal-200'   };
    default:   return { bg: 'bg-slate-100',  text: 'text-slate-700',  border: 'border-slate-200'  };
  }
}

/**
 * UC-06: Motor Recommendation Component
 * Gọi API thật từ Backend:
 *   GET /projects/:projectId/motors/suggestions  → Top 3
 *   GET /projects/:projectId/motors/candidates   → Tất cả
 *   POST /projects/:projectId/motors/select      → Lưu lựa chọn
 */
export default function MotorRecommendation({ activeProject, kinematicsResult, onMotorSelected, onNavigate, onGoBack }) {
  const [topMotors, setTopMotors] = useState([]);
  const [allMotors, setAllMotors] = useState([]);
  const [selectedMotor, setSelectedMotor] = useState(null);
  const [designInputs, setDesignInputs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAllModal, setShowAllModal] = useState(false);
  const [sortField, setSortField] = useState('delta_n');
  const [sortDir, setSortDir] = useState('asc');

  const projectId = activeProject?.id;
  const data = kinematicsResult?.kinematics;

  // ── Fetch Top 3 suggestions khi vào step ──
  useEffect(() => {
    if (!projectId) return;
    setIsLoading(true);
    setErrorMessage('');
    motorRequest(`/projects/${projectId}/motors/suggestions`)
      .then((result) => {
        setTopMotors(result.motors || []);
        setDesignInputs(result.designInputs || null);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setTopMotors([]);
      })
      .finally(() => setIsLoading(false));
  }, [projectId]);

  // ── Fetch all candidates khi mở modal AF1 ──
  const handleOpenAllModal = () => {
    setShowAllModal(true);
    if (allMotors.length > 0) return; // đã load rồi
    motorRequest(`/projects/${projectId}/motors/candidates`)
      .then((result) => setAllMotors(result.motors || []))
      .catch(() => setAllMotors([]));
  };

  // ── Chọn động cơ → gọi POST /select ──
  const handleSelectMotor = async (motor) => {
    setIsSelecting(true);
    setErrorMessage('');
    try {
      const result = await motorRequest(`/projects/${projectId}/motors/select`, {
        method: 'POST',
        body: { motorId: motor.id },
      });
      setSelectedMotor(motor);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSelecting(false);
    }
  };

  // ── Sort cho bảng AF1 ──
  const sortedAll = useMemo(() => {
    const list = [...allMotors];
    list.sort((a, b) => {
      let va = a[sortField];
      let vb = b[sortField];

      // Đưa các giá trị null/undefined xuống cuối
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;

      // Nếu là số thì so sánh kiểu số, nếu không thì so sánh chuỗi
      const numA = Number(va);
      const numB = Number(vb);

      if (!isNaN(numA) && !isNaN(numB)) {
        va = numA;
        vb = numB;
      } else {
        va = String(va).toLowerCase();
        vb = String(vb).toLowerCase();
      }

      if (va === vb) return 0;
      const compare = va > vb ? 1 : -1;
      return sortDir === 'asc' ? compare : -compare;
    });
    return list;
  }, [allMotors, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-slate-300 ml-1">↕</span>;
    return <span className="text-primary ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const P_ct = designInputs?.P_ct ?? data?.P_ct;
  const n_sb = designInputs?.n_sb ?? data?.n_sb;

  // ══════════════════════════════════════
  // Trạng thái: Chưa có project / chưa có kinematics
  // ══════════════════════════════════════
  if (!projectId || (!data && !isLoading && !errorMessage)) {
    return (
      <div className="space-y-8 animate-fade-in flex flex-col items-center">
        <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center max-w-xl w-full">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-700">Thiếu dữ liệu đầu vào</h3>
          <p className="text-slate-500 mt-2">Bạn cần hoàn thành Tính toán Động học (UC-04) trước khi chọn động cơ.</p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════
  // Trạng thái: Loading
  // ══════════════════════════════════════
  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Đề xuất Động cơ Tối ưu</h2>
          <p className="text-slate-500">Đang truy vấn cơ sở dữ liệu...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 rounded w-2/3"></div>
              <div className="h-12 bg-slate-100 rounded-xl"></div>
              <div className="h-20 bg-slate-100 rounded-xl"></div>
              <div className="h-10 bg-slate-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════
  // Trạng thái: Lỗi / Không tìm thấy (EF1)
  // ══════════════════════════════════════
  if (errorMessage && topMotors.length === 0) {
    return (
      <div className="space-y-8 animate-fade-in flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Chọn Động cơ Tối ưu</h2>
          {P_ct && n_sb && (
            <div className="bg-primary-light/50 text-primary-dark inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium">
              P<sub>ct</sub> = {P_ct} kW &nbsp;|&nbsp; n<sub>sb</sub> = {n_sb} rpm
            </div>
          )}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-xl w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2">Không tìm thấy động cơ phù hợp</h3>
          <p className="text-red-600/80 text-sm leading-relaxed">{errorMessage}</p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════
  // Đã chọn động cơ → Xác nhận
  // ══════════════════════════════════════
  if (selectedMotor) {
    const sc = seriesBadge(selectedMotor.series);
    return (
      <div className="space-y-8 animate-fade-in flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Đã chọn Động cơ</h2>
          <p className="text-slate-500">Động cơ đã được lưu vào dự án. Bạn có thể tiếp tục hoặc chọn lại.</p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-emerald-400 shadow-xl overflow-hidden max-w-xl w-full">
          <div className="bg-emerald-500 text-white text-[10px] font-bold py-1.5 text-center uppercase tracking-widest flex items-center justify-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            Đã xác nhận lựa chọn
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800">{selectedMotor.code}</h3>
              <span className={`${sc.bg} ${sc.text} text-xs font-bold px-3 py-1 rounded-full border ${sc.border}`}>
                Series {selectedMotor.series}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-sm text-slate-600">Công suất P<sub>dm</sub></span><span className="font-bold">{Number(selectedMotor.P_dm)} kW</span></div>
              <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-sm text-slate-600">Vòng quay n<sub>dm</sub></span><span className="font-bold">{selectedMotor.n_dm} rpm</span></div>
              {selectedMotor.efficiency && <div className="flex justify-between border-b border-slate-200 pb-2"><span className="text-sm text-slate-600">Hiệu suất</span><span className="font-bold">{Number(selectedMotor.efficiency)}%</span></div>}
              {selectedMotor.cos_phi && <div className="flex justify-between"><span className="text-sm text-slate-600">Hệ số cos φ</span><span className="font-bold">{Number(selectedMotor.cos_phi)}</span></div>}
            </div>
          </div>
          <div className="flex border-t border-slate-200">
            <button className="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm" onClick={() => setSelectedMotor(null)}>
              ← Chọn lại
            </button>
            <button 
              className="flex-[2] py-4 bg-primary text-white font-bold hover:bg-primary-dark transition-all text-sm flex items-center justify-center gap-2" 
              onClick={() => onMotorSelected?.(selectedMotor)} // Gọi callback để Calculations chuyển bước
            >
              Tiếp tục thiết kế Chi tiết máy
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════
  // Main Flow: Top 3 Cards
  // ══════════════════════════════════════
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back button */}
      {onGoBack && (
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 font-semibold hover:bg-slate-50 hover:text-slate-700 shadow-sm transition-all w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          ← Động học
        </button>
      )}
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Đề xuất Động cơ Tối ưu</h2>
        <p className="text-slate-500">Hệ thống gợi ý dựa trên kết quả tính toán động học (UC-04)</p>
        {P_ct && n_sb && (
          <div className="bg-primary-light/50 text-primary-dark inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            Dựa trên: P<sub>ct</sub> = {P_ct} kW &nbsp;|&nbsp; n<sub>sb</sub> = {n_sb} rpm
          </div>
        )}
      </div>

      {/* Error nhỏ (nếu có — nhưng vẫn có motor hiển thị) */}
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-medium text-center">{errorMessage}</div>
      )}

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {topMotors.map((motor, index) => {
          const isTop = index === 0;
          const sc = seriesBadge(motor.series);
          const pDm = Number(motor.P_dm);
          const deltaN = motor.delta_n ?? Math.abs(motor.n_dm - (n_sb || 0));
          const deltaP = motor.delta_P ?? +(pDm - (P_ct || 0)).toFixed(2);

          return (
            <div
              key={motor.id || motor.code}
              className={`bg-white rounded-2xl overflow-hidden flex flex-col relative transition-all duration-300 hover:shadow-lg ${
                isTop ? 'border-2 border-primary shadow-xl md:scale-105 z-10' : 'border border-slate-200 shadow-sm'
              }`}
            >
              {isTop && (
                <div className="bg-primary text-white text-[10px] font-bold py-1.5 text-center uppercase tracking-widest">
                  ⭐ Đề xuất tối ưu nhất
                </div>
              )}

              <div className={`p-6 lg:p-8 flex-1 space-y-5 ${isTop ? '' : 'pt-8'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-black text-slate-800 ${isTop ? 'text-xl' : 'text-lg'}`}>{motor.code}</h3>
                    <span className={`inline-block mt-1.5 ${sc.bg} ${sc.text} text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.border}`}>
                      Series {motor.series}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Công suất P<sub>dm</sub></span>
                    <span className="font-bold text-slate-800">{pDm} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Vòng quay n<sub>dm</sub></span>
                    <span className="font-bold text-slate-800">{motor.n_dm} rpm</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 space-y-2">
                    {motor.efficiency != null && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-xs">Hiệu suất</span>
                        <span className="font-bold text-xs">{Number(motor.efficiency)}%</span>
                      </div>
                    )}
                    {motor.cos_phi != null && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-xs">cos φ</span>
                        <span className="font-bold text-xs">{Number(motor.cos_phi)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                    ΔP = +{deltaP} kW
                  </span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                    Δn = {deltaN} rpm
                  </span>
                </div>
              </div>

              <button
                className={`w-full py-4 font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                  isTop ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => handleSelectMotor(motor)}
                disabled={isSelecting}
              >
                {isSelecting ? 'Đang lưu...' : 'Lựa chọn động cơ này'}
                {!isSelecting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Nút xem tất cả (AF1) */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-600 font-semibold hover:bg-slate-50 hover:border-primary/50 transition-all shadow-sm"
          onClick={handleOpenAllModal}
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
          Xem tất cả động cơ thỏa mãn
        </button>
      </div>

      {/* ══════════════════════════════════════ */}
      {/* MODAL AF1: Bảng danh sách đầy đủ      */}
      {/* ══════════════════════════════════════ */}
      {showAllModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Tất cả động cơ thỏa mãn</h2>
                <p className="text-xs text-slate-400 mt-0.5">{allMotors.length} kết quả — P<sub>dm</sub> ≥ {P_ct} kW</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700 transition-colors" onClick={() => setShowAllModal(false)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="overflow-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase font-bold tracking-wider sticky top-0 z-10">
                  <tr>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary" onClick={() => handleSort('code')}>Mã <SortIcon field="code" /></th>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary" onClick={() => handleSort('series')}>Series <SortIcon field="series" /></th>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary text-right" onClick={() => handleSort('P_dm')}>P<sub>dm</sub> (kW) <SortIcon field="P_dm" /></th>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary text-right" onClick={() => handleSort('n_dm')}>n<sub>dm</sub> (rpm) <SortIcon field="n_dm" /></th>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary text-right" onClick={() => handleSort('efficiency')}>η (%) <SortIcon field="efficiency" /></th>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary text-right" onClick={() => handleSort('cos_phi')}>cos φ <SortIcon field="cos_phi" /></th>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary text-right" onClick={() => handleSort('delta_n')}>Δn <SortIcon field="delta_n" /></th>
                    <th className="px-5 py-3.5 cursor-pointer hover:text-primary text-right" onClick={() => handleSort('delta_P')}>ΔP <SortIcon field="delta_P" /></th>
                    <th className="px-5 py-3.5 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedAll.map((motor, i) => {
                    const sc = seriesBadge(motor.series);
                    return (
                      <tr key={motor.id || i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-bold text-slate-800">{motor.code}</td>
                        <td className="px-5 py-3">
                          <span className={`${sc.bg} ${sc.text} text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.border}`}>{motor.series}</span>
                        </td>
                        <td className="px-5 py-3 text-right font-mono">{Number(motor.P_dm)}</td>
                        <td className="px-5 py-3 text-right font-mono">{motor.n_dm}</td>
                        <td className="px-5 py-3 text-right font-mono">{motor.efficiency ? Number(motor.efficiency) : '—'}</td>
                        <td className="px-5 py-3 text-right font-mono">{motor.cos_phi ? Number(motor.cos_phi) : '—'}</td>
                        <td className="px-5 py-3 text-right text-blue-600 font-mono text-xs">{motor.delta_n ?? '—'}</td>
                        <td className="px-5 py-3 text-right text-emerald-600 font-mono text-xs">+{motor.delta_P != null ? Number(motor.delta_P).toFixed(2) : '—'}</td>
                        <td className="px-5 py-3 text-center">
                          <button
                            className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-all disabled:opacity-50"
                            onClick={() => { handleSelectMotor(motor); setShowAllModal(false); }}
                            disabled={isSelecting}
                          >
                            Chọn
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 text-center border-t border-slate-200 shrink-0">
              <button className="px-6 py-2 text-slate-500 font-bold text-sm hover:text-slate-700" onClick={() => setShowAllModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
