// src/components/NavigationButtons.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationButtons() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <button
        onClick={() => navigate(-1)}
        title="Go Back"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg shadow-md transition-transform hover:scale-110"
      >
        ⬅
      </button>

      <button
        onClick={() => navigate(1)}
        title="Go Forward"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white text-lg shadow-md transition-transform hover:scale-110"
      >
        ➡
      </button>

      <button
        onClick={handleLogout}
        title="Logout"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white text-lg shadow-md transition-transform hover:scale-110"
      >
        🚪
      </button>
    </div>
  );
}
