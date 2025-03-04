import {
  IonPage,
  IonContent,
  IonAlert,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import Image1 from "../../assets/images/image 3.webp";
import Logo from "../../assets/images/logo2.webp";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthGuard from "../../hooks/useAuthGuard";
import { Preferences } from "@capacitor/preferences";
import { useHistory } from "react-router-dom";

const BASE_URL_API =
  import.meta.env.VITE_BASE_URL_API ||
  "https://close-chronicles-moldova-immune.trycloudflare.com/api";

export const ResetPassword: React.FC = () => {
  useAuthGuard(true, "/home");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [presentAlert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  const clearData = async () => {
    await Preferences.remove({ key: "VERIFIED" });
    await Preferences.remove({ key: "EMAIL" });
  };

  const handleBack = async () => {
    await presentAlert({
      header: "Confirm",
      message: "Are you sure you want to cancel?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Yes",
          handler: async () => {
            console.log("Clearing data..."); // Debugging step
            await clearData();
            console.log("Data cleared!"); // Confirm execution
            history.push("/signin");
          },
        },
      ],
    });
  };
  

  useEffect(() => {
    (async () => {
      const isVerified = await Preferences.get({ key: "VERIFIED" });
      const getMail = await Preferences.get({ key: "EMAIL" });
      if (getMail.value) setEmail(getMail.value);

      if (!isVerified.value || isVerified.value != "true") {
        history.push("/signin");
      }
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: call api

    await present("Submitting, please wait..");
    try {
      const response: any = await axios.post(
        `${BASE_URL_API}/password_reset`,
        JSON.stringify({
          password,
          password_confirmation: confirmPassword,
          email,
        }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: false,
          timeout: 10000,
        }
      );
      await clearData();
      setPasswordError("");
      setAlertMessage('Password reset successful. Please sign in with your new password.');
      setAlertOpen(true);
    } catch (error: any) {
      console.error(error);
      const { data } = error.response || {};
      const { errors } = data || {};
      const password = errors?.password ?? [];
      setPasswordError(password[0] ?? "");
    } finally {
      dismiss();
    }
  };
  return (
    <IonPage className="mx-auto md:w-1/3">
      <IonContent scrollY={true}>
        <div className="bg-black">
          <img
            src={Image1}
            alt="Image 1"
            className="mx-auto object-cover w-full block"
          />

          <form
            onSubmit={handleSubmit}
            action="#"
            method="post"
            className="p-3 bg-white absolute bottom-0 left-0 w-full"
            style={{
              minHeight: "60vh",
              borderRadius: "50px 50px 0 0",
              boxShadow: "0 -5px 10px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full mx-auto p-1"
              style={{ background: "#EFD959" }}
            >
              <img src={Logo} alt="Logo" />
            </div>
            <div className="px-3">
              <br />
              <h1
                className="caprasimo-regular"
                style={{ fontSize: "3rem", lineHeight: "2.5rem" }}
              >
                Reset Password
              </h1>
              <br />
              <p>
                Create a strong password with at least 6 characters, including a
                mix of letters, numbers, and symbols
              </p>
              <br />

              <div className="my-3">
                <label htmlFor="email" className="block my-2">
                  New Password
                </label>
                <input
                  value={password}
                  onInput={(e: React.FormEvent<HTMLInputElement>) =>
                    setPassword((e.target as HTMLInputElement).value)
                  }
                  className=" bg-slate-100 px-4 py-3 w-full border"
                  style={{ borderRadius: "15px" }}
                  type="password"
                  name="password"
                  autoFocus
                />

                {passwordError && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "red",
                      opacity: "0.8",
                    }}
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="my-3">
                <label htmlFor="email" className="block my-2">
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onInput={(e: React.FormEvent<HTMLInputElement>) =>
                    setConfirmPassword((e.target as HTMLInputElement).value)
                  }
                  className="bg-slate-100 px-4 py-3 w-full border"
                  style={{ borderRadius: "15px" }}
                  type="password"
                  name="confirm_password"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  className="bg-slate-200 border"
                  style={{
                    height: "40px",
                    width: "calc(100% / 2.1)",
                    borderRadius: "15px",
                  }}
                  onClick={() => handleBack() }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    height: "40px",
                    width: "calc(100% / 2.1)",
                    borderRadius: "15px",
                    background: "#EFD959",
                  }}
                >
                  Reset Password
                </button>
              </div>
              <p className="text-center mt-3 pb-2 text-slate-600">Go back to <a href="/signin" style={{ color: '#EFD950' }} className="underline text-shadow">Sign In Page</a></p>
            </div>
          </form>
        </div>

        {/* Alert for success or error messages */}
        <IonAlert
          isOpen={alertOpen}
          onDidDismiss={() => setAlertOpen(false)}
          header="Reset Password"
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};


