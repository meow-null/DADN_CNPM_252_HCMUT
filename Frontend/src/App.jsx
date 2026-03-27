import { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Workspace from './pages/Workspace';
import Calculations from './pages/Calculations';
import Summary from './pages/Summary';
import Reports from './pages/Reports';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3069/api';

async function appRequest(path, options = {}) {
  const { method = 'GET', body } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.status === 'error') {
    throw new Error(payload?.message || `Request failed with status ${response.status}`);
  }

  return payload?.data;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('workspace');
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [kinematics, setKinematics] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [workspaceError, setWorkspaceError] = useState('');

  const loadProjects = async () => {
    setLoadingProjects(true);
    setWorkspaceError('');
    try {
      const projectList = await appRequest('/projects');
      setIsAuthenticated(true);
      setProjects(projectList || []);
      if (projectList?.length && !activeProject) {
        setActiveProject(projectList[0]);
      }
    } catch (error) {
      const message = error.message || '';
      if (message.includes('Không có token') || message.includes('Unauthorized')) {
        setIsAuthenticated(false);
      } else {
        setWorkspaceError(message || 'Không thể tải danh sách dự án.');
      }
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleLoginSuccess = async () => {
    setIsAuthenticated(true);
    await loadProjects();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveProject(null);
    setKinematics(null);
  };

  const handleProjectSaved = (savedProject) => {
    setProjects((prev) => {
      const exists = prev.some((item) => item.id === savedProject.id);
      if (exists) {
        return prev.map((item) => (item.id === savedProject.id ? savedProject : item));
      }
      return [savedProject, ...prev];
    });
    setActiveProject(savedProject);
  };

  const handleProjectSelected = async (project) => {
    setActiveProject(project);
    setCurrentScreen('calculations');
    setKinematics(null);

    try {
      const data = await appRequest(`/projects/${project.id}/kinematics`);
      if (data?.transmission) {
        setKinematics({
          project: data,
          kinematics: {
            eta: data.efficiency,
            P_ct: data.Pct,
            u_ch_sb: data.total_ratio,
            u_h_sb: data.transmission?.u_h,
            u_x_sb: data.transmission?.u_x,
            u_1: data.transmission?.u_1,
            u_2: data.transmission?.u_2,
            n_sb: data.transmission?.n_sb,
            shaft_powers: data.shafts,
            T_out: data.shafts?.T_out,
          },
        });
      }
    } catch {
      setKinematics(null);
    }
  };

  const handleProjectDeleted = async (projectId) => {
    try {
      await appRequest(`/projects/${projectId}`, { method: 'DELETE' });
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      if (activeProject?.id === projectId) {
        setActiveProject(null);
        setKinematics(null);
      }
    } catch (error) {
      setWorkspaceError(error.message || 'Không thể xóa dự án.');
    }
  };

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 transition-opacity duration-300">
      {/* Cột bên trái */}
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        onLogout={handleLogout}
      />
      
      {/* Khu vực chính */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        <Header currentScreen={currentScreen} />
        
        {/* NỘI DUNG THAY ĐỔI THEO TAB (Đã dọn dẹp sạch sẽ) */}
        <div className="flex-1 overflow-y-auto p-8" id="screen-container">
          {currentScreen === 'workspace' && (
            <Workspace
              onNavigate={setCurrentScreen}
              projects={projects}
              loading={loadingProjects}
              errorMessage={workspaceError}
              onSelectProject={handleProjectSelected}
              onDeleteProject={handleProjectDeleted}
            />
          )}
          {currentScreen === 'calculations' && (
            <Calculations
              onNavigate={setCurrentScreen}
              activeProject={activeProject}
              onProjectSaved={handleProjectSaved}
              onKinematicsSaved={setKinematics}
              kinematicsResult={kinematics}
            />
          )}
          {currentScreen === 'summary' && (
            <Summary
              onNavigate={setCurrentScreen}
              activeProject={activeProject}
              kinematicsResult={kinematics}
            />
          )}
          {currentScreen === 'reports' && (
            <Reports
              activeProject={activeProject}
              kinematicsResult={kinematics}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;