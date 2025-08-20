import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400 ${className}`}
    {...props}
  />
));