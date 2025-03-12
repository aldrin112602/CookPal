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
  IonSearchbar,
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
import useFetchUserAccount from "../hooks/useFetchUserAccount";

interface UserProfile {
  name: string;
  email: string;
  profile?: string;
  username: string;
}
const BASE_URL_API =
  import.meta.env?.VITE_BASE_URL_API ??
  "https://lavender-armadillo-802676.hostingersite.com/api";
const ViewUser = () => {
  useAuthGuard(!1, "/signin");
  const { user, loading, error } = useFetchUserAccount();
  const [showAlert, setShowAlert] = useState(false);
  const [present, dismiss] = useIonLoading();
  const loadingShown = useRef(false);
  const [recipes, setRecipes] = useState({});
  const [data, setData] = useState({
    user: {
      profile: "",
      name: "",
      email: "",
    },
    recipes: []
  });

  useEffect(() => {
    const handleLoading = async () => {
      if (!user && loading && !loadingShown.current && !error) {
        loadingShown.current = true;
        await present("Loading screen, please wait...");
      } else {
        console.log(user);
        setData(user);
        setRecipes(user?.recipes);
        dismiss();
        loadingShown.current = false;
      }
    };

    handleLoading();
  }, [loading, user]);

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
      <IonContent>
        <main className="mt-2">
          {/* user profile */}
          <div className="text-center">
            <div className="flex items-center justify-center flex-col">
              <img
                src={
                  data?.user?.profile
                    ? `${BASE_URL_API.replace("api", "")}${data?.user?.profile}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                }
                className=" object-cover border rounded-full border-yellow-500 bg-white"
                style={{
                  height: "90px",
                  width: "90px",
                }}
              />
            </div>
            <h3 className="caprasimo-regular">{data?.user?.name}</h3>
            <p style={{ marginTop: "-10px" }}>{data?.user?.email}</p>
          </div>

          <div className="border-t border-slate-100 mt-4">
            <div className="p-0">
              <IonSearchbar
                placeholder="Search Recipe"
                className="custom-searchbar m-0"
              />
            </div>

            
            

          </div>
        </main>

        {/* Error alert */}
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

export default ViewUser;
