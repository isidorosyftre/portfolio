import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

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

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

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

  const handleFileUpload = async (field, index, file) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const base64 = await convertToBase64(file);
        handleArrayChange(field, index, base64);
      } catch (error) {
        alert('Error uploading image. Please try again.');
      }
    } else {
      alert('Please select a valid image file.');
    }
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter project title"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Folder Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="w-20 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter project description"
            />
          </div>

          {/* Preview Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preview Images (max 3)
            </label>
            {formData.previewImages.slice(0, 3).map((image, index) => (
              <div key={index} className="flex space-x-2 mb-3">
                <input
                  type="url"
                  value={image.startsWith('data:') ? '' : image}
                  onChange={(e) => handleArrayChange('previewImages', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={`Preview image ${index + 1} URL`}
                  disabled={image.startsWith('data:')}
                />
                <label className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 mr-1" />
                  <span className="text-sm">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleFileUpload('previewImages', index, e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gallery Images
            </label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex space-x-2 mb-3">
                <input
                  type="url"
                  value={image.startsWith('data:') ? '' : image}
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={`Gallery image ${index + 1} URL`}
                  disabled={image.startsWith('data:')}
                />
                <label className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 mr-1" />
                  <span className="text-sm">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleFileUpload('images', index, e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </label>
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
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
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