import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const TermsOfService = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    // You can also call an API here to record acceptance
    // e.g. axios.post("/api/users/accept-terms")
  };

  return (
    <div
      className={`flex flex-col h-full rounded-xl p-6 shadow-sm ${
        isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f9f9f9] text-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">Terms of Service</h2>

      {/* Scrollable terms text */}
      <div className="flex-1 overflow-y-auto pr-2 mb-4">
        <p className="mb-3 text-sm leading-relaxed">
          Welcome to our crypto application. By using our services, you agree
          to the following terms:
        </p>
        <ol className="list-decimal ml-5 space-y-2 text-sm leading-relaxed">
          <li>
            <strong>Eligibility:</strong> You must be at least 18 years old to
            use this platform.
          </li>
          <li>
            <strong>Wallet Security:</strong> You are solely responsible for
            securing your private keys and wallet information.
          </li>
          <li>
            <strong>Transactions:</strong> All crypto transactions are
            irreversible. Please confirm all details before sending funds.
          </li>
          <li>
            <strong>Compliance:</strong> You agree to comply with all applicable
            laws and regulations in your jurisdiction.
          </li>
          <li>
            <strong>No Liability:</strong> We are not responsible for any losses
            due to market volatility, user error, or third-party service
            failures.
          </li>
          <li>
            <strong>Updates:</strong> We may update these terms from time to
            time. Continued use of the app indicates acceptance of the new
            terms.
          </li>
        </ol>

        <p className="mt-3 text-sm leading-relaxed">
          By clicking "Accept", you confirm that you have read and agree to the
          Terms of Service.
        </p>
      </div>

      {/* Accept/Decline buttons */}
      {!accepted ? (
        <div className="flex justify-end gap-3">
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-[#F58300] text-white hover:bg-orange-600"
          >
            Accept
          </button>
          <button
            onClick={() => alert("You must accept the terms to continue.")}
            className={`px-4 py-2 rounded-lg border ${
              isDark
                ? "border-gray-600 text-white hover:bg-gray-700"
                : "border-gray-400 text-black hover:bg-gray-100"
            }`}
          >
            Decline
          </button>
        </div>
      ) : (
        <p className="text-green-500 text-sm font-medium">
          ✅ You have accepted the Terms of Service
        </p>
      )}
    </div>
  );
};

export default TermsOfService;
