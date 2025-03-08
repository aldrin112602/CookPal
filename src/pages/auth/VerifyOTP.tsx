import {
  IonPage,
  IonContent,
  IonAlert,
  IonToolbar,
  IonHeader,
  IonBackButton,
  IonButtons,
  useIonAlert,
  IonIcon,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Image2 from "../../assets/images/image 2.webp";
import Logo from "../../assets/images/logo2.webp";
import useAuthGuard from "../../hooks/useAuthGuard";
import { Preferences } from "@capacitor/preferences";
import { useHistory } from "react-router-dom";
import { arrowBack } from "ionicons/icons";

const VerifyOTP: React.FC = () => {
  useAuthGuard(true, "/home");
  const history = useHistory();
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [realOtp, setRealOtp] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [countdown, setCountdown] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [presentAlert] = useIonAlert();

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

  const checkOtpAndExpiration = async () => {
    const otpData = await Preferences.get({ key: "OTP" });
    const expires_atData = await Preferences.get({ key: "OTP_EXPIRATION" });
    const emailData = await Preferences.get({ key: "EMAIL" });

    if (otpData.value && expires_atData.value && emailData.value) {
      setEmail(emailData.value);
      setRealOtp(otpData.value);

      const expiresAt = Number(expires_atData.value);
      const now = new Date().getTime();
      const remainingTime = Math.max((expiresAt - now) / 1000, 0);

      if (remainingTime <= 0) {
        setIsExpired(true);
        setAlertMessage("Sorry, OTP has expired!");
        setAlertOpen(true);
      } else {
        setCountdown(Math.floor(remainingTime));
      }
    }
  };

  useEffect(() => {
    checkOtpAndExpiration();

    // Start countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAlertMessage("Sorry, OTP has expired!");
          setAlertOpen(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle OTP submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!otp) return;

    if (otp === realOtp && countdown > 0) {
      (async () => {
        await clearOtpData();
        await Preferences.set({ key: "VERIFIED", value: "true" });
        await history.push("/reset_password");
        return;
      })();
    } else if (countdown <= 0) {
      setAlertMessage("OTP has expired. Please request a new one.");
      setAlertOpen(true);
    } else {
      setAlertMessage("OTP is incorrect, please try again!");
      setAlertOpen(true);
    }
    
  };

  const clearOtpData = async () => {
    await Preferences.remove({ key: "OTP" });
    await Preferences.remove({ key: "OTP_EXPIRATION" });
  };

  const handleBack = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default back action

    if (isExpired) {
      async () => {
        await clearOtpData();
      };
      history.push("/signin");
      return;
    }

    presentAlert({
      header: "Confirm",
      message: "Are you sure you want to cancel? Your OTP will be lost.",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Yes",
          handler: async () => {
            await clearOtpData();
            history.push("/signin");
          },
        },
      ],
    });
  };

  return (
    <IonPage className="mx-auto md:w-1/3">
      <IonHeader style={{ boxShadow: "none" }}>
        <IonToolbar>
          <div className="px-2 flex items-center justify-start gap-2">
            <IonIcon
              style={{ cursor: "pointer" }}
              onClick={handleBack}
              icon={arrowBack}
            ></IonIcon>
            <span
              className="px-4 py-1"
              style={{ cursor: "pointer" }}
              onClick={handleBack}
            >
              Cancel
            </span>
          </div>
        </IonToolbar>
      </IonHeader>
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
                We’ve sent a 4-digit code to <b>{email}</b>.
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
                Code expires in{" "}
                <b className="text-yellow-700">{countdown} seconds.</b>
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

              {/* add back or cancel button */}
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

export default VerifyOTP;
