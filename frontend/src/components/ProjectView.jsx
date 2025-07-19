import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ProjectView = ({ project, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>
            <div 
              className="w-6 h-6 rounded"
              style={{ backgroundColor: project.color }}
            ></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <p className="text-sm text-gray-500">{project.date}</p>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 transition-colors group rounded-full"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Description */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="space-y-6">
            {project.images.map((image, index) => (
              <div 
                key={index}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openImageModal(index)}
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Current Image */}
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectView;