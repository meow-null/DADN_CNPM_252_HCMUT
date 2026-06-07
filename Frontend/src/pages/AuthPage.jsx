import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

async function authRequest(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.status === 'error') {
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }

  return payload?.data;
}

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await authRequest('/auth/login', loginForm);
      onLoginSuccess();
    } catch (error) {
      setErrorMessage(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,20}$/;
    if (!passwordRegex.test(registerForm.password)) {
      setErrorMessage('Mật khẩu từ 4-20 ký tự, phải có ít nhất 1 số, 1 chữ thường, 1 chữ hoa, và 1 ký tự đặc biệt.');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      await authRequest('/auth/register', {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      });
      setRegisteredEmail(registerForm.email);
      setShowOtpModal(true);
      setSuccessMessage('Đăng ký thành công! Vui lòng nhập mã OTP được gửi vào email của bạn (hiệu lực 5 phút).');
    } catch (error) {
      setErrorMessage(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      await authRequest('/auth/verify-otp', { email: registeredEmail, otp: otpValue });
      setShowOtpModal(false);
      setIsLogin(true);
      setSuccessMessage('Xác thực thành công! Bạn có thể đăng nhập ngay bây giờ.');
      setLoginForm({ email: registeredEmail, password: '' });
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      setOtpValue('');
    } catch (error) {
      setErrorMessage(error.message || 'Xác thực OTP thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 transition-opacity duration-300">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png" alt="Logo HCMUT" className="h-10 w-10 object-contain" />
            <span className="font-bold text-xl tracking-tight text-slate-800">Thiết kế Dẫn động</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button className="hover:text-teal-600 transition-colors" onClick={() => setIsLogin(true)}>Trang chủ</button>
            <div className="h-4 w-px bg-gray-300"></div>
            <button className="hover:text-teal-600 transition-colors" onClick={() => { setIsLogin(true); setLoginForm({ email: '', password: '' }); setErrorMessage(''); }}>Đăng nhập</button>
            <button className="text-teal-600 font-semibold" onClick={() => { setIsLogin(false); setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' }); setErrorMessage(''); }}>Đăng ký</button>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16 flex flex-col">
        {isLogin ? (
          /* -------- MÀN HÌNH LOGIN -------- */
          <section className="flex-grow flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-technical-blueprint relative flex flex-col justify-center px-12 lg:px-24 py-20 text-white overflow-hidden">
              <div className="blueprint-overlay"></div>
              <div className="relative z-10 max-w-lg">
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">Công cụ chuyên nghiệp cho kỹ sư cơ khí</h1>
                <p className="text-slate-300 text-lg mb-10 leading-relaxed">Nền tảng thiết kế và tính toán hộp giảm tốc, thùng trộn với độ chính xác cao.</p>
              </div>
            </div>

            <div className="lg:w-1/2 bg-white flex flex-col justify-center px-8 lg:px-24 py-16">
              <div className="max-w-md w-full mx-auto">
                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}
                {successMessage && (
                  <div className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-500 text-teal-800 rounded-r-lg shadow-sm flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p className="text-sm font-medium">{successMessage}</p>
                  </div>
                )}
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Đăng nhập hệ thống</h2>
                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="Nhập email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
                    <input
                      required
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="Nhập mật khẩu"
                      type={showLoginPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-10 text-slate-400 hover:text-slate-600 focus:outline-none"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                  <button type="submit" className="w-full bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98]">
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                  <p className="text-center text-sm text-slate-600 mt-4">
                    Chưa có tài khoản? <button type="button" className="text-teal-600 font-bold hover:underline" onClick={() => { setIsLogin(false); setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' }); setErrorMessage(''); }}>Đăng ký ngay</button>
                  </p>
                </form>
              </div>
            </div>
          </section>
        ) : (
          /* -------- MÀN HÌNH REGISTER -------- */
          <section className="flex-grow flex items-center justify-center bg-slate-100 p-6">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 lg:p-12 relative overflow-hidden">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Đăng ký Tài khoản</h2>
              </div>
              <form className="space-y-5" onSubmit={handleRegisterSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Họ và tên</label>
                  <input
                    required
                    maxLength={30}
                    className="w-full px-4 py-3 rounded-xl border border-teal-100 bg-teal-50/30 outline-none"
                    type="text"
                    placeholder="Nhập họ tên (tối đa 30 ký tự)"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-xl border border-teal-100 bg-teal-50/30 outline-none"
                    type="email"
                    placeholder="Nhập email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mật khẩu</label>
                  <input
                    required
                    minLength={4}
                    maxLength={20}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-teal-100 bg-teal-50/30 outline-none"
                    type={showRegPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu (tối thiểu 4 ký tự)"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-10 text-slate-400 hover:text-slate-600 focus:outline-none"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                  >
                    {showRegPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Xác nhận mật khẩu</label>
                  <input
                    required
                    minLength={4}
                    maxLength={20}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-teal-100 bg-teal-50/30 outline-none"
                    type={showRegConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-10 text-slate-400 hover:text-slate-600 focus:outline-none"
                    onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                  >
                    {showRegConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    )}
                  </button>
                </div>
                {!!errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                <button type="submit" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-4 px-4 rounded-xl shadow-lg mt-4">
                  {loading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
                </button>
                <button type="button" className="w-full text-teal-700 font-semibold py-2" onClick={() => { setIsLogin(true); setLoginForm({ email: '', password: '' }); setErrorMessage(''); }}>
                  Quay lại đăng nhập
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* -------- OTP MODAL -------- */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative">
            <button 
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6">
              <svg className="h-8 w-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Nhập mã OTP</h3>
            <p className="text-sm text-slate-500 mb-6">
              Mã xác thực 4 số đã được gửi đến email <br/><span className="font-semibold text-slate-700">{registeredEmail}</span>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <input
                type="text"
                maxLength="4"
                required
                className="w-full text-center text-3xl tracking-[1em] font-bold px-4 py-4 rounded-xl border-2 border-teal-100 bg-teal-50/30 outline-none focus:border-teal-400 focus:bg-white transition-all"
                placeholder="----"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ''))}
              />

              {!!errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
              {!!successMessage && <p className="text-sm text-teal-600">{successMessage}</p>}

              <button 
                type="submit" 
                disabled={loading || otpValue.length !== 4}
                className="w-full bg-[#0d9488] hover:bg-[#0f766e] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-colors"
              >
                {loading ? 'Đang xác thực...' : 'Xác thực tài khoản'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}