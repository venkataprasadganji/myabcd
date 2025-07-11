// src/components/ui/Tabs.jsx
import React from 'react';

export const Tabs = ({ value, onValueChange, children, className = '' }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          isActive: child.props.value === value,
          onClick: () => onValueChange(child.props.value),
        })
      )}
    </div>
  );
};

export const Tab = ({ children, value, icon, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {icon}
    {children}
  </button>
);
