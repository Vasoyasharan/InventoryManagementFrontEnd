import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {FaSpinner } from "react-icons/fa";
import "../Css/Loader.css";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Show loader on route change
    handleStart();

    // Hide loader after a delay
    const timeout = setTimeout(() => handleComplete(), 100);

    return () => clearTimeout(timeout);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content"><div className="loader-spinner">
          <FaSpinner className="spinner-icon" />
        </div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
