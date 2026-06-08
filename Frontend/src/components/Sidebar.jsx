import { useState, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

export default function Sidebar({ currentScreen, onNavigate, onLogout, userName, userEmail, avatarUrl, onUpdateAvatar }) {
  const getNavClass = (screenName) => {
    const baseClass = "flex items-center gap-3 w-full p-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ";
    if (currentScreen === screenName) {
      return baseClass + "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 border border-blue-500/20";
    }
    return baseClass + "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50";
  };

  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      if (onUpdateAvatar) {
        await onUpdateAvatar(file);
      }
    } catch (error) {
      console.error("Lỗi upload avatar:", error);
      alert("Cập nhật ảnh đại diện thất bại!");
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const [showProfile, setShowProfile] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleRequestChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    if (!oldPassword || !newPassword) {
      setPasswordError('Vui lòng nhập đủ mật khẩu cũ và mới');
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/request-change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await response.json().catch(() => null);
      
      if (!response.ok || data?.status === 'error') {
        throw new Error(data?.message || 'Yêu cầu đổi mật khẩu thất bại');
      }

      setPasswordSuccess('Mã OTP đã được gửi đến email của bạn!');
      setShowOtpStep(true);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleVerifyChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    setIsChangingPassword(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ otp: otpValue, newPassword })
      });
      const data = await response.json().catch(() => null);
      
      if (!response.ok || data?.status === 'error') {
        throw new Error(data?.message || 'Xác thực đổi mật khẩu thất bại');
      }

      setPasswordSuccess('Đổi mật khẩu thành công!');
      setShowOtpStep(false);
      setOldPassword('');
      setNewPassword('');
      setOtpValue('');
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <>
      <aside className="w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.4)] relative z-10 transition-all duration-500">
        {/* Decorative premium line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-80"></div>

        {/* Brand Header */}
        <div className="p-6 border-b border-white/5 flex items-center gap-4 group">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" alt="Logo HCMUT" className="h-9 w-9 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">BK Gear</span>
            <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase mt-0.5">Hệ Dẫn Động</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2.5">
          <button className={getNavClass('workspace')} onClick={() => onNavigate('workspace')}>
            <svg className="h-5 w-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            <span className="text-sm">Dự án của tôi</span>
          </button>
          
          <button className={getNavClass('catalog')} onClick={() => onNavigate('catalog')}>
            <svg className="h-5 w-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            <span className="text-sm">Thư viện Linh kiện</span>
          </button>
        </nav>

        {/* User Info & Profile Trigger */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/50">
          <div 
            className="flex items-center gap-3 p-2.5 bg-slate-900/60 rounded-2xl border border-slate-900 hover:border-slate-800 transition-premium cursor-pointer group" 
            onClick={() => setShowProfile(true)}
          >
            <div 
              className="relative w-9 h-9 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20 overflow-hidden shrink-0"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                (userName || 'User').trim().charAt(0).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors">{userName || 'Người dùng'}</p>
              <p className="text-[9px] text-slate-450 font-extrabold uppercase tracking-wider group-hover:text-blue-400 transition-colors">HỒ SƠ CỦA TÔI</p>
            </div>
            <div className="text-slate-650 group-hover:text-slate-400 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </div>
          </div>
        </div>
      </aside>

      {/* Modal Hồ sơ người dùng */}
      {showProfile && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowProfile(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-slate-100 animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setShowProfile(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="p-6 border-b border-slate-100 flex flex-col items-center justify-center bg-slate-50/50">
              <div 
                className="relative w-24 h-24 rounded-full border-4 border-white shadow-md bg-blue-600 text-white flex items-center justify-center font-bold text-3xl overflow-hidden group mb-4 cursor-pointer"
                onClick={handleAvatarClick}
                title="Đổi ảnh đại diện"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  (userName || 'User').trim().charAt(0).toUpperCase()
                )}
                <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                  {isUploading ? (
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                />
              </div>
              <h2 className="text-lg font-black text-slate-800 text-center font-heading">{userName}</h2>
              <p className="text-xs font-semibold text-slate-400 text-center mt-1">{userEmail || 'Chưa cập nhật email'}</p>
            </div>

            <div className="p-6">
              <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Đổi mật khẩu tài khoản
              </h3>
              
              {!showOtpStep ? (
                <form onSubmit={handleRequestChangePassword} className="space-y-4">
                  {passwordError && <p className="text-xs font-semibold text-red-650 bg-red-50 p-3.5 rounded-2xl border border-red-100">{passwordError}</p>}
                  {passwordSuccess && <p className="text-xs font-semibold text-teal-650 bg-teal-50 p-3.5 rounded-2xl border border-teal-150">{passwordSuccess}</p>}
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mật khẩu cũ</label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? "text" : "password"} 
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-premium font-semibold text-slate-800 text-sm pr-10"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <button
                        type="button"
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mật khẩu mới</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-premium font-semibold text-slate-800 text-sm pr-10"
                        placeholder="Mật khẩu mới"
                      />
                      <button
                        type="button"
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isChangingPassword}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-2xl text-xs font-bold transition-premium disabled:opacity-50 shadow-md flex items-center justify-center gap-1.5"
                  >
                    {isChangingPassword ? 'Đang xử lý...' : 'Gửi mã OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyChangePassword} className="space-y-4">
                  {passwordError && <p className="text-xs font-semibold text-red-650 bg-red-50 p-3.5 rounded-2xl border border-red-100">{passwordError}</p>}
                  {passwordSuccess && <p className="text-xs font-semibold text-teal-650 bg-teal-50 p-3.5 rounded-2xl border border-teal-150">{passwordSuccess}</p>}
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 text-center">Mã xác thực OTP</label>
                    <input 
                      type="text" 
                      maxLength="4"
                      value={otpValue}
                      onChange={e => setOtpValue(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 outline-none text-center text-xl tracking-[0.5em] font-black"
                      placeholder="----"
                    />
                    <p className="text-[10px] font-semibold text-slate-400 mt-2 text-center">Vui lòng nhập 4 số đã được gửi đến email của bạn</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isChangingPassword || otpValue.length !== 4}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold transition-premium disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400"
                  >
                    {isChangingPassword ? 'Đang xác thực...' : 'Xác nhận Đổi mật khẩu'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowOtpStep(false); setPasswordError(''); setPasswordSuccess(''); }}
                    className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-premium"
                  >
                    Quay lại
                  </button>
                </form>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => {
                  setShowProfile(false);
                  onLogout();
                }}
                className="px-4 py-2 flex items-center gap-1.5 text-rose-600 hover:bg-rose-500/10 rounded-xl font-bold text-xs transition-premium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Đăng xuất tài khoản
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}