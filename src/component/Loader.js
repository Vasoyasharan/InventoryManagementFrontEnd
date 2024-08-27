import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Loader.css";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Show loader when the route changes
    handleStart();

    // Hide loader after a delay when route change is complete
    setTimeout(() => handleComplete(), 2000);

  }, [location]);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
