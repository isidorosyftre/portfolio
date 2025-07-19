import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const LogoEditor = ({ siteData, onSave, onClose }) => {
  const [logoText, setLogoText] = useState(siteData.logo || '');
  const [logoImage, setLogoImage] = useState(siteData.logoImage || null);

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (file) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const base64 = await convertToBase64(file);
        setLogoImage(base64);
      } catch (error) {
        alert('Error uploading image. Please try again.');
      }
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleSave = () => {
    onSave({
      logo: logoText,
      logoImage: logoImage
    });
    onClose();
  };

  const clearImage = () => {
    setLogoImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-black rounded-lg shadow-xl max-w-md w-full border-2 border-black dark:border-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Logo
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Preview</h3>
            <div className="flex justify-center">
              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt="Logo Preview" 
                  className="h-16 w-16 object-contain border border-gray-300 dark:border-gray-600"
                />
              ) : (
                <div className="h-16 w-16 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-lg font-bold border border-gray-300 dark:border-gray-600">
                  {logoText || 'LOGO'}
                </div>
              )}
            </div>
          </div>

          {/* Text Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Text Logo
            </label>
            <input
              type="text"
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-white"
              placeholder="Enter logo text"
              maxLength="4"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max 4 characters</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo Image
            </label>
            <div className="flex space-x-2">
              <label className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>
              {logoImage && (
                <button
                  onClick={clearImage}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Image will override text logo
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors"
          >
            Save Logo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoEditor;