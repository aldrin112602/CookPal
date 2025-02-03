import {
  IonContent,
  IonPage,
  IonInput,
  IonInputPasswordToggle as IonInputPassword,
  IonButton,
  IonIcon,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import Intro from "../components/Intro";
import SplashScreen from "../components/SplashScreen";
import Logo2 from "../assets/images/logo2.png";
const INTRO_KEY = "intro-seen";

export const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(false);
  const [splash, setSplash] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    (async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    })();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await present("Logging in...");
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
    <IntroOrLogin
      introSeen={introSeen}
      handleLogin={handleLogin}
      handleFinishIntro={handleFinishIntro}
      handleSeeIntroAgain={handleSeeIntroAgain}
    />
  );
};

const IntroOrLogin: React.FC<{
  introSeen: boolean;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
  handleFinishIntro: () => Promise<void>;
  handleSeeIntroAgain: () => Promise<void>;
}> = ({ introSeen, handleLogin, handleFinishIntro, handleSeeIntroAgain }) => {
  return !introSeen ? (
    <Intro onFinish={handleFinishIntro} />
  ) : (
    <IonPage>
      <IonContent className="login-page" scrollY={true}>
        <style>
          {`
            .login-page {
              --background:rgb(245, 244, 241);
            }

            .top-section {
              background: #ECD659;
              border-radius: 0 0  50px 50px;
              padding: 2rem;
              padding-bottom: 5px;
              position: relative;
              padding-top: 0.5rem;
            }

            .logo-circle {
              background: #ECD659;
              width: 160px;
              height: 160px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              right: 1.2rem;
              top: 80%;
            }

            .welcome-text {
              font-size: 90px;
              font-weight: bold;
              color: #222;
              line-height: 85px;
              letter-spacing: -5%;
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
              --border-radius: 8px;
              margin-bottom: 1rem;
              background: #ffffff;
            }

            

            .login-button {
              --background: #000000;
              --color: #ECD659;
              margin: 1rem 0;
              --border-radius: 4px;
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
          <div className="logo-circle">
            <img src={Logo2} alt="Logo" width="130" />
          </div>
          <h1 className="welcome-text">
            Hey
            <br />
            There
            <br />
            Pal!
          </h1>
          <p className="subtitle">Please Sign In to continue.</p>
        </div>

        <div className="form-container" style={{ marginTop: "50px" }}>
          <form onSubmit={handleLogin}>
            <div className="input-label">Email/Username</div>
            <IonInput
              mode="md"
              type="email"
              fill="outline"
              placeholder="Enter your email or username"
              required
            />

            <div className="input-label">Password</div>
            <IonInput
              mode="md"
              type="password"
              required
              fill="outline"
              placeholder="Enter your password"
            >
              <IonInputPassword slot="end" color="medium"></IonInputPassword>
            </IonInput>

            <IonButton expand="block" className="login-button" type="submit">
              Sign In
              <IonIcon icon={logInOutline} slot="end"/>
            </IonButton>

            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <a
                href="/signup"
                className="signup-link"
                style={{ cursor: "pointer", textDecoration: "underline", display: "inline-block" }}
              >
                Sign Up
              </a>
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
