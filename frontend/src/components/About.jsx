import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Instagram, Linkedin, Edit2, Save, X, Upload, Moon, Sun } from 'lucide-react';
import { mockAboutData } from '../data/mockData';

const About = () => {
  const [aboutData, setAboutData] = useState(mockAboutData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(mockAboutData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode to document
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleEditToggle = () => {
    const password = prompt('Enter password to enable edit mode:');
    if (password === 'rafa2005') {
      setIsEditMode(!isEditMode);
      setEditData(aboutData);
    } else if (password !== null) {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    setAboutData(editData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditData(aboutData);
    setIsEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePhotoUpload = async (file) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const base64 = await convertToBase64(file);
        setEditData(prev => ({
          ...prev,
          profilePhoto: base64
        }));
      } catch (error) {
        alert('Error uploading image. Please try again.');
      }
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleSocialChange = (platform, value) => {
    setEditData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
  };

  const handleSkillChange = (index, value) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addSkill = () => {
    setEditData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setEditData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setEditData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', period: '' }]
    }));
  };

  const removeExperience = (index) => {
    setEditData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const displayData = isEditMode ? editData : aboutData;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 z-30 mt-16 transition-colors">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">About</h1>
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {isEditMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 px-3 py-2 md:px-4 md:py-2 bg-green-500 text-white hover:bg-green-600 transition-colors text-xs md:text-sm"
                >
                  <Save className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-1 px-3 py-2 md:px-4 md:py-2 bg-gray-500 text-white hover:bg-gray-600 transition-colors text-xs md:text-sm"
                >
                  <X className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEditToggle}
                className="flex items-center space-x-1 px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-xs md:text-sm"
              >
                <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6">
              {displayData.profilePhoto ? (
                <img
                  src={displayData.profilePhoto}
                  alt={displayData.name}
                  className="w-full h-full rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-2xl md:text-4xl text-gray-600 dark:text-gray-300 font-bold">
                  {displayData.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              
              {isEditMode && (
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                  <Upload className="w-3 h-3 md:w-4 md:h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleProfilePhotoUpload(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {isEditMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl md:text-4xl font-bold text-center w-full border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-400 text-center w-full border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent"
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{displayData.name}</h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 transition-colors">{displayData.title}</p>
              </>
            )}
          </div>

          {/* Bio Section */}
          <div className="mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">About Me</h2>
            {isEditMode ? (
              <textarea
                value={editData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed border border-gray-300 dark:border-gray-600 rounded-md p-4 focus:border-blue-500 outline-none bg-white dark:bg-gray-800"
              />
            ) : (
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors">{displayData.bio}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Contact Details */}
            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors">Contact</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  {isEditMode ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-sm md:text-base text-gray-900 dark:text-white"
                    />
                  ) : (
                    <a href={`mailto:${displayData.email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm md:text-base break-all">
                      {displayData.email}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  {isEditMode ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-sm md:text-base text-gray-900 dark:text-white"
                    />
                  ) : (
                    <a href={`tel:${displayData.phone}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm md:text-base">
                      {displayData.phone}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-sm md:text-base text-gray-900 dark:text-white"
                    />
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base transition-colors">{displayData.location}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  {isEditMode ? (
                    <input
                      type="url"
                      value={editData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-sm md:text-base text-gray-900 dark:text-white"
                    />
                  ) : (
                    <a href={`https://${displayData.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm md:text-base break-all">
                      {displayData.website}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors">Social</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-3">
                  <Instagram className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editData.social.instagram}
                      onChange={(e) => handleSocialChange('instagram', e.target.value)}
                      className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-sm md:text-base text-gray-900 dark:text-white"
                    />
                  ) : (
                    <a href={`https://instagram.com/${displayData.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors text-sm md:text-base">
                      {displayData.social.instagram}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editData.social.linkedin}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-sm md:text-base text-gray-900 dark:text-white"
                    />
                  ) : (
                    <a href={`https://linkedin.com/in/${displayData.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm md:text-base">
                      {displayData.social.linkedin}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editData.social.behance}
                      onChange={(e) => handleSocialChange('behance', e.target.value)}
                      className="flex-1 border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent text-sm md:text-base text-gray-900 dark:text-white"
                    />
                  ) : (
                    <a href={`https://behance.net/${displayData.social.behance}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm md:text-base">
                      {displayData.social.behance}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '800ms' }}>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {displayData.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  {isEditMode ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:border-blue-500 outline-none text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors">
                      {skill}
                    </span>
                  )}
                </div>
              ))}
              {isEditMode && (
                <button
                  onClick={addSkill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                >
                  + Add Skill
                </button>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="animate-slide-up" style={{ animationDelay: '1000ms' }}>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 transition-colors">Experience</h3>
            <div className="space-y-6">
              {displayData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-200 dark:border-gray-700 pl-6 relative transition-colors">
                  <div className="absolute w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full -left-2 top-2 transition-colors"></div>
                  {isEditMode ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className="font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent"
                          placeholder="Company"
                        />
                        <button
                          onClick={() => removeExperience(index)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                        className="text-gray-700 dark:text-gray-300 w-full border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent"
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                        className="text-gray-500 dark:text-gray-400 text-sm w-full border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none bg-transparent"
                        placeholder="Period"
                      />
                    </div>
                  ) : (
                    <>
                      <h4 className="font-semibold text-gray-900 dark:text-white transition-colors">{exp.company}</h4>
                      <p className="text-gray-700 dark:text-gray-300 transition-colors">{exp.role}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">{exp.period}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditMode && (
                <button
                  onClick={addExperience}
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  + Add Experience
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;