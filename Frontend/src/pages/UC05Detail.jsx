import { useState, useMemo } from 'react';
import {
  MATERIAL_GRADES, STANDARD_MODULES, CHAIN_PARAMS,
  runPipeline
} from '../utils/uc05Engine';

// --- UI helpers ---
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

const ResultCard = ({ label, value, unit, highlight }) => (
  <div className={`p-4 rounded-xl border ${highlight ? 'bg-primary/5 border-primary/15' : 'bg-slate-50 border-slate-100'}`}>
    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">{label}</p>
    <p className={`text-xl font-black ${highlight ? 'text-primary' : 'text-slate-800'}`}>
      {value} {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
    </p>
  </div>
);

// ============================================================
export default function UC05Detail({ kinematicsResult }) {
  const data = kinematicsResult?.kinematics ?? null;

  const [material, setMaterial] = useState(MATERIAL_GRADES[1]); // Thép 40X
  const [bevelModule, setBevelModule] = useState(2.5);
  const [spurModule, setSpurModule] = useState(2.5);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [activeModule, setActiveModule] = useState('A');

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runPipeline({ kinematics: data, material, bevelModule, spurModule });
      setResults(res);
      setIsRunning(false);
    }, 900);
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

  return (
    <div className="space-y-6">
      {/* Config Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-primary rounded-full"></span>
          Cấu hình chung cho Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Vật liệu</label>
            <select
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-primary"
              value={material.name}
              onChange={e => setMaterial(MATERIAL_GRADES.find(m => m.name === e.target.value))}
            >
              {MATERIAL_GRADES.map(m => <option key={m.name} value={m.name}>{m.name} (HB {m.HB})</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Module côn m<sub>te</sub></label>
            <select
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-primary"
              value={bevelModule}
              onChange={e => setBevelModule(Number(e.target.value))}
            >
              {STANDARD_MODULES.map(m => <option key={m} value={m}>{m} mm</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Module trụ m<sub>tc</sub></label>
            <select
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:border-primary"
              value={spurModule}
              onChange={e => setSpurModule(Number(e.target.value))}
            >
              {STANDARD_MODULES.map(m => <option key={m} value={m}>{m} mm</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            {isRunning
              ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Đang chạy Pipeline...</>
              : <>&#9654; Chạy Pipeline A → F</>
            }
          </button>
        </div>
      </div>

      {!results && !isRunning && (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400">
          <p className="font-bold text-lg">Chưa có kết quả</p>
          <p className="text-sm mt-1">Cấu hình vật liệu &amp; module rồi nhấn &quot;Chạy Pipeline&quot; để bắt đầu.</p>
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Module Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2 h-fit sticky top-4">
            {modules.map(m => {
              const moduleResult = m === 'A' ? results.chain
                : m === 'B' ? results.bevel
                : m === 'C' ? results.spur
                : m === 'D' ? results.shafts.I
                : m === 'E' ? results.keys.I
                : results.bearings.I;
              const ok = moduleResult?.status === 'success';
              return (
                <button
                  key={m}
                  onClick={() => setActiveModule(m)}
                  className={`w-full flex items-center justify-between gap-2 p-3 rounded-lg text-sm transition-all mb-1 ${
                    activeModule === m ? 'bg-primary-light text-primary font-bold' : 'text-slate-500 hover:bg-slate-50'
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
            {activeModule === 'A' && <ModuleA r={results.chain} />}
            {activeModule === 'B' && <ModuleB r={results.bevel} />}
            {activeModule === 'C' && <ModuleC r={results.spur} />}
            {activeModule === 'D' && <ModuleD shafts={results.shafts} />}
            {activeModule === 'E' && <ModuleE keys={results.keys} />}
            {activeModule === 'F' && <ModuleF bearings={results.bearings} />}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MODULE PANELS
// ============================================================
function ModuleA({ r }) {
  return (
    <div className="space-y-6">
      <ModuleHeader letter="A" title="Bộ truyền Xích ống con lăn" tag="Trục III → Thùng trộn" />
      <div className={`p-4 rounded-xl border text-sm font-medium ${r.status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
        {r.note}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Số răng z₁" value={r.z1} />
        <ResultCard label="Số răng z₂" value={r.z2} />
        <ResultCard label="Số mắt xích x" value={r.x} />
        <ResultCard label="Bước xích p" value={r.p} unit="mm" highlight />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Khoảng cách trục a" value={r.a} unit="mm" />
        <ResultCard label="Hệ số an toàn s" value={r.s} />
        <ResultCard label="Ứng suất σH" value={r.sigmaH} unit="MPa" highlight />
        <ResultCard label="Lực tác dụng lên trục Fr" value={r.Fr} unit="N" highlight />
      </div>
    </div>
  );
}

function ModuleB({ r }) {
  return (
    <div className="space-y-6">
      <ModuleHeader letter="B" title="Bánh răng Côn (Cấp nhanh)" tag="Trục I → II" />
      <div className={`p-4 rounded-xl border text-sm font-medium ${r.status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}
        dangerouslySetInnerHTML={{ __html: r.message }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Số răng z₁" value={r.z1} />
        <ResultCard label="Số răng z₂" value={r.z2} />
        <ResultCard label="Module mte" value={r.m_te} unit="mm" highlight />
        <ResultCard label="Chiều dài côn Re" value={r.Re} unit="mm" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Đ.kính de₁" value={r.de1} unit="mm" />
        <ResultCard label="Chiều rộng b" value={r.b} unit="mm" />
        <ResultCard label="Ứng suất σH" value={r.sigmaH} unit="MPa" highlight />
        <ResultCard label="[σH] cho phép" value={r.sigma_H_allow} unit="MPa" />
      </div>
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Lực truyền xuống Module D (Trục)</p>
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label="Lực vòng Ft" value={r.Ft} unit="N" highlight />
          <ResultCard label="Lực hướng tâm Fr" value={r.Fr} unit="N" />
          <ResultCard label="Lực dọc trục Fa" value={r.Fa} unit="N" />
        </div>
      </div>
    </div>
  );
}

function ModuleC({ r }) {
  return (
    <div className="space-y-6">
      <ModuleHeader letter="C" title="Bánh răng Trụ (Cấp chậm)" tag="Trục II → III" />
      {r.warning && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-medium">
          ⚠️ {r.warning}
        </div>
      )}
      <div className={`p-4 rounded-xl border text-sm font-medium ${r.status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}
        dangerouslySetInnerHTML={{ __html: r.message }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="K.cách trục aw" value={r.aw} unit="mm" highlight />
        <ResultCard label="Module m" value={r.m} unit="mm" />
        <ResultCard label="Số răng z₁" value={r.z1} />
        <ResultCard label="Số răng z₂" value={r.z2} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard label="Đường kính d₁" value={r.d1} unit="mm" />
        <ResultCard label="Đường kính d₂" value={r.d2} unit="mm" />
        <ResultCard label="Chiều rộng bw" value={r.bw} unit="mm" />
        <ResultCard label="Ứng suất σH" value={r.sigmaH} unit="MPa" highlight />
      </div>
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Lực truyền xuống Module D (Trục)</p>
        <div className="grid grid-cols-3 gap-4">
          <ResultCard label="Lực vòng Ft" value={r.Ft} unit="N" highlight />
          <ResultCard label="Lực hướng tâm Fr" value={r.Fr} unit="N" />
          <ResultCard label="Lực dọc trục Fa" value={r.Fa} unit="N" />
        </div>
      </div>
    </div>
  );
}

function ModuleD({ shafts }) {
  return (
    <div className="space-y-6">
      <ModuleHeader letter="D" title="Thiết kế Trục I, II, III" tag="Giải phương trình cân bằng" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Trục</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">d<sub>sb</sub> (mm)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">M<sub>td</sub> (N.mm)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">d<sub>tc</sub> (mm)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Hệ số an toàn s</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Kết quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {['I', 'II', 'III'].map(id => {
              const s = shafts[id];
              return (
                <tr key={id} className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-slate-700">Trục {id}</td>
                  <td className="py-4 font-mono text-primary font-bold">{s.dsb}</td>
                  <td className="py-4 font-mono text-slate-600">{s.Mtd.toLocaleString()}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary font-black rounded-lg">{s.dtc} mm</span>
                  </td>
                  <td className="py-4 font-mono font-bold text-slate-700">{s.s}</td>
                  <td className="py-4"><StatusBadge ok={s.status === 'success'} /></td>
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
              const k = keys[id];
              if (k.status === 'error' && !k.b) return (
                <tr key={id}><td colSpan="6" className="py-4 text-red-500 text-center">{k.message}</td></tr>
              );
              return (
                <tr key={id} className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-slate-700">Trục {id}</td>
                  <td className="py-4 font-mono text-slate-600">{k.b}×{k.h}</td>
                  <td className="py-4 font-mono text-slate-600">{k.lt}</td>
                  <td className={`py-4 font-mono font-bold ${Number(k.sigma_d) > 100 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {k.sigma_d} <span className="text-[10px] text-slate-400">≤ 100</span>
                  </td>
                  <td className={`py-4 font-mono font-bold ${Number(k.tau_c) > 60 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {k.tau_c} <span className="text-[10px] text-slate-400">≤ 60</span>
                  </td>
                  <td className="py-4"><StatusBadge ok={k.status === 'success'} /></td>
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
  return (
    <div className="space-y-6">
      <ModuleHeader letter="F" title="Kiểm nghiệm Ổ lăn" tag="ISO 15 - Ổ bi đỡ một dãy" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left">
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Trục</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Mã ổ</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">d×D×B</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">C<sub>d</sub> (kN)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">C<sub>cat</sub> (kN)</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Kết quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {['I', 'II', 'III'].map(id => {
              const b = bearings[id];
              return (
                <tr key={id} className="hover:bg-slate-50">
                  <td className="py-4 font-bold text-slate-700">Trục {id}</td>
                  <td className="py-4 font-mono font-bold text-primary">{b.code}</td>
                  <td className="py-4 font-mono text-slate-600">{b.d}×{b.D}×{b.B}</td>
                  <td className="py-4 font-mono text-slate-600">{b.Cd}</td>
                  <td className={`py-4 font-mono font-bold ${b.status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>{b.C_cat}</td>
                  <td className="py-4"><StatusBadge ok={b.status === 'success'} /></td>
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
