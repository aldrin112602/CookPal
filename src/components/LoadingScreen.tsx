import React from "react";
import { IonContent } from "@ionic/react";
import Logo from "../assets/images/logo1.png";

const LoadingScreen: React.FC = () => {
  return (
    <IonContent className="loading-container" fullscreen>
      <style>
        {`
          .loading-container {
            height: 100vh;
          }

          .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(80, 54, 2, 0.66);
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-top: 1rem;
          }

          .loading-text {
            color:rgb(85, 59, 6);
            font-size: 1.1rem;
            animation: pulse 1.5s ease-in-out infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .logo {
            width: 100px;
            height: auto;
          }
        `}
      </style>

      <div className="loading-content">
        <img loading="lazy"  src={Logo} alt="Logo" className="logo" />
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    </IonContent>
  );
};

export default LoadingScreen;
