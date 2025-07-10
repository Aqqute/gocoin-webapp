import { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";
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

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Toaster
        position="top-center"
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
      ) : !onboardingComplete ? (
        <Onboarding
          onAccept={() => setOnboardingComplete(true)}
          theme={theme}
        />
      ) : (
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/board" element={<Board />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/activities" element={<Activity />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/wallet" element={<ManageWallet />} />
        </Routes> 
      )}
    </>
  );
}

export default App;
