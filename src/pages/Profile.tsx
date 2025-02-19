import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonIcon,
  useIonLoading,
} from "@ionic/react";
import {
  cameraOutline,
  logOutOutline,
  pencil,
  save,
  saveOutline,
  trashBin,
  trashBinOutline,
  trashOutline,
} from "ionicons/icons";
import CookPalDesign from "../assets/images/CookPal Design.png";
import { ChangeEvent, useRef, useState } from "react";

export const Profile = () => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [present, dismiss] = useIonLoading();

  // dummy user account
  const userAccount = {
    profile: null,
    fullname: "Aldrin Caballero",
    emailAddress: "caballeroaldrin02@gmail.com",
    username: "aldrin02",
    password: "123123",
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const profilePlaceholder = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      setSelectedFile(file);
      reader.readAsDataURL(file);
    }

    reader.onload = async (ev) => {
      await present("Uploading, please wait..");
      if (typeof ev.target?.result === "string" && profilePlaceholder.current) {
        profilePlaceholder.current.src = await ev.target.result;
        // TODO: call api 
        setTimeout(async () => {
          await dismiss();
        }, 1000)
      }
    };
    event.target.value = "";
  };

  return (
    <IonPage className="bg-white">
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
            <div className="relative">
              <img
                ref={profilePlaceholder}
                src={`${
                  userAccount.profile ??
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                }`}
                className="mx-auto mb-3 object-cover border rounded-full border-yellow-500 cursor-pointer bg-white"
                style={{
                  height: "90px",
                  width: "90px",
                }}
              />
              {/* File input */}
              <input
                ref={fileInput}
                type="file"
                accept="images/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="absolute left-27 border border-slate-200 top-15 bg-yellow-500 rounded-full flex p-1">
                <IonIcon
                  style={{ fontSize: "20px" }}
                  icon={cameraOutline}
                  onClick={() => fileInput.current?.click()}
                />
              </span>
            </div>
            <h3 className="caprasimo-regular" style={{ marginTop: "-1px" }}>
              {userAccount.fullname}
            </h3>
            <p style={{ marginTop: "-10px" }}>{userAccount.emailAddress}</p>
          </div>

          <br />
          {/* End user profile */}

          {/* Personal Information */}
          <form action="#" method="post">
            <div className="flex items-center justify-between ">
              <h4>Personal Information</h4>
              <button
                type="button"
                style={{ borderRadius: "10px" }}
                className={`p-0 bg-slate-500 text-white flex items-center justify-center gap-1 w-20 h-7 border`}
                onClick={() => setToggleEdit((curr) => !curr)}
              >
                <IonIcon icon={pencil} />
                &nbsp;&nbsp;Edit
              </button>
            </div>

            <div className="mt-3">
              <input
                className="bg-slate-100 px-4 py-3 w-full"
                style={{ borderRadius: "15px" }}
                placeholder="Full Name"
                type="text"
                value={userAccount.fullname}
                disabled={!toggleEdit}
                autoFocus
              />
            </div>

            <div className="mt-3">
              <input
                value={userAccount.emailAddress}
                className="bg-slate-100 px-4 py-3 w-full"
                style={{ borderRadius: "15px" }}
                placeholder="Email Address"
                type="email"
                disabled={!toggleEdit}
              />
            </div>

            <div className="mt-3">
              <input
                value={userAccount.username}
                className="bg-slate-100 px-4 py-3 w-full"
                style={{ borderRadius: "15px" }}
                placeholder="Username"
                type="text"
                disabled={!toggleEdit}
              />
            </div>

            <div className="mt-3">
              <input
                value={userAccount.password}
                className="bg-slate-100 px-4 py-3 w-full"
                style={{ borderRadius: "15px" }}
                placeholder="Current Password"
                type="password"
                disabled={!toggleEdit}
              />
            </div>

            <div className="mt-3">
              <input
                className="bg-slate-100 px-4 py-3 w-full"
                style={{ borderRadius: "15px" }}
                placeholder="New Password"
                type="password"
                disabled={!toggleEdit}
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
            {/* <div className="grid border-t mt-4 border-slate-200">
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
            </div> */}
            <div className="grid border-t mt-4 border-slate-200">
              <button
                type="button"
                className="flex mt-3 bg-rose-900 items-center justify-center gap-2"
                style={{
                  color: "#fff",
                  height: "40px",
                  borderRadius: "15px",
                }}
              >
                <IonIcon icon={trashOutline} />
                Delete Account
              </button>
            </div>
          </form>
        </main>
      </IonContent>
    </IonPage>
  );
};
