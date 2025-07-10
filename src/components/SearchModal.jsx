import React, { useEffect, useState } from "react";

const SearchModal = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
      <div
        className={`absolute top-0 left-0 right-0 mx-auto max-w-md w-full transition-transform duration-300 ease-in-out ${
          show ? "translate-y-8" : "-translate-y-full"
        }`}
      >
        <div className="bg-white rounded-xl shadow-lg p-4 mt-4 mx-4 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
          >
            &times;
          </button>

          {/* Title */}
          <h2 className="text-base font-semibold mb-3 text-gray-800">Quick Search</h2>

          {/* Input */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
