import {
  IonContent,
  IonPage,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  useIonLoading,
  IonRouterLink,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { eye, eyeOff, logInOutline } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import Intro from "../components/Intro";
import SplashScreen from "../components/SplashScreen";
import Logo2 from "../assets/images/logo2.png";
import axios from "axios";

const INTRO_KEY = "intro-seen";
const BASE_URL_API =
  import.meta.env.VITE_BASE_URL_API || "http://localhost:8000/api";

export const Login: React.FC = () => {
  const [introSeen, setIntroSeen] = useState(false);
  const [splash, setSplash] = useState(true);
  const [present, dismiss] = useIonLoading();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [reqError, setReqError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    (async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    })();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await present("Logging in...");

    try {
      const response: any = await axios.post(`${BASE_URL_API}/login`, {
        user,
        password,
      });
      if (response.data?.error) {
        setReqError(response.data?.error);
        return;
      }
      setReqError(null)
      setIsValid(true)
    } catch (error: any) {
      setReqError(error.message);
    } finally {
      await dismiss();
    }
  };

  return splash ? (
    <SplashScreen onFinish={() => setSplash(false)} />
  ) : !introSeen ? (
    <Intro onFinish={() => setIntroSeen(true)} />
  ) : (
    <IonPage>
      <IonContent
        className="login-page"
        scrollY={true}
        fullscreen
        style={{ overflowY: "auto" }}
      >
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="12" sizeMd="6" sizeLg="4">
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
  
              .logo-circle {
                background: #ECD659;
                width: 160px;
                height: 160px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                right: 1.3rem;
                top: 70%;
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
                --border-radius: 15px !important;
                margin-bottom: 1rem;
                background: #ffffff;
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
                <div className="logo-circle">
                  <img loading="lazy" src={Logo2} alt="Logo" width="130" />
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

              <div className="form-container" style={{ marginTop: "6rem" }}>
                <form onSubmit={handleLogin}>
                  <IonInput
                    value={user}
                    label="Email/Username"
                    labelPlacement="floating"
                    mode="md"
                    className={`${isValid && 'ion-valid'} ${reqError && 'ion-invalid'} ${reqError && 'ion-touched'}`}
                    type="text"
                    fill="outline"
                    placeholder="Enter your email or username"
                    onIonInput={(e) => setUser(e.detail.value!)}
                  />
                  <div style={{ position: "relative" }} >
                    <IonInput
                      mode="md"
                      className={`${isValid && 'ion-valid'} ${reqError && 'ion-invalid'} ${reqError && 'ion-touched'}`}
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Enter your password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                    ></IonInput>
                    <IonIcon
                    color="medium"
                      icon={showPassword ? eyeOff : eye}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", position: "absolute", right: "20px", top: "33%", transformTranslateY: "-50%", fontSize: "1.5rem", zIndex: "2" }} 
                    />
                  </div>

                  {/* error message */}
                  {reqError && (
                    <p color="danger" style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
                      {reqError}
                    </p>
                  )}

                  <IonButton
                    expand="block"
                    className="login-button"
                    type="submit"
                  >
                    Sign In
                    <IonIcon icon={logInOutline} slot="end" />
                  </IonButton>

                  <p style={{ textAlign: "center" }}>
                    Don't have an account?{" "}
                    <IonRouterLink
                      href="/signup"
                      className="signup-link"
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        display: "inline-block",
                      }}
                    >
                      Sign Up
                    </IonRouterLink>
                  </p>

                  <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    <a
                      style={{
                        cursor: "pointer",
                        color: "#aaa",
                        textDecoration: "none",
                      }}
                      onClick={() => setIntroSeen(false)}
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
