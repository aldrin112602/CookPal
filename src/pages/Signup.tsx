import {
  IonContent,
  IonPage,
  IonInput,
  IonInputPasswordToggle as IonInputPassword,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  useIonLoading,
  IonRouterLink,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  checkmarkDone,
} from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import Intro from "../components/Intro";
import SplashScreen from "../components/SplashScreen";
import LogoType from "../assets/images/logotype.png";
const INTRO_KEY = "intro-seen";

export const Signup: React.FC = () => {
  const [introSeen, setIntroSeen] = useState(false);
  const [splash, setSplash] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    (async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    })();
  }, []);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await present("Thank you for signingup, please wait...");
    setTimeout(async () => {
      await dismiss();
      // router.push("/app", "root");
    }, 2000);
  };

  const handleFinishIntro = async () => {
    setIntroSeen(true);
    await Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const handleSeeIntroAgain = async () => {
    setIntroSeen(false);
    await Preferences.remove({ key: INTRO_KEY });
  };

  return splash ? (
    <SplashScreen onFinish={() => setSplash(false)} />
  ) : (
    <IntroOrSignup
      introSeen={introSeen}
      handleSignup={handleSignup}
      handleFinishIntro={handleFinishIntro}
      handleSeeIntroAgain={handleSeeIntroAgain}
    />
  );
};

const IntroOrSignup: React.FC<{
  introSeen: boolean;
  handleSignup: (event: React.FormEvent<HTMLFormElement>) => void;
  handleFinishIntro: () => Promise<void>;
  handleSeeIntroAgain: () => Promise<void>;
}> = ({ introSeen, handleSignup, handleFinishIntro, handleSeeIntroAgain }) => {
  return !introSeen ? (
    <Intro onFinish={handleFinishIntro} />
  ) : (
    <IonPage>
      <IonContent
        className="login-page"
        scrollY={true}
        fullscreen
        style={{ overFlowY: "auto !important" }}
      >
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="12" sizeMd="6" sizeLg="4" sizeXl="4">
              <style>
                {`
              .login-page {
                --background:rgb(245, 244, 241);
                min-height: 100vh;
              }
  
              .top-section {
                background: #ECD659;
                border-radius: 0 0  50px 50px;
                padding: 2rem;
                padding-bottom: 5px;
                position: relative;
                padding-top: 0.5rem;
              }
  
  
              .welcome-text {
                font-size: 50px;
                font-weight: bold;
                color: #222;
                line-height: 85px;
                letter-spacing: -5%;
                text-align: center;
              }
  
              .subtitle {
                color: #222;
                font-weight: semi-bold;
                line-height: 40px;
                font-size: 14px;
                margin-top: -0.5rem;
              }
  
              .form-container {
                padding: 2rem;
              }
  
              .input-label {
                color: #222;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
              }
  
              ion-input {
                background: #ffffff;
                --border-radius: 15px !important;
                margin-bottom: 1rem;
                
              }
  
              
  
              .login-button {
                --background: #000000;
                --color: #ECD659;
                margin: 1rem 0;
                --border-radius: 15px;
                height: 50px;
                text-transform: none;
  
              }
  
              .signup-link {
                color:rgb(207, 180, 23);
                text-decoration: none;
                text-align: center;
                display: block;
              }
            `}
              </style>

              <div className="top-section">
                <h1 className="welcome-text">Welcome to</h1>
                <img
                  src={LogoType}
                  alt="CookPal Logo type"
                  width="50%"
                  style={{ display: "block", margin: "0 auto" }}
                />
                <br />
                <p className="subtitle">Please Sign Up to continue.</p>
              </div>

              <div className="form-container" style={{ marginTop: "1rem" }}>
                <form onSubmit={handleSignup}>
                  <div className="input-label">Full Name</div>
                  <IonInput
                    mode="md"
                    type="text"
                    fill="outline"
                    placeholder="Enter your full name"
                    required
                  />

                  <div className="input-label">Email Address</div>
                  <IonInput
                    mode="md"
                    type="email"
                    fill="outline"
                    placeholder="Enter your email"
                    required
                  />

                  <div className="input-label">Username</div>
                  <IonInput
                    mode="md"
                    type="text"
                    fill="outline"
                    placeholder="Create a username"
                    required
                  />

                  <div className="input-label">Password</div>
                  <IonInput
                    mode="md"
                    type="password"
                    required
                    fill="outline"
                    placeholder="Enter a secure password"
                  >
                    <IonInputPassword
                      slot="end"
                      color="medium"
                    ></IonInputPassword>
                  </IonInput>

                  <IonButton
                    expand="block"
                    className="login-button"
                    type="submit"
                  >
                    Create Account
                    <IonIcon icon={checkmarkDone} slot="end" />
                  </IonButton>

                  <p style={{ textAlign: "center" }}>
                    Already have an account?{" "}
                    <IonRouterLink
                      href="/"
                      className="signup-link"
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        display: "inline-block",
                      }}
                    >
                      Sign In
                    </IonRouterLink>
                  </p>

                  <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    <a
                      style={{
                        cursor: "pointer",
                        color: "#aaa",
                        textDecoration: "none",
                      }}
                      onClick={handleSeeIntroAgain}
                    >
                      See Intro Again
                    </a>
                  </p>
                </form>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
