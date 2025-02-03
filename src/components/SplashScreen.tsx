import React, { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import SplashImg from "../assets/images/bg1.png";
import Logo from "../assets/images/logo1.png";
import LogoType from "../assets/images/logotype.png";
import "../assets/styles/Splash.css";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Trigger onFinish after fade out animation
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <IonContent>
      <div className={`splash-container ${fadeOut ? "fade-out" : ""}`}>
        <img src={SplashImg} alt="Splash Image" className="splash-img" />
        <img src={Logo} alt="Logo" width="219px" height="220" />
        <img src={LogoType} alt="Logo Type" className="logotype2" />
      </div>
    </IonContent>
  );
};

export default SplashScreen;
