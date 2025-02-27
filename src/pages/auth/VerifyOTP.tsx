import {
  IonPage,
  IonContent,
  IonInput,
  IonIcon,
  IonModal,
  IonButton,
  IonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Image2 from "../../assets/images/image 2.webp";
import Logo from "../../assets/images/logo2.webp";
import useAuthGuard from "../../hooks/useAuthGuard";
import { Preferences } from "@capacitor/preferences";
import { useHistory } from "react-router-dom";

export const VerifyOTP: React.FC = () => {
  useAuthGuard(true, "/home");
  const history = useHistory();
  const [otp, setOtp] = useState<string>("");
  const [otpExpiration, setOtpExpiration] = useState<string>("");
  const [realOtp, setRealOtp] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleKeyPress = (value: string) => {
    if ("vibrate" in window.navigator) {
      window.navigator.vibrate([100, 100]);
    }
    if (value === "del") {
      setOtp((prev) => prev.slice(0, -1));
    } else if (otp.length < 4) {
      setOtp((prev) => prev + value);
    }
  };
  //  get otp and expiration from preferences
  const getOtpAndExpiration = async () => {
    const getOtp = await Preferences.get({
      key: "OTP",
    });
    const getOtpExp = await Preferences.get({
      key: "OTP_EXPIRATION",
    });

    await setOtpExpiration(getOtpExp.value || "");
    await setRealOtp(getOtp.value || "");

    if (!getOtp.value || !getOtpExp.value) {
      // redirect back to sign in page
      history.push("/signin");
    }
  };

  useEffect(() => {
    getOtpAndExpiration();
  }, [otpExpiration, realOtp]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!otp) return;
    if (otp == realOtp) {
      setAlertMessage("OTP verified successfully!");
      history.push("/reset_password");
    } else {
      setAlertMessage("OTP is incorrect, please try again!");
    }
    setAlertOpen(true);
  };

  return (
    <IonPage className="mx-auto md:w-1/3">
      <IonContent scrollY={true}>
        <div className="bg-black">
          <img
            src={Image2}
            alt="Image 1"
            className="mx-auto object-cover w-full block"
          />

          <form
            onSubmit={handleSubmit}
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
                Verify OTP
              </h1>
              <br />
              <p style={{ fontSize: "1.2rem" }}>
                We’ve sent a 4-digit code to <b>johndoe@gmail.com</b>.
              </p>

              <div className="my-3">
                <label className="block my-2" style={{ fontSize: "1.2rem" }}>
                  Enter 4-digit code
                </label>
                <div className="flex justify-between gap-2">
                  {[...Array(4)].map((_, i) => (
                    <input
                      key={i}
                      type="number"
                      style={{ fontSize: "2rem" }}
                      value={otp[i] || ""}
                      className="w-15 h-15 border-slate-500 text-center border rounded"
                      disabled
                    />
                  ))}
                </div>
              </div>

              <p>
                Code expire after <b className="text-yellow-700">60 seconds.</b>
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {[...Array(9)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    style={{ borderRadius: "5px", fontSize: "1.2rem" }}
                    className="bg-slate-300 h-8 w-full"
                    onClick={() => handleKeyPress((i + 1).toString())}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  style={{ borderRadius: "5px", fontSize: "1.2rem" }}
                  className="bg-slate-300 h-8 w-full"
                  onClick={() => handleKeyPress("0")}
                >
                  0
                </button>
                <button
                  type="button"
                  style={{ borderRadius: "5px", fontSize: "1.2rem" }}
                  className="bg-rose-900 h-8 w-full flex items-center justify-center gap-2 text-white"
                  onClick={() => handleKeyPress("del")}
                >
                  Delete
                </button>

                <button
                  type="submit"
                  style={{
                    borderRadius: "5px",
                    fontSize: "1.2rem",
                    background: "#EFD959",
                  }}
                  className="h-8 w-full flex items-center justify-center gap-2"
                >
                  Submit
                </button>
              </div>

              <p className="py-3">
                Didn't received code?{" "}
                <b className="text-yellow-700">
                  <u>Resend code again</u>
                </b>
              </p>
            </div>
          </form>
        </div>
        {/* Alert for success or error messages */}
        <IonAlert
          isOpen={alertOpen}
          onDidDismiss={() => setAlertOpen(false)}
          header="OTP Verification"
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};
