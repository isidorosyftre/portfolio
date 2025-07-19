import React, { useState, useEffect } from 'react';
import ProjectFolder from './ProjectFolder';
import ProjectView from './ProjectView';
import EditPanel from './EditPanel';
import LogoEditor from './LogoEditor';
import { Moon, Sun } from 'lucide-react';
import { mockProjects, mockSiteData } from '../data/mockData';
import { getDarkMode, setDarkMode, initializeDarkMode } from '../utils/darkMode';

const Portfolio = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [siteData, setSiteData] = useState(mockSiteData);
  const [showLogoEditor, setShowLogoEditor] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const darkMode = initializeDarkMode();
    setIsDarkMode(darkMode);
  }, []);

  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setDarkMode(newMode);
  };

  const handleProjectClick = (project) => {
    if (!isEditMode) {
      setSelectedProject(project);
    }
  };

  const handleEditToggle = () => {
    const password = prompt('Enter password to enable edit mode:');
    if (password === 'rafa2005') {
      setIsEditMode(!isEditMode);
      setShowEditPanel(false);
    } else if (password !== null) {
      alert('Incorrect password');
    }
  };

  const handleProjectUpdate = (updatedProject) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  };

  const handleProjectDelete = (projectId) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
  };

  const handleProjectAdd = (newProject) => {
    const project = {
      ...newProject,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
      })
    };
    setProjects(prevProjects => [project, ...prevProjects]);
  };

  const handleLogoUpdate = (logoData) => {
    setSiteData(logoData);
  };

  if (selectedProject) {
    return <ProjectView project={selectedProject} onBack={() => setSelectedProject(null)} hideNavigation />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black relative transition-colors">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-white px-4 md:px-6 py-4 z-30 mt-16 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div 
              className={`flex items-center space-x-2 ${isEditMode ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-2 rounded' : ''}`}
              onClick={isEditMode ? () => setShowLogoEditor(true) : undefined}
            >
              {siteData.logoImage ? (
                <img 
                  src={siteData.logoImage} 
                  alt="Logo" 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <div className="h-8 w-8 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm font-bold">
                  {siteData.logo}
                </div>
              )}
              {isEditMode && <span className="text-xs text-gray-500">Click to edit</span>}
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {projects.length} projects
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={handleDarkModeToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            <button
              onClick={handleEditToggle}
              className={`px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium border transition-all duration-300 ${
                isEditMode 
                  ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                  : 'bg-white dark:bg-black text-gray-700 dark:text-white border-gray-300 dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
            >
              {isEditMode ? 'Exit Edit' : 'Edit Mode'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Projects Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="animate-slide-up relative">
                <ProjectFolder 
                  project={project} 
                  onClick={handleProjectClick}
                  onHover={setHoveredProject}
                  isHovered={hoveredProject?.id === project.id}
                  index={index}
                />
                {isEditMode && (
                  <div className="absolute -bottom-2 left-0 right-0 flex flex-col space-y-1 z-20">
                    <button
                      onClick={() => setShowEditPanel(project)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this project?')) {
                          handleProjectDelete(project.id);
                        }
                      }}
                      className="text-xs bg-red-500 text-white px-2 py-1 hover:bg-red-600 transition-colors shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Preview Images - Centered (Desktop Only) */}
      {hoveredProject && (
        <div className="hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="flex space-x-6 bg-white dark:bg-black p-6 rounded-lg shadow-2xl border-2 border-black dark:border-white transition-colors">
            {hoveredProject.previewImages.slice(0, 3).map((image, idx) => (
              <div
                key={idx}
                className="preview-card w-44 h-56 bg-white dark:bg-black border-2 border-black dark:border-white shadow-lg overflow-hidden transition-colors"
                style={{ 
                  animationDelay: `${idx * 100}ms`
                }}
              >
                <img 
                  src={image} 
                  alt={`${hoveredProject.title} preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* Project title below preview */}
          <div className="text-center mt-4">
            <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors">{hoveredProject.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">{hoveredProject.date}</p>
          </div>
        </div>
      )}

      {/* Logo Editor */}
      {showLogoEditor && (
        <LogoEditor
          siteData={siteData}
          onSave={handleLogoUpdate}
          onClose={() => setShowLogoEditor(false)}
        />
      )}

      {/* Edit Panel */}
      {showEditPanel && (
        <EditPanel
          project={showEditPanel === true ? null : showEditPanel}
          onSave={(project) => {
            if (showEditPanel === true) {
              handleProjectAdd(project);
            } else {
              handleProjectUpdate(project);
            }
            setShowEditPanel(false);
          }}
          onClose={() => setShowEditPanel(false)}
        />
      )}

      {/* Add Project Button */}
      {isEditMode && (
        <button
          onClick={() => setShowEditPanel(true)}
          className="fixed bottom-6 right-6 bg-green-500 text-white w-12 h-12 rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl z-40 flex items-center justify-center"
        >
          <span className="text-xl">+</span>
        </button>
      )}
    </div>
  );
};

export default Portfolio;