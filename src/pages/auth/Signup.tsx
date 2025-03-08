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
import { checkmarkDone, eye, eyeOff } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import Intro from "../../components/Intro";
import Logo2 from "../../assets/images/logo2.webp";
import axios from "axios";
import { Keyboard } from "@capacitor/keyboard";
import { useHistory } from "react-router-dom";
import useAuthGuard from "../../hooks/useAuthGuard";

const INTRO_KEY = "intro-seen";
const BASE_URL_API =
  import.meta.env?.VITE_BASE_URL_API ?? "https://lavender-armadillo-802676.hostingersite.com/api";
const Signup: React.FC = () => {
  useAuthGuard(true, '/home');
  const [introSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

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

  // set token and user data
  const setToken = async (token: string) => {
    await Preferences.set({
      key: "TOKEN",
      value: token,
    });
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await present("Signing up...");

    try {
      const response: any = await axios.post(
        `${BASE_URL_API}/register`,
        JSON.stringify({ name: fullName, email, username, password }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
          timeout: 10000,
        }
      );

      console.log(response)

      if (response.data?.error) {
        alert(response.data?.error);
        return;
      }
      setFullNameError("");
      setEmailError("");
      setUsernameError("");
      setPasswordError("");
      setIsValid(true);

      // get data
      const { data } = response;
      const { token } = data;

      await setToken(token);

      // Redirect user to home page
      history.push("/home");
    } catch (error: any) {
      console.log(error);

      const { message } = error;
      if (message.toLowerCase().trim() == "network error") {
        alert(
          "It looks like you're offline. Please check your connection and try again."
        );
        return;
      }

      const { data } = error.response || {};
      const { errors } = data || {};
      const name = errors?.name ?? [];
      const email = errors?.email ?? [];
      const username = errors?.username ?? [];
      const password = errors?.password ?? [];

      setFullNameError(name[0] ?? "");
      setEmailError(email[0] ?? "");
      setUsernameError(username[0] ?? "");
      setPasswordError(password[0] ?? "");
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
                  font-size: 65px;
                  font-weight: bold;
                  color: #222;
                  line-height: 85px;
                  letter-spacing: -5%;
                  padding-bottom: 2rem;
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
                  padding-bottom: 120px;
                  margin-top: 5rem;
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
                <div className="logo-circle">
                  <img loading="lazy" src={Logo2} alt="Logo" width="130" />
                </div>
                <h1 className="welcome-text">
                  Join Us Pal!
                </h1>
                <p className="subtitle">Please Sign Up to continue.</p>
              </div>

              <div className="form-container">
                <form onSubmit={handleSignup}>
                  <IonInput
                    value={fullName}
                    label="Full Name"
                    labelPlacement="floating"
                    mode="md"
                    className={`${isValid && "ion-valid"} ${
                      fullNameError && "ion-invalid"
                    } ${fullNameError && "ion-touched"}`}
                    type="text"
                    fill="outline"
                    placeholder="John Doe"
                    onIonInput={(e) => setFullName(e.detail.value!)}
                  />

                  {fullNameError && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "-15px",
                        marginBottom: "5px",
                        color: "red",
                        opacity: "0.8",
                      }}
                    >
                      {fullNameError}
                    </p>
                  )}

                  <IonInput
                    value={email}
                    label="Email Address"
                    labelPlacement="floating"
                    mode="md"
                    className={`${isValid && "ion-valid"} ${
                      emailError && "ion-invalid"
                    } ${emailError && "ion-touched"}`}
                    type="email"
                    fill="outline"
                    placeholder="johndoe@example.com"
                    onIonInput={(e) => setEmail(e.detail.value!)}
                  />

                  {emailError && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "-15px",
                        marginBottom: "5px",
                        color: "red",
                        opacity: "0.8",
                      }}
                    >
                      {emailError}
                    </p>
                  )}

                  <IonInput
                    value={username}
                    label="Username"
                    labelPlacement="floating"
                    mode="md"
                    className={`${isValid && "ion-valid"} ${
                      usernameError && "ion-invalid"
                    } ${usernameError && "ion-touched"}`}
                    type="text"
                    fill="outline"
                    placeholder="Ex: Johndoe_123"
                    onIonInput={(e) => setUsername(e.detail.value!)}
                  />

                  {usernameError && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "-15px",
                        marginBottom: "5px",
                        color: "red",
                        opacity: "0.8",
                      }}
                    >
                      {usernameError}
                    </p>
                  )}

                  <div style={{ position: "relative" }}>
                    <IonInput
                      mode="md"
                      className={`${isValid && "ion-valid"} ${
                        passwordError && "ion-invalid"
                      } ${passwordError && "ion-touched"}`}
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Enter your password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                    />
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

                  {passwordError && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        marginTop: "-15px",
                        marginBottom: "5px",
                        color: "red",
                        opacity: "0.8",
                      }}
                    >
                      {passwordError}
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
                    Already have an account?{" "}
                    <IonRouterLink
                      href="/signin"
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

export default Signup;