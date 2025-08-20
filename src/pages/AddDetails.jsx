import React, { useState } from "react";
import { 
  CheckCircle, 
  Loader2, 
  User, 
  Phone, 
  Globe, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Send,
  ArrowLeft,
  Edit3
} from "lucide-react";

const fields = [
  { 
    key: "telegram", 
    label: "Telegram", 
    placeholder: "@username", 
    endpoint: "/api/user/socials/telegram",
    icon: Send,
    category: "social"
  },
  { 
    key: "facebook", 
    label: "Facebook", 
    placeholder: "Facebook profile URL", 
    endpoint: "/api/user/socials/facebook",
    icon: Facebook,
    category: "social"
  },
  { 
    key: "twitter", 
    label: "Twitter", 
    placeholder: "@username", 
    endpoint: "/api/user/socials/twitter",
    icon: Twitter,
    category: "social"
  },
  { 
    key: "instagram", 
    label: "Instagram", 
    placeholder: "@username", 
    endpoint: "/api/user/socials/instagram",
    icon: Instagram,
    category: "social"
  },
  { 
    key: "phone", 
    label: "Phone Number", 
    placeholder: "+234 801 234 5678", 
    endpoint: "/api/user/phone",
    icon: Phone,
    category: "contact"
  },
  { 
    key: "country", 
    label: "Country", 
    placeholder: "Select country", 
    endpoint: "/api/user/country",
    icon: Globe,
    category: "location"
  },
  { 
    key: "state", 
    label: "State/Region", 
    placeholder: "Enter state or region", 
    endpoint: "/api/user/state",
    icon: MapPin,
    category: "location"
  },
];

const AddDetails = () => {
  // Mock theme context for demo
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const [values, setValues] = useState({});
  const [status, setStatus] = useState({}); // idle | saving | success | error
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = async (field) => {
    if (!values[field.key]) return;

    try {
      setStatus((prev) => ({ ...prev, [field.key]: "saving" }));
      
      // Mock API call - replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus((prev) => ({ ...prev, [field.key]: "success" }));

      // Reset after 2s
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, [field.key]: "idle" }));
      }, 2000);
    } catch (err) {
      setStatus((prev) => ({ ...prev, [field.key]: "error" }));
      // Reset error after 3s
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, [field.key]: "idle" }));
      }, 3000);
    }
  };

  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      // Mock API calls - replace with your actual API endpoints
      const fieldsToSave = fields.filter(field => values[field.key]);
      
      for (let field of fieldsToSave) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Show success for all fields
      const successStatus = {};
      fields.forEach(field => {
        if (values[field.key]) {
          successStatus[field.key] = "success";
        }
      });
      setStatus(successStatus);

      // Reset after 2s
      setTimeout(() => {
        setStatus({});
      }, 2000);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedFields = {
    social: fields.filter(f => f.category === "social"),
    contact: fields.filter(f => f.category === "contact"),
    location: fields.filter(f => f.category === "location")
  };

  const getStatusIcon = (fieldKey) => {
    const currentStatus = status[fieldKey];
    switch (currentStatus) {
      case "saving":
        return <Loader2 className="animate-spin text-orange-500" size={20} />;
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "error":
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-500 text-xs font-medium">Failed</span>
          </div>
        );
      default:
        return null;
    }
  };

  const containerStyle = `min-h-screen ${
    isDark 
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
      : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
  }`;

  const cardStyle = `${
    isDark 
      ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" 
      : "bg-white border-gray-200"
  } backdrop-blur-sm shadow-lg rounded-2xl border transition-all duration-300 hover:shadow-xl`;

  const inputWrapperStyle = `relative flex items-center gap-3 ${
    isDark 
      ? "bg-gray-700/50 border-gray-600 focus-within:border-orange-500" 
      : "bg-gray-50/80 border-gray-300 focus-within:border-orange-500"
  } rounded-xl border-2 transition-all duration-200 focus-within:shadow-md`;

  const inputStyle = `flex-1 bg-transparent px-4 py-3.5 text-sm font-medium focus:outline-none ${
    isDark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
  }`;

  const iconStyle = `flex-shrink-0 ${
    isDark ? "text-gray-400" : "text-gray-500"
  } transition-colors duration-200`;

  const sectionTitleStyle = `text-lg font-semibold mb-4 flex items-center gap-2 ${
    isDark ? "text-white" : "text-gray-900"
  }`;

  const hasValues = Object.keys(values).some(key => values[key]);

  return (
    <div className={containerStyle}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <button className={`p-2 rounded-xl ${
              isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
            } border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } transition-colors duration-200`}>
              <ArrowLeft size={20} className={isDark ? "text-gray-300" : "text-gray-600"} />
            </button>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Edit Profile
              </h1>
              <p className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              } mt-1`}>
                Step 3/5 • Complete your profile information
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-2 bg-orange-500 rounded-full flex-1 max-w-xs"></div>
            <span className={`text-xs font-medium ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              60% Complete
            </span>
          </div>
        </div>

        {/* Social Media Section */}
        <div className={`${cardStyle} p-6 md:p-8 mb-6`}>
          <h2 className={sectionTitleStyle}>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Edit3 size={18} className="text-orange-600 dark:text-orange-400" />
            </div>
            Social Media Accounts
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {groupedFields.social.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="space-y-2">
                  <label className={`block text-sm font-semibold ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {field.label}
                  </label>
                  <div className={inputWrapperStyle}>
                    <Icon size={18} className={iconStyle} />
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      onBlur={() => handleBlur(field)}
                      className={inputStyle}
                    />
                    <div className="flex-shrink-0 w-6 flex justify-center">
                      {getStatusIcon(field.key)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Location Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Information */}
          <div className={`${cardStyle} p-6 md:p-8`}>
            <h2 className={sectionTitleStyle}>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Phone size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              Contact Information
            </h2>
            <div className="space-y-6">
              {groupedFields.contact.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {field.label}
                    </label>
                    <div className={inputWrapperStyle}>
                      <Icon size={18} className={iconStyle} />
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={values[field.key] || ""}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        onBlur={() => handleBlur(field)}
                        className={inputStyle}
                      />
                      <div className="flex-shrink-0 w-6 flex justify-center">
                        {getStatusIcon(field.key)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location Information */}
          <div className={`${cardStyle} p-6 md:p-8`}>
            <h2 className={sectionTitleStyle}>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Globe size={18} className="text-green-600 dark:text-green-400" />
              </div>
              Location Details
            </h2>
            <div className="space-y-6">
              {groupedFields.location.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {field.label}
                    </label>
                    <div className={inputWrapperStyle}>
                      <Icon size={18} className={iconStyle} />
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={values[field.key] || ""}
                        onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                        onBlur={() => handleBlur(field)}
                        className={inputStyle}
                      />
                      <div className="flex-shrink-0 w-6 flex justify-center">
                        {getStatusIcon(field.key)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-4 mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {hasValues ? "Changes will be saved automatically" : "Fill in your details to continue"}
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isDark 
                ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
            } flex-1 sm:flex-none`}>
              Skip for now
            </button>
            
            <button
              onClick={handleSaveAll}
              disabled={!hasValues || isLoading}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 flex-1 sm:flex-none ${
                hasValues && !isLoading
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;