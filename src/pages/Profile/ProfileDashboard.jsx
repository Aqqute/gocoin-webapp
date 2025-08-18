import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';

import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import PageLoader from '../../components/PageLoader';
import DesktopSidebar from '../../components/DesktopSidebar';
import DesktopHeader from '../../components/DesktopHeader';

// Sub-components for the right pane
import ProfileSettingsMenu from './ProfileSettingsMenu'; // Renamed and modified
import Activity from './Activity'; // Modified
import ChangePassword from './ChangePassword'; // Modified
import PrivacySettings from './PrivacySettings'; // New
import ManageWallet from './ManageWallet'; // New
import Referrals from './Referrals';
import Notifications from './NotificationSettings';
import TermsOfService from './Terms';

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
        return <Notifications />;
      case 'referrals':
        return <Referrals />;
      case 'terms':
        return <TermsOfService />;
      default:
        // Default to Activity if an unknown section is active or for 'profile' card click
        return <Activity />;
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <DesktopSidebar />
      <div
        className={`flex min-h-screen ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        } ml-[254px]`}
      >
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <DesktopHeader title="Profile settings" />

          {/* Two-pane content */}
          <div className="flex flex-1 p-6 gap-6">
            {/* Left Profile Settings Menu */}
            <div
              className={`w-1/3 min-w-[300px] ${
                isDark ? "bg-[#1e1e1e]" : "bg-[#f9f9f9]"
              } rounded-xl p-4 shadow-sm`}
            >
              <ProfileSettingsMenu
                user={user}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                toggleTheme={toggleTheme}
                handleLogout={handleLogout}
                navigate={navigate}
              />
            </div>

            {/* Right Content Pane */}
            <div
              className={`flex-1 ${
                isDark ? "bg-[#1e1e1e]" : "bg-[#f9f9f9]"
              } rounded-xl p-4 shadow-sm`}
            >
              {renderContent()}
            </div>
          </div>
        </div>
        {/* Logout Confirmation Modal */}
        {logoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className={`rounded-xl p-6 shadow-lg w-full max-w-sm ${isDark ? 'bg-[#232323] text-white' : 'bg-white text-black'}`}>
              <div className="flex flex-col items-center gap-3">
                <AlertTriangle size={40} className="text-orange-500 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
                <p className="mb-4 text-center">Are you sure you want to logout?</p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={confirmLogout}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full font-semibold"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setLogoutModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-full font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;