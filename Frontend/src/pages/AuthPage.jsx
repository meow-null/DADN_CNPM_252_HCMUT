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
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

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
      setIsLogin(true);
      setLoginForm({ email: registerForm.email, password: '' });
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      setErrorMessage(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
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
            <a className="hover:text-teal-600 transition-colors" href="#">Trang chủ</a>
            <div className="h-4 w-px bg-gray-300"></div>
            <button className="hover:text-teal-600 transition-colors" onClick={() => setIsLogin(true)}>Đăng nhập</button>
            <button className="text-teal-600 font-semibold" onClick={() => setIsLogin(false)}>Đăng ký</button>
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
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Đăng nhập hệ thống</h2>
                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email hoặc Tên đăng nhập</label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="Nhập email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="Nhập mật khẩu"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                  {!!errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                  <button type="submit" className="w-full bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98]">
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </button>
                  <p className="text-center text-sm text-slate-600 mt-4">
                    Chưa có tài khoản? <button type="button" className="text-teal-600 font-bold hover:underline" onClick={() => { setIsLogin(false); setErrorMessage(''); }}>Đăng ký ngay</button>
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
                    className="w-full px-4 py-3 rounded-xl border border-teal-100 bg-teal-50/30 outline-none"
                    type="text"
                    placeholder="Nhập họ tên"
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
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mật khẩu</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-xl border border-teal-100 bg-teal-50/30 outline-none"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Xác nhận mật khẩu</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-xl border border-teal-100 bg-teal-50/30 outline-none"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                {!!errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                <button type="submit" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-4 px-4 rounded-xl shadow-lg mt-4">
                  {loading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
                </button>
                <button type="button" className="w-full text-teal-700 font-semibold py-2" onClick={() => { setIsLogin(true); setErrorMessage(''); }}>
                  Quay lại đăng nhập
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}