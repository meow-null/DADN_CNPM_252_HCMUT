import { useState, useEffect } from 'react';
import { formatNumber } from '../utils/formatUtils';

// --- DATA TIÊU CHUẨN ---
// Danh sách vật liệu sẽ được fetch từ API

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

// --- UI helpers ---
const formatNum = (val) => val != null ? formatNumber(val) : '-';

const StatusBadge = ({ ok }) => ok
  ? <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">Đạt</span>
  : <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase">Không đạt</span>;

const ModuleHeader = ({ letter, title, tag }) => (
  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3">
      <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-black">{letter}</span>
      {title}
    </h3>
    {tag && <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border">{tag}</span>}
  </div>
);

const ResultCard = ({ label, value, unit, highlight, error }) => (
  <div className={`p-4 rounded-xl border ${error ? 'bg-red-50 border-red-200' : highlight ? 'bg-primary/5 border-primary/15' : 'bg-slate-50 border-slate-100'}`}>
    <p className={`text-[10px] font-bold uppercase mb-1 ${error ? 'text-red-400' : 'text-slate-400'}`}>{label}</p>
    <p className={`text-xl font-black ${error ? 'text-red-600' : highlight ? 'text-primary' : 'text-slate-800'}`}>
      {value != null ? value : '-'} {unit && <span className={`text-xs font-medium ${error ? 'text-red-400' : 'text-slate-400'}`}>{unit}</span>}
    </p>
  </div>
);

// ============================================================
export default function UC05Detail({ activeProject, kinematicsResult, onNavigate, onGoBack, onKinematicsSaved, onProjectSaved }) {
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/materials/grades`);
        const data = await response.json();
        if (response.ok && data.status === 'success') {
          setMaterials(data.data);
          if (data.data.length > 0) {
            setMaterial(data.data[1] || data.data[0]);
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách vật liệu:', error);
      }
    };
    fetchMaterials();
  }, []);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [activeModule, setActiveModule] = useState('A');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRun = async () => {
    if (!activeProject?.id) {
      setErrorMessage('Không tìm thấy dự án hiện tại. Vui lòng quay lại bước 1 để tạo dự án.');
      return;
    }
    
    setIsRunning(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${activeProject.id}/design/calculate`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ material: material.name })
      });
      
      const payload = await response.json();
      
      if (!response.ok || payload.status === 'error') {
        throw new Error(payload.message || 'Lỗi từ máy chủ khi tính toán thiết kế chi tiết máy.');
      }
      
      setResults(payload.data);
      if (onProjectSaved) {
        onProjectSaved({ ...activeProject, design_result: payload.data, material: material.name });
      }
      setShowSuccess(false);

      // Đồng bộ state kinematics với DB sau khi tính toán xong
      if (onKinematicsSaved) {
        try {
          const kinResponse = await fetch(`${API_BASE_URL}/projects/${activeProject.id}/kinematics`, {
            credentials: 'include',
          });
          const kinPayload = await kinResponse.json();
          if (kinResponse.ok && kinPayload?.data) {
            const data = kinPayload.data;
            onKinematicsSaved({
              project: data,
              kinematics: {
                eta: data.efficiency,
                P_ct: data.Pct,
                u_ch_sb: data.total_ratio, // Bây giờ là tỷ số truyền thực tế
                u_h_sb: data.transmission?.u_h,
                u_x_sb: data.transmission?.u_x,
                u_1: data.transmission?.u_1,
                u_2: data.transmission?.u_2,
                n_sb: data.transmission?.n_sb,
                shaft_powers: data.shafts,
                T_out: data.shafts?.T_out,
              }
            });
          }
        } catch (e) {
          console.error("Failed to sync kinematics state", e);
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
      // Khi có lỗi EF1-EF4, ta reset results để không hiển thị kết quả cũ
      setResults(null);
    } finally {
      setIsRunning(false);
    }
  };

  const modules = ['A', 'B', 'C', 'D', 'E', 'F'];
  const moduleLabels = {
    A: 'Bộ truyền Xích',
    B: 'Bánh răng Côn',
    C: 'Bánh răng Trụ',
    D: 'Thiết kế Trục',
    E: 'Kiểm nghiệm Then',
    F: 'Kiểm nghiệm Ổ lăn',
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center space-y-6">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center animate-bounce-in shadow-lg shadow-emerald-500/20">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div>
          <h2 className="text-4xl font-black text-slate-900">Thiết kế hoàn tất!</h2>
          <p className="text-slate-500 mt-2 text-lg">Tất cả các chi tiết máy đã đạt tiêu chuẩn kỹ thuật và sẵn sàng xuất báo cáo.</p>
        </div>
        <div className="flex gap-4 pt-4 flex-wrap justify-center">
          {onGoBack && (
            <button 
              onClick={onGoBack}
              className="px-6 py-4 bg-white border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Chọn động cơ
            </button>
          )}
          <button 
            onClick={() => setShowSuccess(false)}
            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
          >
            ← Quay lại kiểm tra
          </button>
          <button 
            onClick={() => onNavigate('summary')}
            className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark shadow-xl shadow-primary/30 transition-all flex items-center gap-2"
          >
            Xem báo cáo &amp; Xuất file
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      {onGoBack && (
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 font-semibold hover:bg-slate-50 hover:text-slate-700 shadow-sm transition-all w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          ← Quay lại Chọn Động cơ
        </button>
      )}
      
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-start gap-4 animate-fade-in shadow-sm">
          <div className="bg-red-100 text-red-600 rounded-full p-2 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Tính toán thất bại</h4>
            <p className="text-sm font-medium">{errorMessage}</p>
            <p className="text-xs text-red-500 mt-2">Vui lòng thay đổi vật liệu mác thép tốt hơn hoặc kiểm tra lại thông số đầu vào.</p>
          </div>
        </div>
      )}

      {/* Config Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-primary rounded-full"></span>
          Cấu hình chung cho Pipeline
        </h3>
        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="space-y-2 flex-1 w-full">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Vật liệu Mác thép</label>
            <select
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-primary"
              value={material?.name || ''}
              onChange={e => setMaterial(materials.find(m => m.name === e.target.value))}
            >
              {materials.map(m => <option key={m.name} value={m.name}>{m.name} (HB {m.HB})</option>)}
            </select>
          </div>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 w-full md:w-auto h-[48px]"
          >
            {isRunning
              ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Đang chạy Pipeline...</>
              : <>&#9654; Tính toán Pipeline A → F</>
            }
          </button>
        </div>
      </div>

      {!results && !isRunning && (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
          <p className="font-bold text-lg">Chưa có kết quả</p>
          <p className="text-sm mt-1">Cấu hình vật liệu rồi nhấn &quot;Tính toán Pipeline&quot; để tự động truy xuất tiêu chuẩn cơ khí và tính toán.</p>
        </div>
      )}

      {results && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
            {/* Module Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-2 h-fit sticky top-4">
              {modules.map(m => {
                let ok = false;
                if (m === 'A') ok = results.ModuleA?.check_s_pass && results.ModuleA?.check_H_pass;
                else if (m === 'B') ok = results.ModuleB?.check_H_pass;
                else if (m === 'C') ok = results.ModuleC?.check_H_pass;
                else if (m === 'D') ok = ['trucI','trucII','trucIII'].every(id => results.ModuleD[id]?.s_fatigue >= 1.5);
                else if (m === 'E') ok = ['trucI','trucII','trucIII'].every(id => results.ModuleE[id]?.check_key_pass);
                else if (m === 'F') ok = ['trucI','trucII','trucIII'].every(id => results.ModuleF[id]?.check_bearing_pass);

                return (
                  <button
                    key={m}
                    onClick={() => setActiveModule(m)}
                    className={`w-full flex items-center justify-between gap-2 p-3 rounded-lg text-sm transition-all mb-1 ${activeModule === m ? 'bg-primary-light text-primary font-bold' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    <span>Module {m}: {moduleLabels[m]}</span>
                    <StatusBadge ok={ok} />
                  </button>
                );
              })}
            </div>

            {/* Module Content */}
            <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              {activeModule === 'A' && <ModuleA r={results.ModuleA} />}
              {activeModule === 'B' && <ModuleB r={results.ModuleB} />}
              {activeModule === 'C' && <ModuleC r={results.ModuleC} />}
              {activeModule === 'D' && <ModuleD shafts={results.ModuleD} />}
              {activeModule === 'E' && <ModuleE keys={results.ModuleE} />}
              {activeModule === 'F' && <ModuleF bearings={results.ModuleF} />}
            </div>
          </div>

          {/* Nút Hoàn tất */}
          <div className="flex justify-center pt-8 animate-bounce-in">
            <button
              onClick={() => {
                const isAllPassed = modules.every(m => {
                  if (m === 'A') return results.ModuleA?.check_s_pass && results.ModuleA?.check_H_pass;
                  if (m === 'B') return results.ModuleB?.check_H_pass;
                  if (m === 'C') return results.ModuleC?.check_H_pass;
                  if (m === 'D') return ['trucI','trucII','trucIII'].every(id => results.ModuleD[id]?.s_fatigue >= 1.5);
                  if (m === 'E') return ['trucI','trucII','trucIII'].every(id => results.ModuleE[id]?.check_key_pass);
                  if (m === 'F') return ['trucI','trucII','trucIII'].every(id => results.ModuleF[id]?.check_bearing_pass);
                  return true;
                });
                
                if (!isAllPassed) {
                  setErrorMessage('Chưa thể hoàn tất! Có ít nhất một module không đạt yêu cầu kỹ thuật.');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  return;
                }
                setShowSuccess(true);
              }}
              className="px-12 py-4 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center gap-3 bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/40 cursor-pointer scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              XÁC NHẬN & HOÀN TẤT THIẾT KẾ
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// MODULE PANELS (MAPPED WITH BACKEND JSON)
// ============================================================
function ModuleA({ r }) {
  if (!r) return null;
  const ok = r.check_s_pass && r.check_H_pass;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="A" title="Bộ truyền Xích ống con lăn" tag="Trục III → Thùng trộn" />
      <div className={`p-4 rounded-xl border text-sm font-medium ${ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
        {ok ? 'Đạt điều kiện an toàn và độ bền tiếp xúc.' : 'Không đạt điều kiện an toàn s hoặc độ bền tiếp xúc σH.'}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Số răng z₁" value={r.z1} />
        <ResultCard label="Số răng z₂" value={r.z2} />
        <ResultCard label="Số mắt xích x" value={r.x_links} />
        <ResultCard label={`Bước xích p (${r.strands || 1} dãy)`} value={formatNum(r.p_mm, 2)} unit="mm" highlight />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Khoảng cách trục a" value={formatNum(r.a_mm, 1)} unit="mm" />
        <ResultCard label="Hệ số an toàn s" value={formatNum(r.s_safety, 2)} error={!r.check_s_pass} />
        <ResultCard label="Ứng suất σH" value={formatNum(r.sigma_H_MPa, 1)} unit="MPa" highlight error={!r.check_H_pass} />
        <ResultCard label="Lực lên trục Fr" value={formatNum(r.Fr_N, 1)} unit="N" highlight />
      </div>
    </div>
  );
}

function ModuleB({ r }) {
  if (!r) return null;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="B" title="Bánh răng Côn (Cấp nhanh)" tag="Trục I → II" />
      <div className={`p-4 rounded-xl border text-sm font-medium ${r.check_H_pass ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
        {r.check_H_pass ? `Đạt bền tiếp xúc: σH ≤ [σH] = ${formatNum(r.sigma_H_allow_MPa, 0)} MPa` : `Không đạt bền tiếp xúc!`}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Số răng z₁" value={r.z1_gear} />
        <ResultCard label="Số răng z₂" value={r.z2_gear} />
        <ResultCard label="Module m_te" value={formatNum(r.m_e_mm, 2)} unit="mm" highlight />
        <ResultCard label="Chiều dài côn Re" value={formatNum(r.Re_mm, 1)} unit="mm" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Đ.kính dm1" value={formatNum(r.d_m1_mm, 1)} unit="mm" />
        <ResultCard label="Chiều rộng b" value={r.b_mm} unit="mm" />
        <ResultCard label="[σH] cho phép" value={formatNum(r.sigma_H_allow_MPa, 1)} unit="MPa" highlight />
        <ResultCard label="Tình trạng" value={r.check_H_pass ? "Đạt" : "Không đạt"} error={!r.check_H_pass} />
      </div>
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Lực truyền xuống Module D (Trục)</p>
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label="Lực vòng Ft" value={formatNum(r.Ft1_N, 1)} unit="N" highlight />
          <ResultCard label="Lực hướng tâm Fr" value={formatNum(r.Fr1_N, 1)} unit="N" />
          <ResultCard label="Lực dọc trục Fa" value={formatNum(r.Fa1_N, 1)} unit="N" />
        </div>
      </div>
    </div>
  );
}

function ModuleC({ r }) {
  if (!r) return null;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="C" title="Bánh răng Trụ (Cấp chậm)" tag="Trục II → III" />
      <div className={`p-4 rounded-xl border text-sm font-medium ${r.check_H_pass ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
        {r.check_H_pass ? `Tính toán kích thước thành công.` : `Không đạt độ bền.`}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="K.cách trục aw" value={r.a_w_mm} unit="mm" highlight />
        <ResultCard label="Module m_tc" value={r.m_tc_mm} unit="mm" />
        <ResultCard label="Số răng z₁" value={r.z1_gear} />
        <ResultCard label="Số răng z₂" value={r.z2_gear} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Đường kính d₁" value={formatNum(r.d1_mm, 1)} unit="mm" />
        <ResultCard label="Đường kính d₂" value={formatNum(r.d2_mm, 1)} unit="mm" />
        <ResultCard label="Chiều rộng bw" value={formatNum(r.b_w_mm, 1)} unit="mm" />
        <ResultCard label="Tình trạng" value={r.check_H_pass ? "Đạt" : "Không đạt"} error={!r.check_H_pass} />
      </div>
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Lực truyền xuống Module D (Trục)</p>
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label="Lực vòng Ft" value={formatNum(r.Ft2_N, 1)} unit="N" highlight />
          <ResultCard label="Lực hướng tâm Fr" value={formatNum(r.Fr2_N, 1)} unit="N" />
          <ResultCard label="Lực dọc trục Fa" value={formatNum(r.Fa2_N, 1)} unit="N" />
        </div>
      </div>
    </div>
  );
}

function ModuleD({ shafts }) {
  if (!shafts) return null;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="D" title="Thiết kế Trục I, II, III" tag="Giải phương trình cân bằng" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Trục</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">d<sub>sb</sub> (mm)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">M<sub>j</sub> (N.mm)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">d<sub>tc</sub> (mm)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Hệ số an toàn s</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Kết quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {['I', 'II', 'III'].map(id => {
              const s = shafts[`truc${id}`];
              if (!s) return null;
              const ok = s.s_fatigue >= 1.5;
              return (
                <tr key={id} className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-slate-700">Trục {id}</td>
                  <td className="py-4 font-mono text-primary font-bold">{formatNum(s.d_sb_mm, 1)}</td>
                  <td className="py-4 font-mono text-slate-600">{s.M_j_Nmm?.[0] != null ? Number(s.M_j_Nmm[0]).toLocaleString() : '-'}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary font-black rounded-lg">{s.d_tc_mm?.[0]} mm</span>
                  </td>
                  <td className={`py-4 font-mono font-bold ${ok ? 'text-slate-700' : 'text-red-600'}`}>{formatNum(s.s_fatigue, 2)}</td>
                  <td className="py-4"><StatusBadge ok={ok} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-700 text-sm">
        <strong>Quy trình:</strong> d<sub>sb</sub> tính theo công thức xoắn → chọn d<sub>tc</sub> tiêu chuẩn → kiểm nghiệm hệ số an toàn mỏi s ≥ 1.5.
      </div>
    </div>
  );
}

function ModuleE({ keys }) {
  if (!keys) return null;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="E" title="Kiểm nghiệm Then (Key)" tag="Dựa trên dtc từ Module D" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Trục</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">b×h</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">l<sub>t</sub> (mm)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">σ<sub>d</sub> (MPa)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">τ<sub>c</sub> (MPa)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Kết quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {['I', 'II', 'III'].map(id => {
              const k = keys[`truc${id}`];
              if (!k) return null;
              return (
                <tr key={id} className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-slate-700">Trục {id}</td>
                  <td className="py-4 font-mono text-slate-600">{k.b}×{k.h}</td>
                  <td className="py-4 font-mono text-slate-600">{k.l_t_mm}</td>
                  <td className={`py-4 font-mono font-bold ${k.sigma_d_MPa > 100 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {formatNum(k.sigma_d_MPa, 1)} <span className="text-[10px] text-slate-400">≤ 100</span>
                  </td>
                  <td className={`py-4 font-mono font-bold ${k.tau_c_MPa > 60 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {formatNum(k.tau_c_MPa, 1)} <span className="text-[10px] text-slate-400">≤ 60</span>
                  </td>
                  <td className="py-4"><StatusBadge ok={k.check_key_pass} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ModuleF({ bearings }) {
  if (!bearings) return null;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="F" title="Kiểm nghiệm Ổ lăn" tag="Tải trọng động & Tải trọng tĩnh" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Trục</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Mã ổ</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">C<sub>d</sub> (kN)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">C<sub>cat</sub> (kN)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Kết quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {['I', 'II', 'III'].map(id => {
              const b = bearings[`truc${id}`];
              if (!b) return null;
              return (
                <tr key={id} className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-slate-700">Trục {id}</td>
                  <td className="py-4 font-mono font-bold text-primary">{b.bearing_code}</td>
                  <td className="py-4 font-mono text-slate-600">{formatNum(b.C_d_kN, 2)}</td>
                  <td className={`py-4 font-mono font-bold ${b.check_bearing_pass ? 'text-emerald-600' : 'text-red-600'}`}>{formatNum(b.C_catalog_kN, 2)}</td>
                  <td className="py-4"><StatusBadge ok={b.check_bearing_pass} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-600 text-sm">
        <strong>Công thức:</strong> C<sub>d</sub> = Q × ∛(L<sub>mvong</sub>). Ổ đạt khi C<sub>catalog</sub> ≥ C<sub>d</sub>.
      </div>
    </div>
  );
}
