import React, { useState, useEffect } from 'react';
import ProjectFolder from './ProjectFolder';
import ProjectView from './ProjectView';
import EditPanel from './EditPanel';
import { mockProjects } from '../data/mockData';

const Portfolio = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleProjectClick = (project) => {
    if (!isEditMode) {
      setSelectedProject(project);
    }
  };

  const handleEditToggle = () => {
    const password = prompt('Enter password to enable edit mode:');
    if (password === 'rafa2005') {
      setIsEditMode(!isEditMode);
      setShowEditPanel(!showEditPanel);
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

  if (selectedProject) {
    return <ProjectView project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 z-30 mt-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Work</h1>
            <div className="text-sm text-gray-500">
              {projects.length} projects
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleEditToggle}
              className={`px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium border transition-all duration-300 ${
                isEditMode 
                  ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
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
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="animate-slide-up">
                <ProjectFolder 
                  project={project} 
                  onClick={handleProjectClick}
                  onHover={setHoveredProject}
                  isHovered={hoveredProject?.id === project.id}
                  index={index}
                />
                {isEditMode && (
                  <div className="mt-2 flex flex-col space-y-1">
                    <button
                      onClick={() => setShowEditPanel(project)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this project?')) {
                          handleProjectDelete(project.id);
                        }
                      }}
                      className="text-xs bg-red-500 text-white px-2 py-1 hover:bg-red-600 transition-colors"
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
          <div className="flex space-x-6 bg-white p-6 rounded-lg shadow-2xl border-2 border-black">
            {hoveredProject.previewImages.slice(0, 3).map((image, idx) => (
              <div
                key={idx}
                className="preview-card w-44 h-56 bg-white border-2 border-black shadow-lg overflow-hidden"
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
            <p className="text-lg font-bold text-gray-900">{hoveredProject.title}</p>
            <p className="text-sm text-gray-600">{hoveredProject.date}</p>
          </div>
        </div>
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