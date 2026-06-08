import { useState, useEffect } from 'react';
import { formatNumber } from '../utils/formatUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

export default function Catalog({ onNavigate, currentUser }) {
  const isAdmin = currentUser?.role === 'admin';
  const [activeTab, setActiveTab] = useState('motors'); // 'motors' | 'chains' | 'bearings'
  
  // Data list states
  const [items, setItems] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'inactive'

  // Modal CRUD states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' | 'edit'
  const [editingItem, setEditingItem] = useState(null);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    const timer = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4500);
    return () => clearTimeout(timer);
  };

  // Form states
  const [motorForm, setMotorForm] = useState({
    code: '',
    series: '',
    P_dm: '',
    n_dm: '',
    efficiency: '',
    cos_phi: '',
    t_start_ratio: '',
    t_max_ratio: '',
    mass_kg: '',
    price: ''
  });

  const [chainForm, setChainForm] = useState({
    pitch: '',
    breaking_load: '',
    mass_per_m: '',
    A_mm2: '',
    P_allow: '',
    n_ref: '',
    s_allow: ''
  });

  const [bearingForm, setBearingForm] = useState({
    code: '',
    type: 'tapered', // default to tapered bearings
    inner_d: '',
    outer_D: '',
    width_B: '',
    C: '',
    C0: '',
    Y: '',
    alpha_deg: '',
    e: ''
  });

  // Fetch Catalog data
  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const filters = {};
      
      // Search logic
      if (searchQuery.trim() !== '') {
        if (activeTab === 'chains') {
          // Chains don't have code, search by pitch number
          const pVal = parseFloat(searchQuery);
          if (!isNaN(pVal)) {
            filters.pitch = pVal;
          }
        } else {
          // Motors and Bearings have code
          filters.code = searchQuery.trim();
        }
      }

      // Active status logic
      if (activeFilter === 'active') {
        filters.is_active = true;
      } else if (activeFilter === 'inactive') {
        filters.is_active = false;
      } else if (activeFilter === 'deleted') {
        filters.isDeleted = true;
      }

      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: '10',
        filters: JSON.stringify(filters)
      });

      const response = await fetch(`${API_BASE_URL}/catalog/${activeTab}?${queryParams}`, {
        credentials: 'include'
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok || payload?.status === 'error') {
        throw new Error(payload?.message || 'Không thể tải dữ liệu thư viện.');
      }

      if (payload?.data) {
        setItems(payload.data.items || []);
        setTotalItem(payload.data.totalItem || 0);
        setTotalPage(payload.data.totalPage || 1);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi kết nối máy chủ.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Reload data when tab, page, query, or filter changes
  useEffect(() => {
    fetchData();
  }, [activeTab, page, activeFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle Tab Switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setSearchQuery('');
    setActiveFilter('all');
  };

  // Modal Open Handlers
  const handleOpenCreate = () => {
    setModalType('create');
    setEditingItem(null);
    setFormError('');
    
    // Reset forms
    setMotorForm({
      code: '', series: '', P_dm: '', n_dm: '', efficiency: '', cos_phi: '',
      t_start_ratio: '', t_max_ratio: '', mass_kg: '', price: ''
    });
    setChainForm({
      pitch: '', breaking_load: '', mass_per_m: '', A_mm2: '',
      P_allow: '', n_ref: '200', s_allow: '8.5'
    });
    setBearingForm({
      code: '', type: 'tapered', inner_d: '', outer_D: '', width_B: '',
      C: '', C0: '', Y: '', alpha_deg: '15', e: '0.35'
    });
    
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setModalType('edit');
    setEditingItem(item);
    setFormError('');
    
    // Fill forms based on category
    if (activeTab === 'motors') {
      setMotorForm({
        code: item.code || '',
        series: item.series || '',
        P_dm: item.P_dm != null ? item.P_dm.toString() : '',
        n_dm: item.n_dm != null ? item.n_dm.toString() : '',
        efficiency: item.efficiency != null ? item.efficiency.toString() : '',
        cos_phi: item.cos_phi != null ? item.cos_phi.toString() : '',
        t_start_ratio: item.t_start_ratio != null ? item.t_start_ratio.toString() : '',
        t_max_ratio: item.t_max_ratio != null ? item.t_max_ratio.toString() : '',
        mass_kg: item.mass_kg != null ? item.mass_kg.toString() : '',
        price: item.price != null ? item.price.toString() : ''
      });
    } else if (activeTab === 'chains') {
      setChainForm({
        pitch: item.pitch != null ? item.pitch.toString() : '',
        breaking_load: item.breaking_load != null ? item.breaking_load.toString() : '',
        mass_per_m: item.mass_per_m != null ? item.mass_per_m.toString() : '',
        A_mm2: item.A_mm2 != null ? item.A_mm2.toString() : '',
        P_allow: item.P_allow != null ? item.P_allow.toString() : '',
        n_ref: item.n_ref != null ? item.n_ref.toString() : '',
        s_allow: item.s_allow != null ? item.s_allow.toString() : ''
      });
    } else if (activeTab === 'bearings') {
      setBearingForm({
        code: item.code || '',
        type: item.type || 'tapered',
        inner_d: item.inner_d != null ? item.inner_d.toString() : '',
        outer_D: item.outer_D != null ? item.outer_D.toString() : '',
        width_B: item.width_B != null ? item.width_B.toString() : '',
        C: item.C != null ? item.C.toString() : '',
        C0: item.C0 != null ? item.C0.toString() : '',
        Y: item.Y != null ? item.Y.toString() : '',
        alpha_deg: item.alpha_deg != null ? item.alpha_deg.toString() : '',
        e: item.e != null ? item.e.toString() : ''
      });
    }
    
    setShowModal(true);
  };

  // Toggle Active handler (Soft Delete UI option)
  const handleToggleActive = async (item) => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalog/${activeTab}/${item.id}/toggle-active`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.status === 'error') {
        throw new Error(payload?.message || 'Thao tác thay đổi trạng thái thất bại.');
      }
      fetchData();
      const label = activeTab === 'motors' ? `động cơ ${item.code}` : activeTab === 'bearings' ? `ổ lăn ${item.code}` : `bước xích ${item.pitch}mm`;
      showToastMsg(`Đã ${item.is_active ? 'ẩn' : 'kích hoạt'} thành công ${label}!`);
    } catch (err) {
      showToastMsg(err.message, 'error');
    }
  };

  // Hard Delete / Archive handler (opens confirmation modal)
  const handleOpenDelete = (item) => {
    setDeletingItem(item);
    setDeleteError('');
    setShowDeleteModal(true);
  };

  const executeDelete = async () => {
    if (!deletingItem) return;
    setDeleteSubmitting(true);
    setDeleteError('');
    try {
      const response = await fetch(`${API_BASE_URL}/catalog/${activeTab}/${deletingItem.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.status === 'error') {
        throw new Error(payload?.message || 'Xóa linh kiện thất bại.');
      }
      setShowDeleteModal(false);
      const label = activeTab === 'motors' ? `động cơ ${deletingItem.code}` : activeTab === 'bearings' ? `ổ lăn ${deletingItem.code}` : `bước xích ${deletingItem.pitch}mm`;
      setDeletingItem(null);
      fetchData();
      showToastMsg(`Đã xóa thành công ${label} khỏi cơ sở dữ liệu!`);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const handleRestore = async (item) => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalog/${activeTab}/${item.id}/restore`, {
        method: 'PATCH',
        credentials: 'include'
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.status === 'error') {
        throw new Error(payload?.message || 'Khôi phục linh kiện thất bại.');
      }
      fetchData();
      const label = activeTab === 'motors' ? `động cơ ${item.code}` : activeTab === 'bearings' ? `ổ lăn ${item.code}` : `bước xích ${item.pitch}mm`;
      showToastMsg(`Đã khôi phục thành công ${label} vào thư viện!`, 'success');
    } catch (err) {
      showToastMsg(err.message, 'error');
    }
  };

  // Submit Handler for Modal Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    
    try {
      let bodyData = {};
      
      // Parse & Validate inputs
      if (activeTab === 'motors') {
        if (!motorForm.code || !motorForm.P_dm || !motorForm.n_dm) {
          throw new Error('Vui lòng điền các trường bắt buộc (*): Mã động cơ, Công suất, Vòng quay');
        }
        bodyData = {
          code: motorForm.code.trim(),
          series: motorForm.series.trim() || null,
          P_dm: parseFloat(motorForm.P_dm),
          n_dm: parseInt(motorForm.n_dm),
          efficiency: motorForm.efficiency ? parseFloat(motorForm.efficiency) : null,
          cos_phi: motorForm.cos_phi ? parseFloat(motorForm.cos_phi) : null,
          t_start_ratio: motorForm.t_start_ratio ? parseFloat(motorForm.t_start_ratio) : null,
          t_max_ratio: motorForm.t_max_ratio ? parseFloat(motorForm.t_max_ratio) : null,
          mass_kg: motorForm.mass_kg ? parseFloat(motorForm.mass_kg) : null,
          price: motorForm.price ? parseFloat(motorForm.price) : null
        };
      } else if (activeTab === 'chains') {
        if (!chainForm.pitch) {
          throw new Error('Vui lòng điền các trường bắt buộc (*): Bước xích');
        }
        bodyData = {
          pitch: parseFloat(chainForm.pitch),
          breaking_load: chainForm.breaking_load ? parseFloat(chainForm.breaking_load) : null,
          mass_per_m: chainForm.mass_per_m ? parseFloat(chainForm.mass_per_m) : null,
          A_mm2: chainForm.A_mm2 ? parseFloat(chainForm.A_mm2) : null,
          P_allow: chainForm.P_allow ? parseFloat(chainForm.P_allow) : null,
          n_ref: chainForm.n_ref ? parseInt(chainForm.n_ref) : null,
          s_allow: chainForm.s_allow ? parseFloat(chainForm.s_allow) : null
        };
      } else if (activeTab === 'bearings') {
        if (!bearingForm.code || !bearingForm.inner_d || !bearingForm.outer_D || !bearingForm.width_B) {
          throw new Error('Vui lòng điền các trường bắt buộc (*): Mã ổ lăn, Đường kính trong, Đường kính ngoài, Chiều rộng');
        }
        bodyData = {
          code: bearingForm.code.trim(),
          type: bearingForm.type.trim() || 'tapered',
          inner_d: parseFloat(bearingForm.inner_d),
          outer_D: parseFloat(bearingForm.outer_D),
          width_B: parseFloat(bearingForm.width_B),
          C: bearingForm.C ? parseFloat(bearingForm.C) : null,
          C0: bearingForm.C0 ? parseFloat(bearingForm.C0) : null,
          Y: bearingForm.Y ? parseFloat(bearingForm.Y) : null,
          alpha_deg: bearingForm.alpha_deg ? parseFloat(bearingForm.alpha_deg) : null,
          e: bearingForm.e ? parseFloat(bearingForm.e) : null
        };
      }

      const url = modalType === 'create' 
        ? `${API_BASE_URL}/catalog/${activeTab}`
        : `${API_BASE_URL}/catalog/${activeTab}/${editingItem.id}`;

      const method = modalType === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.status === 'error') {
        throw new Error(payload?.message || 'Lỗi xử lý dữ liệu.');
      }

      setShowModal(false);
      fetchData();
      const label = activeTab === 'motors' ? `động cơ ${bodyData.code}` : activeTab === 'bearings' ? `ổ lăn ${bodyData.code}` : `bước xích ${bodyData.pitch}mm`;
      showToastMsg(
        modalType === 'create'
          ? `Đã thêm mới thành công ${label} vào thư viện!`
          : `Đã cập nhật thành công thông số cho ${label}!`,
        'success'
      );
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-800 font-heading tracking-tight">Thư viện Linh kiện</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Tra cứu và quản trị cơ sở dữ liệu động cơ, đĩa xích, và vòng ổ lăn tiêu chuẩn.
          </p>
        </div>
        
        {/* Role status badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Quyền của bạn:</span>
          {isAdmin ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-700 border border-rose-250/20 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              Quản trị viên (Admin)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-700 border border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Đọc dữ liệu (Read-only)
            </span>
          )}
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold uppercase tracking-wider mb-4">
        <button 
          onClick={() => handleTabChange('motors')} 
          className={`pb-3 transition-all ${activeTab === 'motors' ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold scale-105' : 'text-slate-400 hover:text-slate-600'}`}
        >
          🔌 Động cơ điện
        </button>
        <button 
          onClick={() => handleTabChange('chains')} 
          className={`pb-3 transition-all ${activeTab === 'chains' ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold scale-105' : 'text-slate-400 hover:text-slate-600'}`}
        >
          ⛓️ Xích ống con lăn
        </button>
        <button 
          onClick={() => handleTabChange('bearings')} 
          className={`pb-3 transition-all ${activeTab === 'bearings' ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold scale-105' : 'text-slate-400 hover:text-slate-600'}`}
        >
          🌀 Ổ lăn côn
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-200/60 p-4 rounded-3xl shadow-sm">
        <div className="flex flex-1 w-full gap-3 flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-premium font-semibold text-slate-800 text-xs"
              placeholder={activeTab === 'chains' ? "Tìm kiếm theo bước xích (ví dụ: 19.05)" : "Tìm kiếm theo mã linh kiện..."}
            />
          </div>

          {/* Active status filter */}
          <select
            value={activeFilter}
            onChange={(e) => { setActiveFilter(e.target.value); setPage(1); }}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl outline-none text-xs font-bold text-slate-600 transition-premium cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Kích hoạt</option>
            <option value="inactive">Đang ẩn</option>
            {isAdmin && <option value="deleted">Đã xóa</option>}
          </select>
        </div>

        {/* Add new button (Admin only) */}
        {isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:scale-[1.02] shadow-md shadow-blue-500/15 transition-premium flex items-center justify-center gap-1.5 text-xs shrink-0"
          >
            ➕ Thêm linh kiện mới
          </button>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-xs font-semibold">
          Lỗi: {errorMsg}
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden min-h-[250px] flex flex-col justify-between">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
              <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
              <p className="text-xs font-bold animate-pulse">Đang tải dữ liệu thư viện...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="font-bold text-sm text-slate-600">Không tìm thấy linh kiện nào</p>
              <p className="text-[11px] mt-1 font-semibold">Vui lòng điều chỉnh từ khóa tìm kiếm hoặc bộ lọc.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs font-semibold">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-extrabold uppercase tracking-widest text-[9px]">
                {activeTab === 'motors' && (
                  <tr>
                    <th className="px-6 py-4 pl-8">Mã động cơ</th>
                    <th className="px-6 py-4">Dòng máy (Series)</th>
                    <th className="px-6 py-4">Công suất P_dm (kW)</th>
                    <th className="px-6 py-4">Vòng quay n_dm (rpm)</th>
                    <th className="px-6 py-4">Hiệu suất / cos φ</th>
                    <th className="px-6 py-4">Giá thành</th>
                    <th className="px-6 py-4 text-center">Trạng thái</th>
                    {isAdmin && <th className="px-6 py-4 text-center pr-8">Hành động</th>}
                  </tr>
                )}
                {activeTab === 'chains' && (
                  <tr>
                    <th className="px-6 py-4 pl-8">Bước xích p (mm)</th>
                    <th className="px-6 py-4">Tải trọng phá hủy Q (kN)</th>
                    <th className="px-6 py-4">Khối lượng (kg/m)</th>
                    <th className="px-6 py-4">Diện tích xích A (mm²)</th>
                    <th className="px-6 py-4">P_allow (kW)</th>
                    <th className="px-6 py-4">Vòng quay chuẩn n_ref</th>
                    <th className="px-6 py-4 text-center">Trạng thái</th>
                    {isAdmin && <th className="px-6 py-4 text-center pr-8">Hành động</th>}
                  </tr>
                )}
                {activeTab === 'bearings' && (
                  <tr>
                    <th className="px-6 py-4 pl-8">Mã ổ lăn</th>
                    <th className="px-6 py-4">Loại ổ</th>
                    <th className="px-6 py-4">Đường kính trong d (mm)</th>
                    <th className="px-6 py-4">Đường kính ngoài D (mm)</th>
                    <th className="px-6 py-4">Chiều rộng B (mm)</th>
                    <th className="px-6 py-4">Tải động C / Tĩnh C0 (kN)</th>
                    <th className="px-6 py-4">Hệ số Y / e</th>
                    <th className="px-6 py-4 text-center">Trạng thái</th>
                    {isAdmin && <th className="px-6 py-4 text-center pr-8">Hành động</th>}
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-premium">
                    {/* MOTORS RENDER */}
                    {activeTab === 'motors' && (
                      <>
                        <td className="px-6 py-3.5 pl-8 font-bold text-slate-800 font-mono">{item.code}</td>
                        <td className="px-6 py-3.5 text-slate-500 font-semibold">{item.series || '—'}</td>
                        <td className="px-6 py-3.5 font-bold text-blue-600 font-mono">{Number(item.P_dm).toFixed(2)} kW</td>
                        <td className="px-6 py-3.5 font-mono">{item.n_dm}</td>
                        <td className="px-6 py-3.5 text-slate-500 font-mono">
                          {item.efficiency ? `${(Number(item.efficiency)*100).toFixed(0)}%` : '—'} / {item.cos_phi ? Number(item.cos_phi).toFixed(2) : '—'}
                        </td>
                        <td className="px-6 py-3.5 font-mono font-bold text-emerald-600">
                          {item.price ? `${formatNumber(item.price)} đ` : 'Liên hệ'}
                        </td>
                      </>
                    )}

                    {/* CHAINS RENDER */}
                    {activeTab === 'chains' && (
                      <>
                        <td className="px-6 py-3.5 pl-8 font-bold text-slate-800 font-mono">{Number(item.pitch).toFixed(2)} mm</td>
                        <td className="px-6 py-3.5 font-mono text-slate-600">{item.breaking_load ? `${Number(item.breaking_load).toFixed(1)} kN` : '—'}</td>
                        <td className="px-6 py-3.5 font-mono text-slate-500">{item.mass_per_m ? `${Number(item.mass_per_m).toFixed(2)} kg/m` : '—'}</td>
                        <td className="px-6 py-3.5 font-mono">{item.A_mm2 ? `${Number(item.A_mm2).toFixed(0)} mm²` : '—'}</td>
                        <td className="px-6 py-3.5 font-bold text-blue-600 font-mono">{item.P_allow ? `${Number(item.P_allow).toFixed(2)} kW` : '—'}</td>
                        <td className="px-6 py-3.5 font-mono text-slate-500">{item.n_ref || '—'} rpm</td>
                      </>
                    )}

                    {/* BEARINGS RENDER */}
                    {activeTab === 'bearings' && (
                      <>
                        <td className="px-6 py-3.5 pl-8 font-bold text-slate-800 font-mono">{item.code}</td>
                        <td className="px-6 py-3.5 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">{item.type || 'Tapered'}</td>
                        <td className="px-6 py-3.5 font-bold text-blue-600 font-mono">d = {Number(item.inner_d).toFixed(0)} mm</td>
                        <td className="px-6 py-3.5 font-mono">D = {Number(item.outer_D).toFixed(0)} mm</td>
                        <td className="px-6 py-3.5 font-mono">B = {Number(item.width_B).toFixed(0)} mm</td>
                        <td className="px-6 py-3.5 font-mono text-slate-600">
                          {item.C ? `${Number(item.C).toFixed(1)} kN` : '—'} / {item.C0 ? `${Number(item.C0).toFixed(1)} kN` : '—'}
                        </td>
                        <td className="px-6 py-3.5 text-slate-500 font-mono">
                          Y = {item.Y ? Number(item.Y).toFixed(3) : '—'} / e = {item.e ? Number(item.e).toFixed(2) : '—'}
                        </td>
                      </>
                    )}

                    {/* STATUS BADGE */}
                    <td className="px-6 py-3.5 text-center">
                      {activeFilter === 'deleted' ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-[9px] font-extrabold uppercase">
                          <span className="w-1 h-1 rounded-full bg-rose-500"></span>
                          Đã xóa
                        </span>
                      ) : item.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[9px] font-extrabold uppercase">
                          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                          Hiện
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 text-slate-400 border border-slate-200 rounded-full text-[9px] font-extrabold uppercase">
                          <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                          Ẩn
                        </span>
                      )}
                    </td>

                    {/* ACTIONS (Admin only) */}
                    {isAdmin && (
                      <td className="px-6 py-3.5 text-center pr-8">
                        {activeFilter === 'deleted' ? (
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-[10px] hover:scale-[1.02] shadow-sm shadow-emerald-500/15 transition-premium flex items-center justify-center gap-1 mx-auto"
                            title="Khôi phục linh kiện"
                          >
                            🔄 Phục hồi
                          </button>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-premium"
                              title="Sửa thông số"
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleActive(item)}
                              className={`p-1 rounded-lg transition-premium ${item.is_active ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                              title={item.is_active ? "Vô hiệu hóa (Ẩn)" : "Kích hoạt (Hiện)"}
                            >
                              👁️
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDelete(item)}
                              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-premium"
                              title="Xóa linh kiện"
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination bar */}
        {totalPage > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Tổng số: {totalItem} linh kiện
            </span>
            <div className="flex items-center gap-3">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                className="px-3.5 py-1.5 border border-slate-200 rounded-xl font-bold text-xs bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-premium shadow-sm"
              >
                ← Trước
              </button>
              <span className="text-xs font-extrabold text-slate-700 font-mono">
                Trang {page} / {totalPage}
              </span>
              <button
                disabled={page >= totalPage || loading}
                onClick={() => setPage(prev => Math.min(totalPage, prev + 1))}
                className="px-3.5 py-1.5 border border-slate-200 rounded-xl font-bold text-xs bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-premium shadow-sm"
              >
                Sau →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CRUD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden relative border border-slate-100 animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setShowModal(false)}>
              ❌
            </button>
            
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-800 font-heading">
                {modalType === 'create' ? '➕ THÊM LINH KIỆN MỚI' : '✏️ CẬP NHẬT THÔNG SỐ'}
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                Linh kiện: {activeTab === 'motors' ? 'Động cơ điện' : activeTab === 'bearings' ? 'Vòng ổ lăn côn' : 'Xích ống con lăn'}
              </p>
            </div>

            <form onSubmit={handleSubmitForm}>
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                {formError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-[11px] font-semibold leading-relaxed">
                    ⚠️ {formError}
                  </div>
                )}

                {/* MOTORS FIELDS */}
                {activeTab === 'motors' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mã động cơ (*)</label>
                      <input
                        type="text" required
                        value={motorForm.code}
                        onChange={e => setMotorForm(prev => ({ ...prev, code: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800"
                        placeholder="Ví dụ: 4A100S2Y"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Series</label>
                      <input
                        type="text"
                        value={motorForm.series}
                        onChange={e => setMotorForm(prev => ({ ...prev, series: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800"
                        placeholder="Ví dụ: 4A"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Công suất P_dm (kW) (*)</label>
                      <input
                        type="number" step="any" required
                        value={motorForm.P_dm}
                        onChange={e => setMotorForm(prev => ({ ...prev, P_dm: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 3.0"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tốc độ n_dm (rpm) (*)</label>
                      <input
                        type="number" required
                        value={motorForm.n_dm}
                        onChange={e => setMotorForm(prev => ({ ...prev, n_dm: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 1420"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hiệu suất (0 - 1.0)</label>
                      <input
                        type="number" step="any" min="0" max="1"
                        value={motorForm.efficiency}
                        onChange={e => setMotorForm(prev => ({ ...prev, efficiency: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 0.82"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">cos φ (0 - 1.0)</label>
                      <input
                        type="number" step="any" min="0" max="1"
                        value={motorForm.cos_phi}
                        onChange={e => setMotorForm(prev => ({ ...prev, cos_phi: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 0.83"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Khối lượng (kg)</label>
                      <input
                        type="number" step="any"
                        value={motorForm.mass_kg}
                        onChange={e => setMotorForm(prev => ({ ...prev, mass_kg: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 32"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Giá thành (đ)</label>
                      <input
                        type="number" step="any"
                        value={motorForm.price}
                        onChange={e => setMotorForm(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 2500000"
                      />
                    </div>
                  </div>
                )}

                {/* CHAINS FIELDS */}
                {activeTab === 'chains' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bước xích pitch (mm) (*)</label>
                      <input
                        type="number" step="any" required
                        value={chainForm.pitch}
                        onChange={e => setChainForm(prev => ({ ...prev, pitch: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 19.05"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tải phá hủy Q (kN)</label>
                      <input
                        type="number" step="any"
                        value={chainForm.breaking_load}
                        onChange={e => setChainForm(prev => ({ ...prev, breaking_load: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 31.8"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Khối lượng m (kg/m)</label>
                      <input
                        type="number" step="any"
                        value={chainForm.mass_per_m}
                        onChange={e => setChainForm(prev => ({ ...prev, mass_per_m: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diện tích bản lề A (mm²)</label>
                      <input
                        type="number" step="any"
                        value={chainForm.A_mm2}
                        onChange={e => setChainForm(prev => ({ ...prev, A_mm2: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 180"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">P_allow giới hạn (kW)</label>
                      <input
                        type="number" step="any"
                        value={chainForm.P_allow}
                        onChange={e => setChainForm(prev => ({ ...prev, P_allow: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 8.7"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vòng quay chuẩn n_ref (rpm)</label>
                      <input
                        type="number"
                        value={chainForm.n_ref}
                        onChange={e => setChainForm(prev => ({ ...prev, n_ref: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hệ số an toàn [s] cho phép</label>
                      <input
                        type="number" step="any"
                        value={chainForm.s_allow}
                        onChange={e => setChainForm(prev => ({ ...prev, s_allow: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 8.5"
                      />
                    </div>
                  </div>
                )}

                {/* BEARINGS FIELDS */}
                {activeTab === 'bearings' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mã ổ lăn (*)</label>
                      <input
                        type="text" required
                        value={bearingForm.code}
                        onChange={e => setBearingForm(prev => ({ ...prev, code: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800"
                        placeholder="Ví dụ: 7208"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Loại ổ lăn</label>
                      <input
                        type="text"
                        value={bearingForm.type}
                        onChange={e => setBearingForm(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800"
                        placeholder="Ví dụ: tapered"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Đường kính trong d (mm) (*)</label>
                      <input
                        type="number" step="any" required
                        value={bearingForm.inner_d}
                        onChange={e => setBearingForm(prev => ({ ...prev, inner_d: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Đường kính ngoài D (mm) (*)</label>
                      <input
                        type="number" step="any" required
                        value={bearingForm.outer_D}
                        onChange={e => setBearingForm(prev => ({ ...prev, outer_D: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 80"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chiều rộng B (mm) (*)</label>
                      <input
                        type="number" step="any" required
                        value={bearingForm.width_B}
                        onChange={e => setBearingForm(prev => ({ ...prev, width_B: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 18"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Khả năng tải động C (kN)</label>
                      <input
                        type="number" step="any"
                        value={bearingForm.C}
                        onChange={e => setBearingForm(prev => ({ ...prev, C: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 48.2"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Khả năng tải tĩnh C0 (kN)</label>
                      <input
                        type="number" step="any"
                        value={bearingForm.C0}
                        onChange={e => setBearingForm(prev => ({ ...prev, C0: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 38.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hệ số Y</label>
                      <input
                        type="number" step="any"
                        value={bearingForm.Y}
                        onChange={e => setBearingForm(prev => ({ ...prev, Y: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 1.71"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hệ số e</label>
                      <input
                        type="number" step="any"
                        value={bearingForm.e}
                        onChange={e => setBearingForm(prev => ({ ...prev, e: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-xs font-semibold text-slate-800 font-mono"
                        placeholder="Ví dụ: 0.35"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-2xl font-bold text-xs bg-white text-slate-500 hover:bg-slate-50 transition-premium shadow-sm"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:scale-[1.02] shadow-md shadow-blue-500/15 disabled:opacity-50 transition-premium text-xs"
                >
                  {submitting ? 'Đang xử lý...' : 'Lưu dữ liệu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && deletingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-slate-100 animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="absolute top-5 right-5 text-slate-400 hover:text-slate-650 transition-colors" onClick={() => setShowDeleteModal(false)}>
              ✕
            </button>
            
            <div className="p-6 text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 text-rose-600 mb-4 font-bold text-xl">
                ⚠️
              </div>
              
              <h3 className="text-base font-black text-slate-900 font-heading mb-2">
                Xác nhận xóa linh kiện
              </h3>
              
              <p className="text-xs text-slate-500 font-semibold px-2 mb-4 leading-relaxed">
                Bạn có chắc chắn muốn XÓA linh kiện{' '}
                <span className="font-bold text-slate-800">
                  [{activeTab === 'motors' ? `động cơ ${deletingItem.code}` : activeTab === 'bearings' ? `ổ lăn ${deletingItem.code}` : `bước xích ${deletingItem.pitch}mm`}]
                </span>{' '}
                khỏi cơ sở dữ liệu?
              </p>
              
              <p className="text-[10px] text-slate-450 italic px-2 mb-4 leading-relaxed">
                Hành động này không thể hoàn tác nếu linh kiện chưa được sử dụng ở dự án nào.
              </p>

              {deleteError && (
                <div className="mt-3 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-[11px] font-semibold text-left leading-relaxed">
                  <div className="font-bold mb-1">Không thể xóa linh kiện:</div>
                  {deleteError}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-2xl font-bold text-xs bg-white text-slate-500 hover:bg-slate-50 transition-premium shadow-sm"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={deleteSubmitting}
                onClick={executeDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl hover:scale-[1.02] shadow-md shadow-rose-500/15 disabled:opacity-50 transition-premium text-xs"
              >
                {deleteSubmitting ? 'Đang xóa...' : 'Đồng ý xóa'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[99] max-w-sm w-full bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.15)] p-4 animate-slide-up flex items-start gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${toast.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
            {toast.type === 'success' ? '✓' : '✕'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800">
              {toast.type === 'success' ? 'Thao tác thành công' : 'Thông báo'}
            </p>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, show: false }))} 
            className="text-slate-400 hover:text-slate-600 text-xs font-bold shrink-0 self-start"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
