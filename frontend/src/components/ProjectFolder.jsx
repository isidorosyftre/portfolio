import React from 'react';

const ProjectFolder = ({ project, onClick, index, onHover, isHovered }) => {
  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(project)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Actual Folder Shape */}
      <div className="folder-container relative transition-all duration-500 ease-out transform hover:scale-105">
        {/* Folder Tab */}
        <div className="folder-tab w-16 h-4 bg-white border-2 border-black border-b-0 relative -mb-px z-10">
          <div className="absolute top-0 right-0 w-2 h-2 bg-gray-100 border-r border-t border-black transform rotate-45 translate-x-1 -translate-y-1"></div>
        </div>
        
        {/* Main Folder Body */}
        <div className="folder-body w-24 h-32 bg-white border-2 border-black relative overflow-hidden">
          {/* Mobile: Always show cover image */}
          <div className="md:hidden absolute inset-0 p-1">
            <img 
              src={project.previewImages[0]} 
              alt={`${project.title} cover`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Desktop: Show on hover or always show a subtle preview */}
          <div className="hidden md:block absolute inset-0 p-1 opacity-20 group-hover:opacity-100 transition-opacity">
            <img 
              src={project.previewImages[0]} 
              alt={`${project.title} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Folder Label */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-black p-1">
            <span className="text-xs font-bold text-black truncate block">
              {project.title.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Date label */}
        <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 text-center">
          {project.date}
        </div>
      </div>
    </div>
  );
};

export default ProjectFolder;