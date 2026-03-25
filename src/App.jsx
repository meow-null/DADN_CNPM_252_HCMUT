import { useState } from 'react';
import AuthPage from './pages/AuthPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Workspace from './pages/Workspace';
import Calculations from './pages/Calculations';
import Summary from './pages/Summary';
import Reports from './pages/Reports';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('workspace');

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 transition-opacity duration-300">
      {/* Cột bên trái */}
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        onLogout={() => setIsAuthenticated(false)} 
      />
      
      {/* Khu vực chính */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <Header currentScreen={currentScreen} />
        
        {/* NỘI DUNG THAY ĐỔI THEO TAB (Đã dọn dẹp sạch sẽ) */}
        <div className="flex-1 overflow-y-auto p-8" id="screen-container">
          {currentScreen === 'workspace' && <Workspace onNavigate={setCurrentScreen} />}
          {currentScreen === 'calculations' && <Calculations onNavigate={setCurrentScreen} />}
          {currentScreen === 'summary' && <Summary onNavigate={setCurrentScreen} />}
          {currentScreen === 'reports' && <Reports />}
        </div>
      </main>
    </div>
  );
}

export default App;