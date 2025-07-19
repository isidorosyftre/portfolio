import React from 'react';

const ProjectFolder = ({ project, onClick, index, onHover, isHovered }) => {
  return (
    <div 
      className="relative group cursor-pointer mb-8"
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(project)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Horizontal Folder Shape */}
      <div className="folder-container relative transition-all duration-500 ease-out transform hover:scale-105">
        {/* Folder Tab */}
        <div className="folder-tab w-20 h-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-300 border-b-0 relative -mb-px z-10">
          <div className="absolute top-0 right-0 w-2 h-2 bg-gray-100 dark:bg-gray-700 border-r border-t border-black dark:border-gray-300 transform rotate-45 translate-x-1 -translate-y-1"></div>
        </div>
        
        {/* Main Horizontal Folder Body */}
        <div className="folder-body w-32 h-20 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-300 relative overflow-hidden">
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
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-black dark:border-gray-300 p-1">
            <span className="text-xs font-bold text-black dark:text-white truncate block">
              {project.title.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Date label */}
        <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 dark:text-gray-400 text-center">
          {project.date}
        </div>
      </div>
    </div>
  );
};

export default ProjectFolder;