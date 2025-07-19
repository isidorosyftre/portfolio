import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, FileText, BookOpen, Download } from 'lucide-react';

const ProjectView = ({ project, onBack, hideNavigation }) => {
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

  const downloadDocument = (doc) => {
    const link = document.createElement('a');
    link.href = doc.data;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-white px-6 py-4 z-30 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </button>
            <div 
              className="w-6 h-6 rounded"
              style={{ backgroundColor: project.color }}
            ></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{project.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">{project.date}</p>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group rounded-full"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Description */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">
              {project.description}
            </p>
          </div>

          {/* Documents Section */}
          {project.documents && project.documents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Documents</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-center space-x-3">
                      {doc.type === 'application/pdf' ? (
                        <FileText className="w-6 h-6 text-red-500" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-blue-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white transition-colors">{doc.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">{formatFileSize(doc.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadDocument(doc)}
                      className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Gallery</h2>
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
                  className="w-full h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-black dark:border-white"
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