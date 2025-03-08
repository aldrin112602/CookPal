import React from "react";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";

// Define the type for featured items
interface FeaturedItem {
  title: string;
  path: string;
}

const featuredRoutes: FeaturedItem[] = [
  {
    title: "Featured Show case",
    path: "/",
  },
  { title: "Home", path: "/home" },

  {
    title: "Favorites",
    path: "/favorites",
  },
  {
    title: "Signup",
    path: "/signup",
  },
  {
    title: "Signin",
    path: "/signin",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Forgot Password",
    path: "/forgot_password",
  },
  {
    title: "Verify OTP",
    path: "/verify_otp",
  },
  {
    title: "Reset Password",
    path: "/reset_password",
  },

  {
    title: "Add Recipe",
    path: "/add_recipe",
  },
];

const FeaturedShowcase: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="p-4 h-screen overflow-y-auto bg-slate-300 mx-auto md:w-1/3">
          {featuredRoutes.map((item, index) => (
            <IonCard
              key={index}
              className="cursor-pointer p-3 py-1 mb-2"
              onClick={() => location.assign(item.path)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">{item.title}</h3>
                <IonIcon
                  icon={arrowForwardOutline}
                  className="text-xl text-gray-600"
                />
              </div>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};


export default FeaturedShowcase;