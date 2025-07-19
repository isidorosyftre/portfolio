import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditPanel = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    color: '#ff6b6b',
    description: '',
    previewImages: ['', '', ''],
    images: ['']
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        color: project.color || '#ff6b6b',
        description: project.description || '',
        previewImages: project.previewImages || ['', '', ''],
        images: project.images || ['']
      });
    }
  }, [project]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addImageField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeImageField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const cleanedData = {
      ...formData,
      previewImages: formData.previewImages.filter(img => img.trim()),
      images: formData.images.filter(img => img.trim())
    };

    if (cleanedData.previewImages.length === 0) {
      alert('Please add at least one preview image');
      return;
    }

    onSave(cleanedData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="w-20 h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project description"
            />
          </div>

          {/* Preview Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview Images (max 3)
            </label>
            {formData.previewImages.slice(0, 3).map((image, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleArrayChange('previewImages', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Preview image ${index + 1} URL`}
                />
                {formData.previewImages.length > 1 && (
                  <button
                    onClick={() => removeImageField('previewImages', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {formData.previewImages.length < 3 && (
              <button
                onClick={() => addImageField('previewImages')}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                + Add Preview Image
              </button>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images
            </label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Gallery image ${index + 1} URL`}
                />
                {formData.images.length > 1 && (
                  <button
                    onClick={() => removeImageField('images', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addImageField('images')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              + Add Gallery Image
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;