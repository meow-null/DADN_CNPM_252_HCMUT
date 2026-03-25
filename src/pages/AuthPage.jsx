import { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  // State này dùng để chuyển đổi qua lại giữa Form Login và Form Register
  const [isLogin, setIsLogin] = useState(true);

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
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email hoặc Tên đăng nhập</label>
                    <input required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Nhập email" type="text"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
                    <input required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Nhập mật khẩu" type="password"/>
                  </div>
                  <button type="submit" className="w-full bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98]">
                    Đăng nhập
                  </button>
                  <p className="text-center text-sm text-slate-600 mt-4">
                    Chưa có tài khoản? <button type="button" className="text-teal-600 font-bold hover:underline" onClick={() => setIsLogin(false)}>Đăng ký ngay</button>
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
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Họ và tên</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-teal-100 bg-teal-50/30 outline-none" type="text" placeholder="Nhập họ tên" />
                </div>
                <button type="button" className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-4 px-4 rounded-xl shadow-lg mt-4" onClick={() => setIsLogin(true)}>
                  Tạo tài khoản (Quay lại đăng nhập)
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}