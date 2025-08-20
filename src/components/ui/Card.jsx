import React from "react";

export const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white dark:bg-[#18181b] rounded-xl shadow ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`border-b px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-lg font-bold ${className}`} {...props}>
    {children}
  </h2>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);