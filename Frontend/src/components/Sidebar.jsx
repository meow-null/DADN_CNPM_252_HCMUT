import { useState, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

export default function Sidebar({ currentScreen, onNavigate, onLogout, userName, userEmail, avatarUrl, onUpdateAvatar }) {
  // Hàm phụ trợ để đổi màu nút active
  const getNavClass = (screenName) => {
    const baseClass = "flex items-center gap-3 w-full p-3 rounded-lg font-medium transition-colors ";
    // Nếu đang ở màn hình calculations (trong dự án), thì coi như không có tab nào ở Sidebar được active
    if (currentScreen === screenName) {
      return baseClass + "bg-primary-light text-primary font-bold";
    }
    return baseClass + "text-slate-600 hover:bg-slate-50";
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
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 relative z-10">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" alt="Logo HCMUT" className="h-10 w-10 object-contain" />
          <span className="font-bold text-lg tracking-tight text-primary-dark whitespace-nowrap">Thiết kế dẫn động</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className={getNavClass('workspace')} onClick={() => onNavigate('workspace')}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            Dự án của tôi
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 relative">
          <div 
            className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors" 
            onClick={() => setShowProfile(true)}
          >
            <div 
              className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm bg-primary text-white flex items-center justify-center font-bold overflow-hidden"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                (userName || 'User').trim().charAt(0).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold truncate text-slate-800">{userName || 'Người dùng'}</p>
              <p className="text-xs text-slate-500 truncate">{userEmail || 'Chưa cập nhật email'}</p>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          </div>
        </div>
      </aside>

      {/* Modal Hồ sơ người dùng */}
      {showProfile && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowProfile(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" onClick={() => setShowProfile(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="p-6 border-b border-slate-100 flex flex-col items-center justify-center bg-slate-50/50">
              <div 
                className="relative w-24 h-24 rounded-full border-4 border-white shadow-md bg-primary text-white flex items-center justify-center font-bold text-3xl overflow-hidden group mb-4 cursor-pointer"
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
              <h2 className="text-xl font-bold text-slate-800 text-center">{userName}</h2>
              <p className="text-sm text-slate-500 text-center mt-1">{userEmail}</p>
            </div>

            <div className="p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Đổi mật khẩu
              </h3>
              
              {!showOtpStep ? (
                <form onSubmit={handleRequestChangePassword} className="space-y-4">
                  {passwordError && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{passwordError}</p>}
                  {passwordSuccess && <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{passwordSuccess}</p>}
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Mật khẩu cũ</label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? "text" : "password"} 
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm pr-10"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Mật khẩu mới</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm pr-10"
                        placeholder="Mật khẩu mới (có số, chữ hoa, chữ thường, ký tự đặc biệt)"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isChangingPassword}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {isChangingPassword ? 'Đang xử lý...' : 'Gửi mã OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyChangePassword} className="space-y-4">
                  {passwordError && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{passwordError}</p>}
                  {passwordSuccess && <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{passwordSuccess}</p>}
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Mã xác thực OTP</label>
                    <input 
                      type="text" 
                      maxLength="4"
                      value={otpValue}
                      onChange={e => setOtpValue(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center text-xl tracking-[0.5em] font-bold"
                      placeholder="----"
                    />
                    <p className="text-xs text-slate-500 mt-2 text-center">Vui lòng nhập 4 số đã được gửi đến email của bạn</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isChangingPassword || otpValue.length !== 4}
                    className="w-full py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    {isChangingPassword ? 'Đang xác thực...' : 'Xác nhận Đổi mật khẩu'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowOtpStep(false); setPasswordError(''); setPasswordSuccess(''); }}
                    className="w-full py-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Quay lại
                  </button>
                </form>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => {
                  setShowProfile(false);
                  onLogout();
                }}
                className="px-4 py-2 flex items-center gap-2 text-red-600 font-semibold text-sm hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}