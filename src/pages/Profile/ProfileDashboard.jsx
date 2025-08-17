import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import PageLoader from '../components/PageLoader';
import DesktopSidebar from '../components/DesktopSidebar';
import DesktopHeader from '../components/DesktopHeader';

// Sub-components for the right pane
import ProfileSettingsMenu from './ProfileSettingsMenu'; // Renamed and modified
import Activity from './Activity'; // Modified
import ChangePassword from './ChangePassword'; // Modified
import PrivacySettings from './PrivacySettings'; // New
import ManageWallet from './ManageWallet'; // New

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token, logout } = useAuth();
  const isDark = theme === 'dark';

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  // 'activities' is the default view as per the image
  const [activeSection, setActiveSection] = useState('activities'); 
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://gocoin.onrender.com/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user || {});
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to load user data.");
        // Optionally redirect to login if token is invalid
        // logout(); // Uncomment to force logout on error
        // navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
      navigate('/login'); // Redirect if no token
    }
  }, [token, navigate, logout]);

  const handleLogout = () => {
    setLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setLogoutModal(false);
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'activities':
        return <Activity />;
      case 'wallet':
        return <ManageWallet />;
      case 'password':
        return <ChangePassword />;
      case 'privacy':
        return <PrivacySettings />;
      // Add other cases for notifications, referrals, terms if created
      case 'notifications':
        return <div className="p-4">Notifications content...</div>;
      case 'referrals':
        return <div className="p-4">Referrals content...</div>;
      case 'terms':
        return <div className="p-4">Terms of Service content...</div>;
      default:
        // Default to Activity if an unknown section is active or for 'profile' card click
        return <Activity />;
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Left Fixed Sidebar */}
      <DesktopSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header (Search, Filters, Icons) */}
        <DesktopHeader title="Profile settings" />

        {/* Two-pane content */}
        <div className="flex flex-1 p-6 gap-6"> {/* Padding and gap for content */}
          {/* Left Profile Settings Menu */}
          <div className={`w-1/3 min-w-[300px] ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#f9f9f9]'} rounded-xl p-4 shadow-sm`}>
            <ProfileSettingsMenu 
              user={user} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              toggleTheme={toggleTheme} 
              handleLogout={handleLogout} 
              navigate={navigate} // Pass navigate for direct page navigation if needed
            />
          </div>

          {/* Right Content Pane */}
          <div className={`flex-1 ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#f9f9f9]'} rounded-xl p-4 shadow-sm`}>
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            className={`w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col space-y-4 ${
              isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <AlertTriangle className="text-yellow-500" size={36} />
              <h2 className="text-lg font-semibold">Confirm Logout</h2>
            </div>
            <p className="text-sm text-center">
              Are you sure you want to logout? You will have to login again to access your account.
            </p>
            <div className="flex flex-col justify-between gap-3 pt-2">
              <button
                onClick={confirmLogout}
                className="w-full px-4 py-2 rounded-3xl text-sm font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => setLogoutModal(false)}
                className={`w-full px-4 py-2 rounded-3xl text-sm font-medium border ${isDark ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-400 text-black hover:bg-gray-100'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;