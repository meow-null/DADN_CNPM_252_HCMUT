import { formatNumber } from '../utils/formatUtils';

export default function Summary({ onNavigate, activeProject, kinematicsResult }) {
  const kinematics = kinematicsResult?.kinematics;
  const design = activeProject?.design_result;
  const motor = activeProject?.motors || activeProject?.selected_motor_snapshot;

  const renderRow = (label, symbol, value, unit, ok = true) => (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-3 text-sm text-slate-700">{label}</td>
      <td className="px-6 py-3 font-mono text-slate-400">{symbol}</td>
      <td className="px-6 py-3 font-bold">{formatNumber(value) ?? '-'}</td>
      <td className="px-6 py-3 text-slate-400 text-sm">{unit}</td>
      <td className={`px-6 py-3 font-medium ${ok ? 'text-emerald-500' : 'text-red-500'}`}>
        {ok ? 'ĐẠT' : 'KHÔNG ĐẠT'}
      </td>
    </tr>
  );

  return (
    <section className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Bảng Tóm tắt Thông số Thiết kế</h2>
          <p className="text-slate-500">{activeProject ? `Dự án: ${activeProject.name}` : 'Chưa chọn dự án'}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => onNavigate('calculations')}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Quay lại Chi tiết máy
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
          >
            Lưu thiết kế & Xuất báo cáo
          </button>
        </div>
      </div>

      {/* THANH TIẾN ĐỘ */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-slate-700 uppercase tracking-widest">TIẾN ĐỘ DỰ ÁN</span>
          <span className="font-black text-primary text-xl">100% HOÀN THÀNH</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full shadow-inner"></div>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* THÔNG SỐ ĐẦU VÀO & VẬT LIỆU */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded"></span>
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest">1. THÔNG SỐ ĐẦU VÀO & VẬT LIỆU</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Thông số</th>
                <th className="px-6 py-3">Ký hiệu</th>
                <th className="px-6 py-3">Giá trị</th>
                <th className="px-6 py-3">Đơn vị</th>
                <th className="px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {renderRow('Công suất dẫn động yêu cầu', 'P_{ct}', activeProject?.input_P, 'kW', true)}
              {renderRow('Vòng quay máy công tác', 'n_{ct}', activeProject?.input_n_ct, 'rpm', true)}
              {renderRow('Thời gian phục vụ', 'L', activeProject?.input_L, 'năm', true)}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3 text-sm text-slate-700">Vật liệu chế tạo Bánh răng & Trục</td>
                <td className="px-6 py-3 font-mono text-slate-400">Material</td>
                <td className="px-6 py-3 font-bold text-primary">{design?.Material || 'Thép 45'}</td>
                <td className="px-6 py-3 text-slate-400 text-sm">-</td>
                <td className={`px-6 py-3 font-medium text-emerald-500`}>ĐẠT</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ĐỘNG CƠ & ĐỘNG HỌC */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded"></span>
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest">2. ĐỘNG CƠ & ĐỘNG HỌC</h3>
          </div>
          <table className="w-full text-left">
            <thead className="text-[11px] uppercase text-slate-400 font-bold bg-white">
              <tr>
                <th className="px-6 py-3">Chi tiết / Thông số</th>
                <th className="px-6 py-3">Ký hiệu</th>
                <th className="px-6 py-3">Giá trị</th>
                <th className="px-6 py-3">Đơn vị</th>
                <th className="px-6 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {renderRow('Mã động cơ chọn', 'Mã', motor?.code, '-', true)}
              {renderRow('Công suất động cơ', 'P_dm', motor?.P_dm, 'kW', true)}
              {renderRow('Vòng quay động cơ', 'n_dm', motor?.n_dm, 'v/p', true)}
              {renderRow('Tỷ số truyền chung', 'u_ch', kinematics?.u_ch_sb, '-', true)}
              {renderRow('Tỷ số truyền bộ truyền ngoài (Xích)', 'u_x', kinematics?.u_x_sb, '-', true)}
              {renderRow('Tỷ số truyền hộp giảm tốc', 'u_h', kinematics?.u_h_sb, '-', true)}
              {renderRow('Tỷ số truyền cấp nhanh (Côn)', 'u_1', kinematics?.u_1, '-', true)}
              {renderRow('Tỷ số truyền cấp chậm (Trụ)', 'u_2', kinematics?.u_2, '-', true)}
            </tbody>
          </table>
        </div>

        {/* BỘ TRUYỀN XÍCH */}
        {design?.ModuleA && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded"></span>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest">3. BỘ TRUYỀN NGOÀI (XÍCH)</h3>
            </div>
            <table className="w-full text-left">
              <thead className="text-[11px] uppercase text-slate-400 font-bold bg-white">
                <tr>
                  <th className="px-6 py-3">Chi tiết / Thông số</th>
                  <th className="px-6 py-3">Ký hiệu</th>
                  <th className="px-6 py-3">Giá trị</th>
                  <th className="px-6 py-3">Đơn vị</th>
                  <th className="px-6 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {renderRow('Bước xích', 'p', design.ModuleA.p_mm, 'mm', true)}
                {renderRow('Số răng đĩa xích nhỏ', 'z1', design.ModuleA.z1, 'răng', true)}
                {renderRow('Số răng đĩa xích lớn', 'z2', design.ModuleA.z2, 'răng', true)}
                {renderRow('Số dãy xích', 'strands', design.ModuleA.strands, 'dãy', true)}
                {renderRow('Khoảng cách trục', 'a', design.ModuleA.a_mm, 'mm', true)}
                {renderRow('Hệ số an toàn s', 's', design.ModuleA.s_safety, '-', design.ModuleA.check_s_pass)}
                {renderRow('Lực tác dụng lên trục', 'Fr', design.ModuleA.Fr_N, 'N', true)}
              </tbody>
            </table>
          </div>
        )}

        {/* BÁNH RĂNG CÔN */}
        {design?.ModuleB && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded"></span>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest">4. BỘ TRUYỀN TRONG (BÁNH RĂNG CÔN)</h3>
            </div>
            <table className="w-full text-left">
              <thead className="text-[11px] uppercase text-slate-400 font-bold bg-white">
                <tr>
                  <th className="px-6 py-3">Chi tiết / Thông số</th>
                  <th className="px-6 py-3">Ký hiệu</th>
                  <th className="px-6 py-3">Giá trị</th>
                  <th className="px-6 py-3">Đơn vị</th>
                  <th className="px-6 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {renderRow('Số răng bánh chủ động', 'z1', design.ModuleB.z1_gear, 'răng', true)}
                {renderRow('Số răng bánh bị động', 'z2', design.ModuleB.z2_gear, 'răng', true)}
                {renderRow('Module m_te', 'm_te', design.ModuleB.m_e_mm, 'mm', true)}
                {renderRow('Chiều dài côn ngoài', 'Re', design.ModuleB.Re_mm, 'mm', true)}
                {renderRow('Chiều rộng vành răng', 'b', design.ModuleB.b_mm, 'mm', true)}
                {renderRow('Đường kính vòng chia d1', 'd_m1', design.ModuleB.d_m1_mm, 'mm', true)}
                {renderRow('Lực vòng', 'Ft1', design.ModuleB.Ft1_N, 'N', true)}
                {renderRow('Lực dọc trục', 'Fa1', design.ModuleB.Fa1_N, 'N', true)}
                {renderRow('Lực hướng tâm', 'Fr1', design.ModuleB.Fr1_N, 'N', true)}
              </tbody>
            </table>
          </div>
        )}

        {/* BÁNH RĂNG TRỤ */}
        {design?.ModuleC && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded"></span>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest">5. BỘ TRUYỀN TRONG (BÁNH RĂNG TRỤ)</h3>
            </div>
            <table className="w-full text-left">
              <thead className="text-[11px] uppercase text-slate-400 font-bold bg-white">
                <tr>
                  <th className="px-6 py-3">Chi tiết / Thông số</th>
                  <th className="px-6 py-3">Ký hiệu</th>
                  <th className="px-6 py-3">Giá trị</th>
                  <th className="px-6 py-3">Đơn vị</th>
                  <th className="px-6 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {renderRow('Khoảng cách trục', 'a_w', design.ModuleC.a_w_mm, 'mm', true)}
                {renderRow('Module tiêu chuẩn', 'm', design.ModuleC.m_tc_mm, 'mm', true)}
                {renderRow('Số răng bánh chủ động', 'z1', design.ModuleC.z1_gear, 'răng', true)}
                {renderRow('Số răng bánh bị động', 'z2', design.ModuleC.z2_gear, 'răng', true)}
                {renderRow('Chiều rộng vành răng', 'bw', design.ModuleC.b_w_mm, 'mm', true)}
                {renderRow('Đường kính vòng chia d1', 'd1', design.ModuleC.d1_mm, 'mm', true)}
                {renderRow('Đường kính vòng chia d2', 'd2', design.ModuleC.d2_mm, 'mm', true)}
                {renderRow('Lực vòng', 'Ft2', design.ModuleC.Ft2_N, 'N', true)}
                {renderRow('Lực hướng tâm', 'Fr2', design.ModuleC.Fr2_N, 'N', true)}
              </tbody>
            </table>
          </div>
        )}

        {/* THÔNG SỐ TRỤC */}
        {design?.ModuleD && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded"></span>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest">6. THIẾT KẾ TRỤC (MÔ ĐUN D)</h3>
            </div>
            <table className="w-full text-left">
              <thead className="text-[11px] uppercase text-slate-400 font-bold bg-white">
                <tr>
                  <th className="px-6 py-3">Chi tiết / Thông số</th>
                  <th className="px-6 py-3">Ký hiệu</th>
                  <th className="px-6 py-3">Giá trị</th>
                  <th className="px-6 py-3">Đơn vị</th>
                  <th className="px-6 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {renderRow('Đường kính trục I', 'd_I', design.ModuleD.trucI.d_tc_mm[0], 'mm', design.ModuleD.trucI.s_fatigue >= 1.5)}
                {renderRow('Đường kính trục II', 'd_II', design.ModuleD.trucII.d_tc_mm[0], 'mm', design.ModuleD.trucII.s_fatigue >= 1.5)}
                {renderRow('Đường kính trục III', 'd_III', design.ModuleD.trucIII.d_tc_mm[0], 'mm', design.ModuleD.trucIII.s_fatigue >= 1.5)}
                {renderRow('Hệ số an toàn trục I', 's_I', design.ModuleD.trucI.s_fatigue, '-', design.ModuleD.trucI.s_fatigue >= 1.5)}
                {renderRow('Hệ số an toàn trục II', 's_II', design.ModuleD.trucII.s_fatigue, '-', design.ModuleD.trucII.s_fatigue >= 1.5)}
                {renderRow('Hệ số an toàn trục III', 's_III', design.ModuleD.trucIII.s_fatigue, '-', design.ModuleD.trucIII.s_fatigue >= 1.5)}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}