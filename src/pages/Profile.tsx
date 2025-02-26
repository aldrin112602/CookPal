import { useState, useEffect, useRef } from "react";
import useAuthGuard from "../hooks/useAuthGuard";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonIcon,
  useIonLoading,
  IonAlert,
} from "@ionic/react";
import {
  cameraOutline,
  logOutOutline,
  pencil,
  saveOutline,
} from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import CookPalDesign from "../assets/images/CookPal Design.webp";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";

interface UserProfile {
  name: string;
  email: string;
  profile?: string;
  username: string;
  password?: string;
  new_password?: string;
}
const BASE_URL_API =
  import.meta.env.VITE_BASE_URL_API ||
  "https://close-chronicles-moldova-immune.trycloudflare.com/api";

export const Profile = () => {
  useAuthGuard(!1, "/signin");
  const { user } = useFetchUser();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessAlert, SetShowSuccessAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const profilePlaceholder = useRef<HTMLImageElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    profile: "",
    username: "",
    password: "",
    new_password: "",
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profile: user.profile || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const [token, setToken] = useState<string | undefined>(undefined);
  const history = useHistory();

  useEffect(() => {
    const fetchTokenAndData = async () => {
      await loadToken();
    };
    fetchTokenAndData();
  }, []);

  // load token
  const loadToken = async () => {
    try {
      const userToken = await Preferences.get({ key: "TOKEN" });
      if (userToken.value) {
        setToken(userToken.value);
      }
    } catch (error) {
      console.error(`Failed to load token: ${error}`);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      await present("Uploading, please wait...");

      const formData = new FormData();
      formData.append("photo", file);

      const response = await axios.post(
        `${BASE_URL_API}/user/update_profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          timeout: 10000,
        }
      );
      const { message, profile_url } = response.data;
      setSuccessMessage(message);
      SetShowSuccessAlert(true);
    } catch (error) {
      console.error("Error uploading profile:", error);
      setShowAlert(true);
    } finally {
      await dismiss();
      event.target.value = "";
    }
  };


  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Full Name is required.";
    if (!formData.email) newErrors.email = "Email Address is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      await present("Saving changes...");
      const response = await axios.post(
        `${BASE_URL_API}/user/update_info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          timeout: 10000,
        }
      );
      const { message } = response.data;
      setSuccessMessage(message);
      SetShowSuccessAlert(true);
    } catch (error: any) {
      const { data } = error.response;
      console.log(data)

      
        const { new_password, name, email, username, password } = data.errors;
        setErrors({
          new_password: new_password ? new_password[0] : "",
          password: password ? password[0] : "",
          name: name ? name[0] : "",
          email: email ? email[0] : "",
          username: username ? username[0] : "",
        });
      console.error("Failed to save changes:", error);
      // setShowAlert(true);
    } finally {
      await dismiss();
      // setToggleEdit(false);
    }
  };

  const handleLogout = async () => {
    await Preferences.remove({ key: "TOKEN" });
    await setSuccessMessage("You have been logged out.");
    await SetShowSuccessAlert(true);
    history.push("/signin");
  };

  return (
    <IonPage className="bg-white mx-auto md:w-1/3">
      <IonHeader style={{ boxShadow: "none" }}>
        <IonToolbar>
          <div className="flex items-center justify-between px-4 py-2">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <div>
              <img
                src={CookPalDesign}
                alt="CookPal"
                className="logo"
                width="50px"
              />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={true}>
        <main className="p-6">
          {/* user profile */}
          <div className="text-center">
            <div className="flex items-center justify-center flex-col">
              <img
                ref={profilePlaceholder}
                src={
                  formData.profile
                    ? `${BASE_URL_API.replace("api", "")}storage/${
                        formData.profile
                      }`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                }
                className="mb-3 object-cover border rounded-full border-yellow-500 bg-white"
                style={{
                  height: "90px",
                  width: "90px",
                }}
              />
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                style={{ marginTop: "-40px", marginLeft: "-60px" }}
                className="border border-slate-200 bg-yellow-500 rounded-full flex p-1 cursor-pointer"
              >
                <IonIcon
                  style={{ fontSize: "20px" }}
                  icon={cameraOutline}
                  onClick={() => fileInput.current?.click()}
                />
              </div>
            </div>
            <h3 className="caprasimo-regular">{formData.name}</h3>
            <p style={{ marginTop: "-10px" }}>{formData.email}</p>
          </div>

          <br />

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <h4>Personal Information</h4>
              <button
                type="button"
                style={{ borderRadius: "10px" }}
                className="p-0 bg-slate-500 text-white flex items-center justify-center gap-1 w-20 h-7 border"
                onClick={() => setToggleEdit((curr) => !curr)}
              >
                <IonIcon icon={pencil} />
                &nbsp;&nbsp;Edit
              </button>
            </div>

            <div className="mt-3">
              <input
                className={`${
                  toggleEdit ? "bg-white" : "bg-slate-100"
                } px-4 py-3 w-full border border-slate-100`}
                style={{ borderRadius: "15px" }}
                placeholder="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={!toggleEdit}
                autoFocus
              />
              {errors.name && <p className="text-sm text-rose-800 mt-1 mb-3">{errors.name}</p>}
            </div>

            <div className="mt-3">
              <input
                value={formData.email}
                className={`${
                  toggleEdit ? "bg-white" : "bg-slate-100"
                } px-4 py-3 w-full border border-slate-100`}
                style={{ borderRadius: "15px" }}
                placeholder="Email Address"
                type="email"
                name="email"
                onChange={handleChange}
                disabled={!toggleEdit}
              />
              {errors.email && <p className="text-sm text-rose-800 mt-1 mb-3">{errors.email}</p>}
            </div>

            <div className="mt-3">
              <input
                value={formData.username}
                className={`${
                  toggleEdit ? "bg-white" : "bg-slate-100"
                } px-4 py-3 w-full border border-slate-100`}
                style={{ borderRadius: "15px" }}
                placeholder="Username"
                name="username"
                type="text"
                onChange={handleChange}
                disabled={!toggleEdit}
              />
              {errors.username && <p className="text-sm text-rose-800 mt-1 mb-3">{errors.username}</p>}
            </div>

            <div className="mt-3">
              <input
                className={`${
                  toggleEdit ? "bg-white" : "bg-slate-100"
                } px-4 py-3 w-full border border-slate-100`}
                style={{ borderRadius: "15px" }}
                placeholder="Current Password"
                type="password"
                name="password"
                disabled={!toggleEdit}
                onChange={handleChange}
              />
              {errors.password && <p className="text-sm text-rose-800 mt-1 mb-3">{errors.password}</p>}
            </div>

            <div className="mt-3">
              <input
                className={`${
                  toggleEdit ? "bg-white" : "bg-slate-100"
                } px-4 py-3 w-full border border-slate-100`}
                style={{ borderRadius: "15px" }}
                placeholder="New Password"
                type="password"
                name="new_password"
                disabled={!toggleEdit}
                onChange={handleChange}
              />
              {errors.new_password && <p className="text-sm text-rose-800 mt-1 mb-3">{errors.new_password}</p>}
            </div>

            <div className="grid">
              <button
                type="submit"
                className="flex mt-3 bg-black items-center justify-center gap-2"
                style={{
                  background: "#EFD959",
                  height: "40px",
                  borderRadius: "15px",
                }}
              >
                <IonIcon icon={saveOutline} />
                Save Changes
              </button>
            </div>
            <div className="grid border-t mt-4 border-slate-200">
              <button
                onClick={() => setShowConfirm(true)}
                type="button"
                className="flex mt-3 bg-black items-center justify-center gap-2"
                style={{
                  color: "#EFD959",
                  height: "40px",
                  borderRadius: "15px",
                }}
              >
                <IonIcon icon={logOutOutline} />
                Log Out
              </button>
            </div>
          </form>
        </main>

        {/* Error alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message="An error occurred. Please try again."
          buttons={["OK"]}
        />

        {/* Success alert */}
        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={() => SetShowSuccessAlert(false)}
          header="Success"
          message={successMessage}
          buttons={["OK"]}
        />

        {/* Confirmation logout */}
        <IonAlert
          isOpen={showConfirm}
          onDidDismiss={() => setShowConfirm(false)}
          header={"Confirm Logout"}
          message={"Are you sure you want to logout?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => setShowConfirm(false),
            },
            {
              text: "Logout",
              handler: handleLogout,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};
