import React, { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    stateRegion: ''
  });

  const handleBack = () => navigate('/profile');
  const handleEditImage = () => console.log("Edit profile image");
  const handleSaveChanges = () => console.log("Save changes", formData);
  const handleCancel = () => console.log("Cancel changes");

  const cardStyle = `${isDark ? 'bg-[#2a2a2a]' : 'bg-white shadow-sm'} rounded-xl p-2`;

  return (
    <div className={`h-screen flex flex-col justify-between ${isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f9f9f9] text-black'}`}>
      
      {/* Header */}
      <div className="flex items-center px-3 pb-2 p-4 pt-10">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} className={isDark ? 'text-white' : 'text-black'} />
        </button>
        <h1 className="text-base font-medium">Edit Profile</h1>
      </div>

      {/* Profile image & name */}
      <div className="flex flex-col items-center px-3">
        <div className="relative mb-2">
          <div className="w-16 h-16 bg-orange-500 rounded-full overflow-hidden">
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleEditImage}
            className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow"
          >
            <Camera size={12} className="text-black" />
          </button>
        </div>

        <h2 className="text-sm font-semibold mt-1 mb-1">Username</h2>
        <button
          onClick={handleEditImage}
          className="text-xs text-orange-500 hover:underline"
        >
          Edit profile image
        </button>
      </div>

      {/* Form fields */}
      <div className="px-4 py-6 space-y-2">
        {['username', 'email', 'country', 'stateRegion'].map((field) => (
          <div key={field} className={cardStyle}>
            <input
              type={field === 'email' ? 'email' : 'text'}
              placeholder={
                field === 'stateRegion'
                  ? 'State/Region'
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className={`w-full bg-transparent outline-none placeholder-gray-400 text-xs ${
                isDark ? 'text-white' : 'text-black'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="px-3 space-y-2 pb-4 mt-2">
        <button
          onClick={handleSaveChanges}
          className="w-full bg-orange-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-[#b67300]"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className={`w-full py-2 text-sm font-medium rounded-xl ${
            isDark ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'
          }`}
        >
          Cancel
        </button>
        <div className="flex justify-center pt-1">
          <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
