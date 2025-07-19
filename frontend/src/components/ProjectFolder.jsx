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
      {/* Folder */}
      <div className="folder-container relative transition-all duration-500 ease-out transform hover:scale-105">
        <div 
          className="folder-spine w-4 h-32 relative"
          style={{ 
            background: `linear-gradient(45deg, ${project.color}, ${project.color}dd)`,
            transform: 'perspective(100px) rotateY(-5deg)',
            boxShadow: '2px 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          {/* Folder spine text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-white text-xs font-bold tracking-wider transform rotate-90 whitespace-nowrap select-none"
              style={{ fontSize: '10px' }}
            >
              {project.title.toUpperCase()}
            </span>
          </div>
          
          {/* Date label */}
          <div 
            className="absolute -bottom-6 left-0 right-0 text-xs text-gray-500 text-center"
            style={{ fontSize: '9px' }}
          >
            {project.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFolder;