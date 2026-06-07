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
  const [currentUser, setCurrentUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('workspace');
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [kinematics, setKinematics] = useState(null);
  const [calcStep, setCalcStep] = useState(1); // persist wizard step across workspace navigation
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [workspaceError, setWorkspaceError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadCurrentUser = async () => {
    try {
      const userInfo = await appRequest('/auth/get-info');
      setCurrentUser(userInfo || null);
    } catch {
      setCurrentUser(null);
    }
  };

  const loadProjects = async () => {
    setLoadingProjects(true);
    setWorkspaceError('');
    try {
      const projectList = await appRequest('/projects');
      setIsAuthenticated(true);
      setProjects(projectList || []);
      await loadCurrentUser();
    } catch (error) {
      const message = error.message || '';
      if (message.includes('Không có token') || message.includes('Unauthorized')) {
        setIsAuthenticated(false);
        setCurrentUser(null);
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
    setCurrentUser(null);
    setActiveProject(null);
    setKinematics(null);
    setCalcStep(1);
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
    // If selecting a new project (different from current), reset step
    if (project?.id !== activeProject?.id) {
      setCalcStep(1);
    }
    setActiveProject(project);
    setCurrentScreen('calculations'); // Jump into project room

    // Skip kinematics load for new project (project = null)
    if (!project) {
      setKinematics(null);
      return;
    }

    // If same project, keep existing kinematics and silently refresh in background
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
      // Keep existing kinematics if fetch fails
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

  const handleUpdateAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${API_BASE_URL}/user/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || payload?.status === 'error') {
      throw new Error(payload?.message || 'Upload failed');
    }

    const newAvatarUrl = payload.data.avatar_url;
    setCurrentUser(prev => ({ ...prev, avatar_url: newAvatarUrl }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 transition-opacity duration-300">
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        onLogout={handleLogout}
        userName={currentUser?.name}
        userEmail={currentUser?.email}
        avatarUrl={currentUser?.avatar_url}
        onUpdateAvatar={handleUpdateAvatar}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
        {/* ĐÃ SỬA: Truyền prop onNavigate và activeProjectName xuống cho Header */}
        <Header 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
          activeProjectName={activeProject?.name}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          projects={projects}
          onSelectProject={handleProjectSelected}
        />
        
        <div className="flex-1 overflow-y-auto p-8" id="screen-container">
          {currentScreen === 'workspace' && (
              <Workspace
        onNavigate={setCurrentScreen}
        projects={projects}
        loading={loadingProjects}
        errorMessage={workspaceError}
        onSelectProject={handleProjectSelected}
        onDeleteProject={handleProjectDeleted}
        setProjects={setProjects}
      />
          )}

          {currentScreen === 'catalog' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 mt-20 animate-fade-in">
               <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
               <h2 className="text-xl font-bold text-slate-700">Thư viện Linh kiện (Catalog)</h2>
               <p className="text-sm">Giao diện UC-07 đang được phát triển...</p>
            </div>
          )}

          <div className={currentScreen === 'calculations' ? 'block' : 'hidden'}>
            <Calculations
              onNavigate={setCurrentScreen}
              activeProject={activeProject}
              onProjectSaved={handleProjectSaved}
              onKinematicsSaved={setKinematics}
              kinematicsResult={kinematics}
              initialStep={calcStep}
              onStepChange={setCalcStep}
            />
          </div>
          <div className={currentScreen === 'summary' ? 'block' : 'hidden'}>
            <Summary
              onNavigate={setCurrentScreen}
              activeProject={activeProject}
              kinematicsResult={kinematics}
            />
          </div>
          <div className={currentScreen === 'reports' ? 'block' : 'hidden'}>
            <Reports
              onNavigate={setCurrentScreen}
              activeProject={activeProject}
              kinematicsResult={kinematics}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;