import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import Image1 from "../../assets/images/image 3.webp";
import Logo from "../../assets/images/logo2.webp";
import { useState } from "react";
import axios from "axios";
import useAuthGuard from "../../hooks/useAuthGuard";

const BASE_URL_API =
  import.meta.env.VITE_BASE_URL_API ||
  "https://close-chronicles-moldova-immune.trycloudflare.com/api";

export const ResetPassword: React.FC = () => {
  useAuthGuard(true, "/home");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: call api
    try {
      const response: any = await axios.post(
        `${BASE_URL_API}/reset_password`,
        JSON.stringify({ password, confirmPassword }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: false,
          timeout: 10000,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
                  className="bg-slate-100 px-4 py-3 w-full border border-slate-200"
                  style={{ borderRadius: "15px" }}
                  type="password"
                  name="password"
                  required
                  autoFocus
                />
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
                  className="bg-slate-100 px-4 py-3 w-full border border-slate-200"
                  style={{ borderRadius: "15px" }}
                  type="password"
                  name="confirm_password"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  className="bg-slate-200"
                  style={{
                    height: "40px",
                    width: "calc(100% / 2.1)",
                    borderRadius: "15px",
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
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};
