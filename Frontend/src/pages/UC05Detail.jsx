import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

// --- UI helpers ---
const StatusBadge = ({ ok }) =>
  ok
    ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50"></span>
        Đạt
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-700 border border-rose-200 rounded-full text-[10px] font-black uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-sm shadow-rose-500/50"></span>
        Lỗi
      </span>
    );

const ModuleHeader = ({ letter, title, tag }) => (
  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3 font-heading">
      <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-md shadow-blue-500/20">{letter}</span>
      {title}
    </h3>
    {tag && <span className="text-[10px] font-extrabold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 uppercase tracking-widest">{tag}</span>}
  </div>
);

const ResultCard = ({ label, value, unit, highlight }) => (
  <div className={`p-4 rounded-2xl border transition-premium ${highlight ? 'bg-blue-600/5 border-blue-500/20 shadow-sm' : 'bg-slate-50/50 border-slate-100/80 hover:bg-slate-50'}`}>
    <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
    <p className={`text-xl font-extrabold font-heading ${highlight ? 'text-blue-600' : 'text-slate-800'}`}>
      {value} {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
    </p>
  </div>
);

const fmt = (v, d = 2) => (v != null ? Number(v).toFixed(d) : '—');

// ============================================================
export default function UC05Detail({ activeProject, kinematicsResult, onNavigate, onGoBack, onProjectSaved, onKinematicsSaved }) {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [activeModule, setActiveModule] = useState('A');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Quick Edit / Contextual Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [correctionTarget, setCorrectionTarget] = useState(null); // 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null
  const [showAllFields, setShowAllFields] = useState(false);

  const [materials, setMaterials] = useState([]);
  const [editForm, setEditForm] = useState({
    input_P: '',
    input_n_ct: '',
    input_L: '',
    selected_material_id: '',
    d_tc_I: '',
    key_b: '',
    key_h: '',
    key_t1: '',
    key_l: '',
    m_e_I: ''
  });
  
  const [isLiveCalculating, setIsLiveCalculating] = useState(false);
  const [liveCheckPassed, setLiveCheckPassed] = useState(false);
  const [liveWarnings, setLiveWarnings] = useState([]);
  const [latestCalcRef, setLatestCalcRef] = useState(null);
  const [debouncedForm, setDebouncedForm] = useState(null);

  // Correction configs per module
  const correctionConfigs = {
    A: {
      title: 'Khắc phục bộ truyền Xích (Module A)',
      desc: 'Bộ truyền xích đang quá tải (hệ số an toàn bền mỏi [s] nhỏ hơn giới hạn an toàn hoặc vượt quá ứng suất tiếp xúc). Hãy giảm công suất đầu vào P hoặc tăng vòng quay n_ct để giảm tải trọng phân bổ lên răng xích.',
      fields: ['input_P', 'input_n_ct', 'input_L']
    },
    B: {
      title: 'Khắc phục Bánh răng Côn (Module B)',
      desc: 'Bánh răng côn không đạt độ bền tiếp xúc (ứng suất tính toán σH lớn hơn ứng suất tiếp xúc cho phép [σH]). Hãy nâng cấp mác vật liệu hoặc ghi đè tăng Module bánh răng côn m_e.',
      fields: ['selected_material_id', 'm_e_I', 'input_P']
    },
    C: {
      title: 'Khắc phục Bánh răng Trụ (Module C)',
      desc: 'Bánh răng trụ cấp chậm không đạt độ bền tiếp xúc. Bạn có thể khắc phục bằng cách chọn vật liệu có giới hạn độ bền tiếp xúc σHlim cao hơn hoặc giảm nhẹ công suất thiết kế P.',
      fields: ['selected_material_id', 'input_P']
    },
    D: {
      title: 'Khắc phục độ bền mỏi Trục (Module D)',
      desc: 'Hệ số an toàn bền mỏi s của Trục I không đạt chuẩn an toàn cơ học (s < 1.5). Hãy giảm nhẹ công suất đầu vào P, chọn vật liệu tốt hơn, hoặc nhập đường kính trục d_tc lớn hơn.',
      fields: ['d_tc_I', 'selected_material_id', 'input_P']
    },
    E: {
      title: 'Khắc phục bền Then (Module E)',
      desc: 'Then lắp trên trục không đạt điều kiện bền dập/cắt. Bạn có thể chọn mác vật liệu có độ bền cao hơn, hoặc tự nhập ghi đè tăng kích thước then (b, h, t1, l).',
      fields: ['d_tc_I', 'key_b', 'key_h', 'key_t1', 'key_l', 'selected_material_id', 'input_P']
    },
    F: {
      title: 'Khắc phục Ổ lăn Trục I (Module F)',
      desc: 'Không tìm thấy ổ lăn tương thích hoặc tải trọng quá lớn. Bạn nên nhập (ghi đè) đường kính trục d_tc lớn hơn để tìm được ổ lăn lớn, hoặc giảm bớt công suất P.',
      fields: ['d_tc_I', 'input_P', 'input_n_ct', 'input_L']
    }
  };

  const currentConfig = correctionConfigs[correctionTarget] || {
    title: 'Chỉnh sửa nhanh thông số đầu vào',
    desc: 'Cập nhật thông số đầu vào của dự án và chạy kiểm nghiệm chi tiết máy.',
    fields: ['input_P', 'input_n_ct', 'input_L', 'selected_material_id']
  };

  // Open correction handler called from inline failure badges
  const handleOpenCorrection = (moduleLetter) => {
    setCorrectionTarget(moduleLetter);
    setShowAllFields(false);
    setShowEditModal(true);
  };

  // Load materials list
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/materials`, {
          credentials: 'include'
        });
        const payload = await response.json().catch(() => null);
        if (response.ok && payload?.status === 'success') {
          setMaterials(payload.data || []);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách vật liệu:", err);
      }
    };
    fetchMaterials();
  }, []);

  // Sync modal values when activeProject or modal target changes
  useEffect(() => {
    if (activeProject && showEditModal) {
      setEditForm({
        input_P: activeProject.input_P || '',
        input_n_ct: activeProject.input_n_ct || '',
        input_L: activeProject.input_L || '',
        selected_material_id: activeProject.selected_material_id || '',
        d_tc_I: latestCalcRef?.designResult?.ModuleD?.trucI?.d_tc_mm?.[0] || '',
        key_b: latestCalcRef?.designResult?.ModuleE?.b || '',
        key_h: latestCalcRef?.designResult?.ModuleE?.h || '',
        key_t1: latestCalcRef?.designResult?.ModuleE?.t1 || '',
        key_l: latestCalcRef?.designResult?.ModuleE?.l_t_mm || '',
        m_e_I: latestCalcRef?.designResult?.ModuleB?.m_e_mm || ''
      });
      setLiveWarnings([]);
      setLiveCheckPassed(false);
      setLatestCalcRef(null);
    }
  }, [activeProject, showEditModal, correctionTarget]);

  // Debounce form edit changes
  useEffect(() => {
    if (!showEditModal) return;
    const timer = setTimeout(() => {
      setDebouncedForm(editForm);
    }, 600);
    return () => clearTimeout(timer);
  }, [editForm, showEditModal]);

  // Perform dynamic live recalculation on debounced form updates
  useEffect(() => {
    if (!debouncedForm) return;
    
    const run = async () => {
      setIsLiveCalculating(true);
      try {
        // 1. Save inputs
        const saveRes = await fetch(`${API_BASE_URL}/projects/${activeProject.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input_P: Number(debouncedForm.input_P),
            input_n_ct: Number(debouncedForm.input_n_ct),
            input_L: Number(debouncedForm.input_L),
            selected_material_id: debouncedForm.selected_material_id ? Number(debouncedForm.selected_material_id) : null
          })
        });
        const savePayload = await saveRes.json().catch(() => null);
        if (!saveRes.ok || savePayload?.status === 'error') {
          throw new Error(savePayload?.message || 'Không thể lưu thông số.');
        }

        // 2. Kinematics calculation
        const kinRes = await fetch(`${API_BASE_URL}/projects/${activeProject.id}/kinematics`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        const kinPayload = await kinRes.json().catch(() => null);
        if (!kinRes.ok || kinPayload?.status === 'error') {
          throw new Error(kinPayload?.message || 'Không thể cập nhật động học.');
        }

        // 3. Design calculation
        const designRes = await fetch(`${API_BASE_URL}/projects/${activeProject.id}/design/calculate`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ overrides: debouncedForm })
        });
        const designPayload = await designRes.json().catch(() => null);
        if (!designRes.ok || designPayload?.status === 'error') {
          throw new Error(designPayload?.message || 'Không thể cập nhật thiết kế.');
        }

        const resData = designPayload.data;
        const okA = resData.ModuleA?.check_s_pass && resData.ModuleA?.check_H_pass;
        const okB = resData.ModuleB?.check_H_pass;
        const okC = resData.ModuleC?.check_H_pass;
        const okD = resData.ModuleD?.trucI?.check_fatigue_pass;
        const okE = resData.ModuleE?.check_key_pass;
        const okF = resData.ModuleF?.check_bearing_pass;

        const passed = okA && okB && okC && okD && okE && okF;
        setLiveCheckPassed(passed);
        
        if (designPayload.warning) {
          setLiveWarnings(designPayload.warning.split(' | '));
        } else {
          setLiveWarnings([]);
        }

        setLatestCalcRef({
          project: savePayload.data,
          kinematics: kinPayload.data,
          designResult: resData,
          warning: designPayload.warning
        });
      } catch (err) {
        setLiveCheckPassed(false);
        setLiveWarnings([err.message || 'Lỗi kiểm nghiệm thông số']);
      } finally {
        setIsLiveCalculating(false);
      }
    };
    run();
  }, [debouncedForm]);

  const handleApplyChanges = () => {
    if (!latestCalcRef) return;
    onProjectSaved?.(latestCalcRef.project);
    onKinematicsSaved?.(latestCalcRef.kinematics);
    setResults(latestCalcRef.designResult);
    setErrorMessage(latestCalcRef.warning || '');
    setActiveModule(correctionTarget || 'A');
    setShowEditModal(false);
  };

  const handleApplySuggestion = () => {
    const res = latestCalcRef?.designResult;
    if (!res) return;
    if (correctionTarget === 'A') {
      const val = res.ModuleA?.recommended_P;
      if (val != null) {
        setEditForm(prev => ({ ...prev, input_P: val.toString() }));
      }
    } else if (correctionTarget === 'B') {
      const val = res.ModuleB?.recommended_material_id;
      if (val != null) {
        setEditForm(prev => ({ ...prev, selected_material_id: val.toString() }));
      }
      const valModule = res.ModuleB?.recommended_m_e;
      if (valModule != null) {
        setEditForm(prev => ({ ...prev, m_e_I: valModule.toString() }));
      }
    } else if (correctionTarget === 'D') {
      const val = res.ModuleD?.trucI?.recommended_d_tc;
      if (val != null) {
        setEditForm(prev => ({ ...prev, d_tc_I: val.toString() }));
      }
    } else if (correctionTarget === 'E') {
      const val = res.ModuleE?.recommended_l;
      if (val != null) {
        setEditForm(prev => ({ ...prev, key_l: val.toString() }));
      }
    } else if (correctionTarget === 'F') {
      const val = res.ModuleF?.recommended_d_tc;
      if (val != null) {
        setEditForm(prev => ({ ...prev, d_tc_I: val.toString() }));
      }
    }
  };

  const handleRun = async () => {
    if (!activeProject?.id) {
      setErrorMessage('Không tìm thấy dự án. Vui lòng quay lại và chọn dự án.');
      return;
    }
    setIsRunning(true);
    setErrorMessage('');
    setResults(null);
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${activeProject.id}/design/calculate`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.status === 'error') {
        throw new Error(payload?.message || `Lỗi máy chủ (${response.status})`);
      }
      setResults(payload.data);
      setActiveModule('A');
      if (payload?.warning) {
        setErrorMessage(payload.warning);
      } else {
        setErrorMessage('');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Không thể kết nối đến máy chủ.');
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

  const getModuleOk = (m) => {
    if (!results) return false;
    if (m === 'A') return results.ModuleA?.check_s_pass && results.ModuleA?.check_H_pass;
    if (m === 'B') return results.ModuleB?.check_H_pass;
    if (m === 'C') return results.ModuleC?.check_H_pass;
    if (m === 'D') return results.ModuleD?.trucI?.check_fatigue_pass;
    if (m === 'E') return results.ModuleE?.check_key_pass;
    if (m === 'F') return results.ModuleF?.check_bearing_pass;
    return false;
  };

  // Helper inside modal to check dynamic modules status during preview
  const getLiveModuleOk = (m) => {
    if (!latestCalcRef?.designResult) return false;
    const res = latestCalcRef.designResult;
    if (m === 'A') return res.ModuleA?.check_s_pass && res.ModuleA?.check_H_pass;
    if (m === 'B') return res.ModuleB?.check_H_pass;
    if (m === 'C') return res.ModuleC?.check_H_pass;
    if (m === 'D') return res.ModuleD?.trucI?.check_fatigue_pass;
    if (m === 'E') return res.ModuleE?.check_key_pass;
    if (m === 'F') return res.ModuleF?.check_bearing_pass;
    return false;
  };

  const isAllOk = results && ['A', 'B', 'C', 'D', 'E', 'F'].every(getModuleOk);

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/10 border border-emerald-500/20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Thiết kế hoàn tất!</h2>
          <p className="text-slate-500 mt-2 text-base max-w-md mx-auto">Tất cả chi tiết máy đã đạt tiêu chuẩn kỹ thuật an toàn. Bạn có thể tiến hành xem tóm tắt hoặc xuất báo cáo.</p>
        </div>
        <div className="flex gap-4 pt-4 flex-wrap justify-center">
          <button
            onClick={() => setShowSuccess(false)}
            className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-premium shadow-sm text-sm"
          >
            ← Quay lại kiểm tra
          </button>
          <button
            onClick={() => onNavigate('summary')}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:scale-[1.02] shadow-lg shadow-blue-500/20 transition-premium flex items-center gap-2 text-sm"
          >
            Xem tóm tắt &amp; Xuất file
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    );
  }

  // Find selected material label
  const activeMaterial = materials.find(m => m.id === activeProject?.selected_material_id);
  const activeMaterialLabel = activeMaterial ? activeMaterial.grade_name : 'Thép 45';

  return (
    <div className="space-y-6">
      {/* Back button */}
      {onGoBack && (
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-slate-500 font-bold text-xs hover:bg-slate-50 hover:text-slate-800 shadow-sm transition-premium w-fit"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          QUAY LẠI CHỌN ĐỘNG CƠ
        </button>
      )}

      {/* Run Panel */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-extrabold text-slate-800 flex items-center gap-2 font-heading text-lg">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
              Thiết kế chi tiết máy (UC-05)
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-semibold">
              Dự án: <span className="text-slate-700 font-bold">{activeProject?.name || '—'}</span>
              &nbsp;·&nbsp; Vật liệu: <span className="text-blue-600 font-bold">{activeMaterialLabel}</span>
              &nbsp;·&nbsp; Công suất: <span className="text-slate-700 font-bold">{activeProject?.input_P} kW</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setCorrectionTarget(null);
                setShowAllFields(true);
                setShowEditModal(true);
              }}
              className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-850 transition-premium shadow-md text-xs flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Chỉnh sửa nhanh
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:scale-[1.02] shadow-lg shadow-blue-500/15 transition-premium flex items-center gap-1.5 disabled:opacity-60 text-xs"
            >
              {isRunning
                ? <><svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Đang tính toán...</>
                : <>▶ Chạy Pipeline A → F</>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Main warnings alerts */}
      {errorMessage && (
        <div className="p-4 bg-rose-50/75 text-rose-700 rounded-2xl border border-rose-100 backdrop-blur-sm text-xs font-semibold flex flex-col gap-2.5 shadow-sm">
          {errorMessage.split(' | ').map((msg, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5 animate-ping"></span>
              <span>{msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder */}
      {!results && !isRunning && !errorMessage && (
        <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl p-16 text-center text-slate-400">
          <p className="font-bold text-base text-slate-700">Chưa có dữ liệu thiết kế</p>
          <p className="text-xs mt-1.5 font-medium text-slate-400">Nhấn &quot;Chạy Pipeline A → F&quot; hoặc &quot;Chỉnh sửa nhanh&quot; để thiết kế chi tiết máy.</p>
        </div>
      )}

      {/* Results grid */}
      {results && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar navigation */}
            <div className="bg-white rounded-3xl border border-slate-200/60 p-2 h-fit sticky top-20 shadow-sm space-y-1">
              {modules.map(m => (
                <button
                  key={m}
                  onClick={() => setActiveModule(m)}
                  className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl text-xs font-bold transition-premium ${
                    activeModule === m ? 'bg-blue-50 text-blue-600 font-extrabold' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate text-left font-heading">M. {m}: {moduleLabels[m]}</span>
                  <StatusBadge ok={getModuleOk(m)} />
                </button>
              ))}
            </div>

            {/* Display panel */}
            <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm animate-fade-in">
              {activeModule === 'A' && <ModuleA r={results.ModuleA} onOpenCorrection={() => handleOpenCorrection('A')} />}
              {activeModule === 'B' && <ModuleB r={results.ModuleB} onOpenCorrection={() => handleOpenCorrection('B')} />}
              {activeModule === 'C' && <ModuleC r={results.ModuleC} onOpenCorrection={() => handleOpenCorrection('C')} />}
              {activeModule === 'D' && <ModuleD r={results.ModuleD} onOpenCorrection={() => handleOpenCorrection('D')} />}
              {activeModule === 'E' && <ModuleE r={results.ModuleE} onOpenCorrection={() => handleOpenCorrection('E')} />}
              {activeModule === 'F' && <ModuleF r={results.ModuleF} onOpenCorrection={() => handleOpenCorrection('F')} />}
            </div>
          </div>

          {/* Master Design Confirm Button */}
          <div className="flex justify-center pt-8">
            <button
              disabled={!isAllOk}
              onClick={() => setShowSuccess(true)}
              className={`
                px-12 py-4 rounded-3xl font-black text-sm tracking-wider uppercase transition-all duration-300 transform shadow-xl flex items-center gap-3
                ${isAllOk
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-105 shadow-emerald-500/20 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Xác nhận &amp; Hoàn tất thiết kế
            </button>
          </div>
        </>
      )}

      {/* QUICK EDIT / CONTEXTUAL CORRECTION MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 font-heading text-lg">{currentConfig.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 font-semibold">Cập nhật và tính toán kiểm định chi tiết máy theo thời gian thực.</p>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-premium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Description/Explanation */}
            <div className="px-6 py-4 bg-blue-50/50 border-b border-slate-100 text-xs text-blue-800 leading-relaxed font-medium">
              💡 <strong>Gợi ý cơ học:</strong> {currentConfig.desc}
            </div>

            {/* Dynamic Inputs */}
            <div className="p-6 space-y-5 flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {/* Input P */}
                {(showAllFields || currentConfig.fields.includes('input_P')) && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Công suất P (kW)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.input_P}
                      onChange={(e) => setEditForm(prev => ({ ...prev, input_P: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-premium font-mono font-bold text-slate-800 text-sm"
                    />
                  </div>
                )}
                
                {/* Input n_ct */}
                {(showAllFields || currentConfig.fields.includes('input_n_ct')) && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số vòng quay n (v/p)</label>
                    <input
                      type="number"
                      value={editForm.input_n_ct}
                      onChange={(e) => setEditForm(prev => ({ ...prev, input_n_ct: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-premium font-mono font-bold text-slate-800 text-sm"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Input L */}
                {(showAllFields || currentConfig.fields.includes('input_L')) && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian phục vụ L (năm)</label>
                    <input
                      type="number"
                      value={editForm.input_L}
                      onChange={(e) => setEditForm(prev => ({ ...prev, input_L: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-premium font-mono font-bold text-slate-800 text-sm"
                    />
                  </div>
                )}

                {/* Selected Material */}
                {(showAllFields || currentConfig.fields.includes('selected_material_id')) && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vật liệu chế tạo</label>
                    <select
                      value={editForm.selected_material_id}
                      onChange={(e) => setEditForm(prev => ({ ...prev, selected_material_id: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-premium font-semibold text-slate-800 text-sm"
                    >
                      <option value="">-- Mặc định (Thép 45) --</option>
                      {materials.map(m => (
                        <option key={m.id} value={m.id}>{m.grade_name} (HB={m.HB}, σb={m.sigma_b}MPa)</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              
              {/* Overrides cho Module bánh răng */}
              <div className="grid grid-cols-2 gap-4">
                {(showAllFields || currentConfig.fields.includes('m_e_I')) && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Module bánh răng côn m_e (mm)</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="Tự động"
                      value={editForm.m_e_I}
                      onChange={(e) => setEditForm(prev => ({ ...prev, m_e_I: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-premium font-mono font-bold text-slate-800 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Overrides cho Trục & Then */}
              <div className="grid grid-cols-2 gap-4">
                {(showAllFields || currentConfig.fields.includes('d_tc_I')) && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đường kính trục d_tc (mm)</label>
                    <input
                      type="number"
                      value={editForm.d_tc_I}
                      placeholder="Tự động"
                      onChange={(e) => setEditForm(prev => ({ ...prev, d_tc_I: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-premium font-mono font-bold text-slate-800 text-sm"
                    />
                  </div>
                )}
                
                {(showAllFields || currentConfig.fields.includes('key_l')) && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chiều dài then l (mm)</label>
                    <input
                      type="number"
                      value={editForm.key_l}
                      placeholder="Tự động"
                      onChange={(e) => setEditForm(prev => ({ ...prev, key_l: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-premium font-mono font-bold text-slate-800 text-sm"
                    />
                  </div>
                )}
              </div>

              {(showAllFields || currentConfig.fields.includes('key_b')) && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Then b</label>
                    <input type="number" placeholder="Tự động" value={editForm.key_b} onChange={(e) => setEditForm(prev => ({ ...prev, key_b: e.target.value }))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none font-mono text-sm" />
                  </div>
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Then h</label>
                    <input type="number" placeholder="Tự động" value={editForm.key_h} onChange={(e) => setEditForm(prev => ({ ...prev, key_h: e.target.value }))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none font-mono text-sm" />
                  </div>
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Then t1</label>
                    <input type="number" placeholder="Tự động" value={editForm.key_t1} onChange={(e) => setEditForm(prev => ({ ...prev, key_t1: e.target.value }))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none font-mono text-sm" />
                  </div>
                </div>
              )}

              {/* Show All Fields Toggle Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAllFields(!showAllFields)}
                  className="text-xs text-blue-600 hover:underline font-bold transition-all focus:outline-none"
                >
                  {showAllFields ? '← Chỉ hiện gợi ý cần sửa' : '→ Xem tất cả thông số dự án'}
                </button>
              </div>

              {/* Status and warnings section */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                {/* Stepper Status Dots for all Modules A-F */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Độ ổn định hệ thống (Module A → F):</p>
                  <div className="grid grid-cols-6 gap-2">
                    {['A', 'B', 'C', 'D', 'E', 'F'].map(m => {
                      const ok = getLiveModuleOk(m);
                      return (
                        <div key={m} className={`p-2 rounded-2xl border text-center transition-all ${
                          ok ? 'bg-emerald-50 border-emerald-100/80 text-emerald-700' : 'bg-rose-50 border-rose-100/80 text-rose-700'
                        }`}>
                          <p className="text-[10px] font-extrabold font-heading">M.{m}</p>
                          <span className={`inline-block w-2 h-2 rounded-full mt-1 ${
                            ok ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-rose-500 shadow-sm shadow-rose-500/50 animate-pulse'
                          }`}></span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái kiểm tra thời gian thực:</span>

                  {isLiveCalculating ? (
                    <span className="flex items-center gap-1.5 text-xs text-blue-500 font-bold">
                      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                      Đang phân tích...
                    </span>
                  ) : (
                    <span>
                      {liveCheckPassed ? (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-extrabold border border-emerald-200">AN TOÀN - ĐẠT CHUẨN</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-extrabold border border-rose-200">KHÔNG ĐẠT - XUẤT HIỆN LỖI</span>
                      )}
                    </span>
                  )}
                </div>

                {(() => {
                  const moduleResult = latestCalcRef?.designResult?.[`Module${correctionTarget}`];
                  const recText = correctionTarget === 'D' 
                    ? latestCalcRef?.designResult?.ModuleD?.trucI?.recommendation 
                    : moduleResult?.recommendation;
                  
                  const hasSuggestion = 
                    (correctionTarget === 'A' && latestCalcRef?.designResult?.ModuleA?.recommended_P != null) ||
                    (correctionTarget === 'B' && (latestCalcRef?.designResult?.ModuleB?.recommended_material_id != null || latestCalcRef?.designResult?.ModuleB?.recommended_m_e != null)) ||
                    (correctionTarget === 'D' && latestCalcRef?.designResult?.ModuleD?.trucI?.recommended_d_tc != null) ||
                    (correctionTarget === 'E' && latestCalcRef?.designResult?.ModuleE?.recommended_l != null) ||
                    (correctionTarget === 'F' && latestCalcRef?.designResult?.ModuleF?.recommended_d_tc != null);

                  if (!recText) return null;

                  return (
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl mt-3 animate-fade-in flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                          <span>📌 Gợi ý tối ưu từ hệ thống:</span>
                        </p>
                        <p className="text-[11px] text-indigo-600 font-semibold leading-relaxed">{recText}</p>
                      </div>
                      {hasSuggestion && (
                        <button
                          type="button"
                          onClick={handleApplySuggestion}
                          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-200 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 shrink-0 self-end md:self-center"
                        >
                          ⚡ Áp dụng
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Warnings inside modal */}
                {liveWarnings.length > 0 && (
                  <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4 space-y-2 text-xs text-rose-700 font-medium">
                    {liveWarnings.map((w, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 mt-1.5"></span>
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>
                )}
                {liveCheckPassed && !isLiveCalculating && (
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-xs text-emerald-700 font-medium flex gap-2 items-center">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    <span>Tuyệt vời! Tất cả các module đã hoàn thành bước kiểm nghiệm an toàn.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer with actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-premium text-xs"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleApplyChanges}
                disabled={!liveCheckPassed || isLiveCalculating}
                className={`px-6 py-3 rounded-2xl font-bold text-xs transition-premium shadow-md shadow-blue-500/10 ${
                  liveCheckPassed && !isLiveCalculating
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Xác nhận &amp; Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MODULE PANELS — Map đúng key từ Backend
// ============================================================
function ModuleA({ r, onOpenCorrection }) {
  if (!r) return null;
  const passed = r.check_s_pass && r.check_H_pass;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="A" title="Bộ truyền Xích ống con lăn" tag="Trục III → Thùng trộn" />
      
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
        <span className="text-xs font-bold leading-relaxed">
          {passed ? 'Đạt điều kiện an toàn và bền tiếp xúc' : 'LỖI: Xích quá tải (vượt quá khả năng bền tiếp xúc hoặc hệ số an toàn mỏi)'}
        </span>
        {!passed && (
          <button
            onClick={onOpenCorrection}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm transition-premium flex items-center gap-1 shrink-0"
          >
            💡 Khắc phục nhanh
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Số răng z₁" value={r.z1} />
        <ResultCard label="Số răng z₂" value={r.z2} />
        <ResultCard label="Số mắt xích" value={r.x_links} />
        <ResultCard label="Bước xích p" value={fmt(r.p_mm)} unit="mm" highlight />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Khoảng cách trục a" value={fmt(r.a_mm)} unit="mm" />
        <ResultCard label="Vận tốc xích v" value={fmt(r.v_ms)} unit="m/s" />
        <ResultCard label="Hệ số an toàn s" value={fmt(r.s_safety)} />
        <ResultCard label="Ứng suất σH" value={fmt(r.sigma_H_MPa)} unit="MPa" highlight />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard label="Lực tác dụng lên trục Fr" value={fmt(r.Fr_N, 0)} unit="N" highlight />
        <div className="flex gap-4 items-center p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-1.5"><StatusBadge ok={r.check_s_pass} /><span className="text-[11px] font-bold text-slate-500">Bền mỏi (s)</span></div>
          <div className="flex items-center gap-1.5"><StatusBadge ok={r.check_H_pass} /><span className="text-[11px] font-bold text-slate-500">Tiếp xúc (σH)</span></div>
        </div>
      </div>
    </div>
  );
}

function ModuleB({ r, onOpenCorrection }) {
  if (!r) return null;
  const passed = r.check_H_pass;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="B" title="Bánh răng Côn (Cấp nhanh)" tag="Trục I → II" />

      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
        <span className="text-xs font-bold leading-relaxed">
          {passed
            ? `Đạt bền tiếp xúc: [σH] = ${fmt(r.sigma_H_allow_MPa)} MPa`
            : `KHÔNG ĐẠT bền tiếp xúc: σH (${fmt(r.sigmaH)} MPa) > [σH] (${fmt(r.sigma_H_allow_MPa)} MPa)`}
        </span>
        {!passed && (
          <button
            onClick={onOpenCorrection}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm transition-premium flex items-center gap-1 shrink-0"
          >
            💡 Khắc phục nhanh
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Số răng z₁" value={r.z1_gear} />
        <ResultCard label="Số răng z₂" value={r.z2_gear} />
        <ResultCard label="Module mₑ" value={fmt(r.m_e_mm)} unit="mm" highlight />
        <ResultCard label="Chiều dài côn Re" value={fmt(r.Re_mm)} unit="mm" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Đ.kính trung bình d_m1" value={fmt(r.d_m1_mm)} unit="mm" />
        <ResultCard label="Đ.kính trung bình d_m2" value={fmt(r.d_m2_mm)} unit="mm" />
        <ResultCard label="Chiều rộng b" value={fmt(r.b_mm, 0)} unit="mm" />
        <ResultCard label="[σH] cho phép" value={fmt(r.sigma_H_allow_MPa)} unit="MPa" />
      </div>
      <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Lực truyền xuống Module D (Trục)</p>
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label="Lực vòng Ft" value={fmt(r.Ft1_N, 0)} unit="N" highlight />
          <ResultCard label="Lực hướng tâm Fr" value={fmt(r.Fr1_N, 0)} unit="N" />
          <ResultCard label="Lực dọc trục Fa" value={fmt(r.Fa1_N, 0)} unit="N" />
        </div>
      </div>
    </div>
  );
}

function ModuleC({ r, onOpenCorrection }) {
  if (!r) return null;
  const passed = r.check_H_pass;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="C" title="Bánh răng Trụ (Cấp chậm)" tag="Trục II → III" />

      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
        <span className="text-xs font-bold leading-relaxed">
          {passed ? `Đạt bền tiếp xúc: a_w = ${fmt(r.a_w_mm)} mm` : 'KHÔNG ĐẠT bền tiếp xúc'}
        </span>
        {!passed && (
          <button
            onClick={onOpenCorrection}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm transition-premium flex items-center gap-1 shrink-0"
          >
            💡 Khắc phục nhanh
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="K.cách trục aw" value={fmt(r.a_w_mm)} unit="mm" highlight />
        <ResultCard label="Module m" value={fmt(r.m_tc_mm)} unit="mm" />
        <ResultCard label="Số răng z₁" value={r.z1_gear} />
        <ResultCard label="Số răng z₂" value={r.z2_gear} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Đường kính d₁" value={fmt(r.d1_mm)} unit="mm" />
        <ResultCard label="Đường kính d₂" value={fmt(r.d2_mm)} unit="mm" />
        <ResultCard label="Chiều rộng bw" value={fmt(r.b_w_mm, 0)} unit="mm" />
      </div>
      <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Lực truyền xuống Module D (Trục)</p>
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label="Lực vòng Ft" value={fmt(r.Ft2_N, 0)} unit="N" highlight />
          <ResultCard label="Lực hướng tâm Fr" value={fmt(r.Fr2_N, 0)} unit="N" />
          <ResultCard label="Lực dọc trục Fa" value={fmt(r.Fa2_N, 0)} unit="N" />
        </div>
      </div>
    </div>
  );
}

function ModuleD({ r, onOpenCorrection }) {
  if (!r) return null;
  const t = r.trucI;
  const passed = t?.check_fatigue_pass;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="D" title="Thiết kế Trục I" tag="Giải phương trình cân bằng + Kiểm mỏi" />
      
      {!passed && (
        <div className="p-4 rounded-2xl border bg-rose-50 border-rose-200 text-rose-700 flex items-center justify-between gap-4 mb-4">
          <span className="text-xs font-bold">LỖI: Hệ số an toàn bền mỏi của trục không đạt tiêu chuẩn (s &lt; 1.5)</span>
          <button
            onClick={onOpenCorrection}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm transition-premium flex items-center gap-1 shrink-0"
          >
            💡 Khắc phục nhanh
          </button>
        </div>
      )}

      <div className="overflow-x-auto border border-slate-200/60 rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-left">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Thông số kỹ thuật</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Giá trị</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-600">Đường kính sơ bộ d<sub>sb</sub></td>
              <td className="px-6 py-4 font-mono font-bold text-blue-600">{fmt(t?.d_sb_mm)} mm</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-600">Đường kính tiêu chuẩn d<sub>tc</sub></td>
              <td className="px-6 py-4"><span className="px-3.5 py-1.5 bg-blue-50 text-blue-600 font-extrabold rounded-xl border border-blue-100">{t?.d_tc_mm?.[0]} mm</span></td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-600">Moment uốn tổng hợp M<sub>j</sub></td>
              <td className="px-6 py-4 font-mono font-medium text-slate-700">{t?.M_j_Nmm?.[0]?.toLocaleString()} N.mm</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-600">Phản lực gối A (F<sub>rA</sub>)</td>
              <td className="px-6 py-4 font-mono font-medium text-slate-700">{fmt(t?.F_rA, 0)} N</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-600">Phản lực gối B (F<sub>rB</sub>)</td>
              <td className="px-6 py-4 font-mono font-medium text-slate-700">{fmt(t?.F_rB, 0)} N</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-600">Hệ số an toàn mỏi s</td>
              <td className={`px-6 py-4 font-mono font-bold ${t?.check_fatigue_pass ? 'text-emerald-600' : 'text-rose-600'}`}>
                {fmt(t?.s_fatigue)} <span className="text-xs text-slate-400 font-medium">(Yêu cầu ≥ 1.5)</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-600">Kiểm nghiệm độ bền mỏi</td>
              <td className="px-6 py-4"><StatusBadge ok={t?.check_fatigue_pass} /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-blue-50/50 border border-blue-100/80 p-4 rounded-2xl text-blue-700 text-xs font-semibold leading-relaxed">
        👉 <strong>Quy trình thiết kế:</strong> Đường kính sơ bộ d_sb tính theo công thức ứng suất xoắn cho phép, sau đó chọn đường kính tiêu chuẩn d_tc tương ứng và tính toán mô men uốn tổng hợp, phản lực gối đỡ để kiểm nghiệm hệ số an toàn mỏi (s ≥ 1.5).
      </div>
    </div>
  );
}

function ModuleE({ r, onOpenCorrection }) {
  if (!r) return null;
  const passed = r.check_key_pass;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="E" title="Kiểm nghiệm Then (Key)" tag="Dựa trên d_tc từ Module D" />
      
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
        <span className="text-xs font-bold leading-relaxed">
          {passed ? 'Đạt điều kiện bền dập và bền cắt' : 'LỖI: Then không đạt độ bền dập và cắt'}
        </span>
        {!passed && (
          <button
            onClick={onOpenCorrection}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm transition-premium flex items-center gap-1 shrink-0"
          >
            💡 Khắc phục nhanh
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ResultCard label="Chiều rộng b" value={r.b} unit="mm" />
        <ResultCard label="Chiều cao h" value={r.h} unit="mm" />
        <ResultCard label="Chiều dài then l_t" value={r.l_t_mm} unit="mm" highlight />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-5 rounded-2xl border transition-premium ${Number(r.sigma_d_MPa) <= r.sigma_d_allow ? 'bg-emerald-500/5 border-emerald-500/15' : 'bg-rose-500/5 border-rose-500/15'}`}>
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">Ứng suất dập σ<sub>d</sub></p>
          <p className="text-2xl font-black text-slate-800 font-heading">{fmt(r.sigma_d_MPa)} <span className="text-xs font-semibold text-slate-400">MPa</span></p>
          <p className="text-[10px] text-slate-500 mt-1 font-bold">Giới hạn bền dập cho phép: [σd] = {r.sigma_d_allow} MPa</p>
        </div>
        <div className={`p-5 rounded-2xl border transition-premium ${Number(r.tau_c_MPa) <= r.tau_c_allow ? 'bg-emerald-500/5 border-emerald-500/15' : 'bg-rose-500/5 border-rose-500/15'}`}>
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">Ứng suất cắt τ<sub>c</sub></p>
          <p className="text-2xl font-black text-slate-800 font-heading">{fmt(r.tau_c_MPa)} <span className="text-xs font-semibold text-slate-400">MPa</span></p>
          <p className="text-[10px] text-slate-500 mt-1 font-bold">Giới hạn bền cắt cho phép: [τc] = {r.tau_c_allow} MPa</p>
        </div>
      </div>
    </div>
  );
}

function ModuleF({ r, onOpenCorrection }) {
  if (!r) return null;
  const passed = r.check_bearing_pass;
  return (
    <div className="space-y-6">
      <ModuleHeader letter="F" title="Kiểm nghiệm Ổ lăn" tag="Ổ côn — Trục I" />
      
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
        <span className="text-xs font-bold leading-relaxed">
          {passed
            ? `Ổ ${r.bearing_code} đạt: C_catalog = ${fmt(r.C_catalog_kN)} kN ≥ Cd = ${fmt(r.C_d_kN)} kN`
            : `KHÔNG ĐẠT: Không tìm thấy ổ đạt chuẩn tải trọng (C_catalog < Cd)`}
        </span>
        {!passed && (
          <button
            onClick={onOpenCorrection}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm transition-premium flex items-center gap-1 shrink-0"
          >
            💡 Khắc phục nhanh
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ResultCard label="Mã hiệu ổ lăn" value={r.bearing_code} highlight />
        <ResultCard label="Tải trọng động C_d" value={fmt(r.C_d_kN)} unit="kN" />
        <ResultCard label="Khả năng tải Catalog" value={fmt(r.C_catalog_kN)} unit="kN" />
      </div>
      <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl text-slate-600 text-xs font-semibold leading-relaxed">
        👉 <strong>Kiểm định ổ lăn:</strong> Hệ thống tự động tra catalog tìm các vòng ổ đỡ có đường kính trong ăn khớp với ngõng trục, tính toán tải trọng động quy đổi C_d dựa trên tuổi thọ thiết kế (L_h) và vòng quay trục để chọn mã ổ đạt chuẩn an toàn.
      </div>
    </div>
  );
}
