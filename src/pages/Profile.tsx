import { useState, useEffect, useRef } from "react";
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

interface UserProfile {
  name: string;
  email: string;
  profile: string;
  username: string;
}
const BASE_URL_API =
  import.meta.env.VITE_BASE_URL_API ||
  "https://close-chronicles-moldova-immune.trycloudflare.com/api";

export const Profile = () => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [present, dismiss] = useIonLoading();
  const fileInput = useRef<HTMLInputElement>(null);
  const profilePlaceholder = useRef<HTMLImageElement>(null);
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    profile: "",
    username: "",
  });

  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadUserData();
    loadToken();
  }, []);

  // load user data
  const loadUserData = async () => {
    try {
      const userData = await Preferences.get({ key: "USER" });
      if (userData.value) {
        const parsedUser = JSON.parse(userData.value);
        setFormData(parsedUser);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      setShowAlert(true);
    }
  };

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


  // Handle upload profile picture
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      await present("Uploading, please wait...");

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async (ev) => {
        if (
          typeof ev.target?.result === "string" &&
          profilePlaceholder.current
        ) {
          profilePlaceholder.current.src = ev.target.result;

          try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
              `${BASE_URL_API}/api/update_profile`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                withCredentials: false,
                timeout: 10000,
              }
            );



            console.log(response)

            
            // setFormData((prev) => ({
            //   ...prev,
            //   profile: response.data.profile_url,
            // }));
          } catch (error) {
            console.error("Error uploading profile:", error);
            setShowAlert(true);
          }
        }
      };
    } catch (error) {
      console.error("Error handling file:", error);
      setShowAlert(true);
    } finally {
      await dismiss();
      // Reset file input
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await present("Saving changes...");
      // TODO: Add your API call here
      // alert(JSON.stringify(formData))
      // await Preferences.set({
      //   key: "USER",
      //   value: JSON.stringify(formData)
      // });
      setToggleEdit(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
      setShowAlert(true);
    } finally {
      await dismiss();
    }
  };

  return (
    <IonPage className="bg-white mx-auto md:w-1/3">
      <IonHeader style={{ boxShadow: "none" }}>
        <IonToolbar>
          <div className="flex items-center justify-between px-4 py-2">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
              <span className="font-semibold">Back</span>
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
                  formData.profile ??
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                }
                className="mb-3 object-cover border rounded-full border-yellow-500 cursor-pointer bg-white"
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
                className="border border-slate-200 bg-yellow-500 rounded-full flex p-1"
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
            </div>

            <div className="mt-3">
              <input
                className={`${
                  toggleEdit ? "bg-white" : "bg-slate-100"
                } px-4 py-3 w-full border border-slate-100`}
                style={{ borderRadius: "15px" }}
                placeholder="New Password"
                type="password"
                name="password_confirmation"
                disabled={!toggleEdit}
                onChange={handleChange}
              />
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
                type="button"
                className="flex mt-3 bg-black items-center justify-center gap-2"
                style={{
                  color: "#EFD959",
                  height: "40px",
                  borderRadius: "15px",
                }}
              >
                <IonIcon icon={logOutOutline} />
                Sign Out
              </button>
            </div>
          </form>
        </main>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message="An error occurred. Please try again."
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};
