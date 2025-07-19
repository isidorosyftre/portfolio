import React, { useState } from 'react';

const ProjectFolder = ({ project, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

        {/* Hover preview */}
        {isHovered && (
          <div 
            className="absolute left-6 top-0 flex space-x-1 z-10 animate-fade-in"
            style={{ animationDuration: '300ms' }}
          >
            {project.previewImages.slice(0, 3).map((image, idx) => (
              <div
                key={idx}
                className="preview-card w-20 h-24 bg-white border border-gray-200 shadow-lg transform transition-all duration-300"
                style={{ 
                  transform: `translateX(${idx * 2}px) translateY(${idx * 2}px) rotate(${idx * 2 - 2}deg)`,
                  zIndex: 3 - idx
                }}
              >
                <img 
                  src={image} 
                  alt={`${project.title} preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hover info */}
      {isHovered && (
        <div className="absolute left-0 -bottom-12 bg-black text-white px-2 py-1 text-xs whitespace-nowrap z-20 animate-fade-in">
          {project.description.substring(0, 50)}...
        </div>
      )}
    </div>
  );
};

export default ProjectFolder;