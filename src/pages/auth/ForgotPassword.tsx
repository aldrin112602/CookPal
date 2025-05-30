import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  useIonLoading,
} from "@ionic/react";
import Image1 from "../../assets/images/image 1.webp";
import Logo from "../../assets/images/logo2.webp";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAuthGuard from "../../hooks/useAuthGuard";
import { Preferences } from "@capacitor/preferences";

const BASE_URL_API =
  import.meta.env?.VITE_BASE_URL_API ?? "https://lavender-armadillo-802676.hostingersite.com/api";
const ForgotPassword: React.FC = () => {
  useAuthGuard(true, "/home");
  const [present, dismiss] = useIonLoading();
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [responseError, setResponseError] = useState("");

  // set otp and expiration to preferences
  const setOtpExpirationAndEmail = async (otp: string, expires_at: string) => {
    await Preferences.set({
      key: "OTP",
      value: otp,
    });

    await Preferences.set({
      key: "OTP_EXPIRATION",
      value: expires_at,
    });

    await Preferences.set({
      key: "EMAIL",
      value: email,
    });
  };

  // check if otp is set and not expired when the user back to this page, if true, redirect to verify_otp
  const checkOtpAndExpiration = async () => {
    const otp = await Preferences.get({ key: "OTP" });
    const expires_at = await Preferences.get({ key: "OTP_EXPIRATION" });
    const email = await Preferences.get({ key: "EMAIL" });

    if (otp.value && expires_at.value && email.value) {
      const now = new Date().getTime();
      if (Number(expires_at.value) > now) {
        history.push("/verify_otp");
      }
    }
  };

  // call it inside useEffect
  useEffect(() => {
    checkOtpAndExpiration();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: call api
    await present("We're working, please wait..");
    try {
      const response: any = await axios.post(
        `${BASE_URL_API}/password_reset_otp`,
        JSON.stringify({ email }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: false,
          timeout: 10000 * 3,
        }
      );

      const { otp, expires_at } = response.data;
      await setOtpExpirationAndEmail(String(otp), String(new Date(expires_at).getTime()));
      history.push("/verify_otp");
    } catch (error: any) {
      const { errors } = error?.response.data;

      console.log(error)
      setResponseError(errors?.email?.[0] || "Something went wrong. Please try again.");
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
                Forgot Password
              </h1>
              <br />
              <p>
                Enter your email for the verification proccess, we will send 4
                digits code to your email
              </p>
              <br />

              <div className="my-3">
                <label htmlFor="email" className="block my-2">
                  Email Address
                </label>
                <input
                  onInput={(e) =>
                    setEmail((e.target as HTMLInputElement).value)
                  }
                  className="bg-slate-100 px-4 py-3 w-full border"
                  style={{ borderRadius: "15px" }}
                  placeholder="johndoe@example.com"
                  type="email"
                  name="email"
                  autoFocus
                />

                {/* error message */}
                {responseError && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "red",
                      opacity: "0.8",
                    }}
                    className="mt-1"
                  >
                    {responseError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                <button
                  type="button"
                  className="bg-slate-200"
                  style={{
                    height: "40px",
                    width: "calc(100% / 2.1)",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    history.push("/signin");
                  }}
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
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default ForgotPassword;
