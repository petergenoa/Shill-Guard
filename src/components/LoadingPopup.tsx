import React, { useEffect } from 'react';
import "./styled/LoadingPopup.css";
import LoadingImage from "../assets/logo-blue.png";

interface LoadingPopupProps {
  isVisible: boolean;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ isVisible }) => {
  
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="loading-popup-content">
        <div className="loading-title">
            <img src={LoadingImage} alt="loading-image" />
            <h1>Loading...</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup;
