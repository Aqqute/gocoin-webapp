import { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import Onboarding from "./components/Onboarding";
import ThemeSelector from "./components/ThemeSelector";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Board from "./pages/Board";
import Profile from "./pages/Profile";
import Activity from "./pages/Profile/Activity";
import EditProfile from "./pages/Profile/EditProfile";
import ManageWallet from "./pages/Profile/ManageWallet";
import Notifications from "./components/Notifications";
import BoardActivity from "./pages/Board/Activity";
import NotificationsSettings from "./pages/Profile/NotificationSettings";
import PrivacySettings from "./pages/Profile/PrivacySettings";
import Referrals from "./pages/Profile/Referrals";
import ResetPassword from "./pages/ResetPassword";

import Withdraw from "./pages/Wallet/Withdraw";
import TaskDetails from "./pages/Home/TaskDetails";
import ChangePassword from "./pages/Profile/ChangePassword";
import Swap from "./pages/Wallet/Swap"
import SendPayment from "./pages/Wallet/SendPayment"
import AddDetails from "./pages/AddDetails";


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#1e1f28" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            border: theme === "dark" ? "1px solid #333" : "1px solid #ddd",
          },
        }}
      />

      {!isLoaded ? (
        <Loading onComplete={() => setIsLoaded(true)} />
      ) : !theme ? (
        <ThemeSelector onSelect={setTheme} />
      // ) : needsMoreInfo ? ( 
      //   <Signup stepOverride={3} />
      ) : isAuthenticated || onboardingComplete ? (
        <Routes>
          <Route
            path="/"
            element={
              <div
                className={`text-center text-2xl ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <Home />
              </div>
            }
          />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/withdraw" element={<Withdraw />} />
          <Route path="/wallet/swap" element={<Swap/>}/>
          <Route path="/wallet/send" element={<SendPayment/>}/>
          <Route path="/board" element={<Board />} />
          <Route path="/board/activity" element={<BoardActivity />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/profile/activities" element={<Activity />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/wallet" element={<ManageWallet />} />
          <Route
            path="/profile/notifications"
            element={<NotificationsSettings />}
          />
          <Route path="/profile/privacy" element={<PrivacySettings />} />
          <Route path="/profile/referrals" element={<Referrals />} />
          <Route path="/profile/password" element={<ChangePassword />} />
          <Route path="/add-details" element={<AddDetails />} />
        </Routes>
      ) : (
        <Onboarding
          onAccept={() => setOnboardingComplete(true)}
          theme={theme}
        />
      )}
    </>
  );
}

export default App;
