import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  useIonLoading,
  IonRouterLink,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { checkmarkDone, eye, eyeOff, logInOutline } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import Intro from "../../components/Intro";
import axios from "axios";
import { Keyboard } from "@capacitor/keyboard";
import LogoType from "../../assets/images/logotype.webp";

const INTRO_KEY = "intro-seen";
const BASE_URL_API =
  import.meta.env.VITE_BASE_URL_API || "http://localhost:8000/api";

export const Signup: React.FC = () => {
  const [introSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [reqError, setReqError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    (async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    })();

    // Set up keyboard behavior
    Keyboard.setAccessoryBarVisible({ isVisible: true });
    Keyboard.setScroll({ isDisabled: false });
  }, []);

  const setIntroPreferences = async (value: string) => {
    await Preferences.set({
      key: INTRO_KEY,
      value,
    });
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await present("Signing up...");

    try {
      const response: any = await axios.post(`${BASE_URL_API}/signup`, {
        user,
        password,
      });
      if (response.data?.error) {
        setReqError(response.data?.error);
        return;
      }
      setReqError("");
      setIsValid(true);
    } catch (error: any) {
      const { message } = error;
      if (message.toLowerCase().trim() == "network error") {
        setReqError(
          "It looks like you're offline. Please check your connection and try again."
        );
        return;
      }
      setReqError(message);
    } finally {
      await dismiss();
    }
  };

  return !introSeen ? (
    <Intro
      onFinish={() => {
        setIntroSeen(true);
        setIntroPreferences("true");
      }}
    />
  ) : (
    <IonPage>
      <IonContent
        className="signup-page"
        scrollY={true}
        fullscreen
        forceOverscroll={false}
      >
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="12" sizeMd="6" sizeLg="4">
              <style>
                {`
                .signup-page {
                  --background: rgb(245, 244, 241);
                  min-height: 100%;
                  display: flex;
                  flex-direction: column;
                }

                .top-section {
                  background: #ECD659;
                  border-radius: 0 0 50px 50px;
                  padding: 2rem;
                  padding-bottom: 5px;
                  position: relative;
                  padding-top: 0.5rem;
                  flex-shrink: 0;
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
                  z-index: 2;
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
                  padding-bottom: 180px;
                  flex: 1;
                  overflow-y: auto;
                  position: relative;
                  z-index: 1;
                }

                ion-input {
                  --border-radius: 15px !important;
                  margin-bottom: 1rem;
                  background: #ffffff;
                  position: relative;
                  z-index: 1;
                }

                .login-button {
                  --background: #000000;
                  --color: #ECD659;
                  margin: 1rem 0;
                  --border-radius: 15px;
                  height: 50px;
                  text-transform: none;
                }

                .signin-link {
                  color: rgb(207, 180, 23);
                  text-decoration: none;
                  text-align: center;
                  display: block;
                }

                @media (max-height: 600px) {
                  .welcome-text {
                    font-size: 60px;
                    line-height: 55px;
                  }
                  
                  .logo-circle {
                    width: 120px;
                    height: 120px;
                  }

                  .form-container {
                    margin-top: 3rem;
                  }
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

              <div className="form-container">
                <form onSubmit={handleSignup}>
                <IonInput
                    value={user}
                    label="Full Name"
                    labelPlacement="floating"
                    mode="md"
                    className={`${isValid && "ion-valid"} ${
                      reqError && "ion-invalid"
                    } ${reqError && "ion-touched"}`}
                    type="text"
                    fill="outline"
                    placeholder="John Doe"
                    onIonInput={(e) => setUser(e.detail.value!)}
                  />
                  <IonInput
                    value={user}
                    label="Email Adress"
                    labelPlacement="floating"
                    mode="md"
                    className={`${isValid && "ion-valid"} ${
                      reqError && "ion-invalid"
                    } ${reqError && "ion-touched"}`}
                    type="email"
                    fill="outline"
                    placeholder="johndoe@example.com"
                    onIonInput={(e) => setUser(e.detail.value!)}
                  />
                  <IonInput
                    value={user}
                    label="Username"
                    labelPlacement="floating"
                    mode="md"
                    className={`${isValid && "ion-valid"} ${
                      reqError && "ion-invalid"
                    } ${reqError && "ion-touched"}`}
                    type="text"
                    fill="outline"
                    placeholder="Ex: Johndoe_123"
                    onIonInput={(e) => setUser(e.detail.value!)}
                  />
                  <div style={{ position: "relative" }}>
                    <IonInput
                      mode="md"
                      className={`${isValid && "ion-valid"} ${
                        reqError && "ion-invalid"
                      } ${reqError && "ion-touched"}`}
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
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "20px",
                        top: "28%",
                        transformTranslateY: "-50%",
                        fontSize: "1.5rem",
                        zIndex: "2",
                      }}
                    />
                  </div>

                  {/* error message */}
                  {reqError && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "1rem",
                        color: "red",
                        opacity: "0.8",
                      }}
                    >
                      {reqError}
                    </p>
                  )}

                  <IonButton
                    expand="block"
                    className="login-button"
                    type="submit"
                  >
                    Sign Up
                    <IonIcon icon={checkmarkDone} slot="end" />
                  </IonButton>

                  <p style={{ textAlign: "center" }}>
                    ALready have an account?{" "}
                    <IonRouterLink
                      href="/"
                      className="signin-link"
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
                      onClick={() => {
                        setIntroSeen(false);
                        setIntroPreferences("false");
                      }}
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
