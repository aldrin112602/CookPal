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
  description: string;
}

const featuredRoutes: FeaturedItem[] = [
  {
    title: "Featured Show case",
    path: "/",
    description: "Go to featured show case",
  },
  { title: "Home", path: "/home", description: "Go to the homepage" },

  {
    title: "Favorites",
    path: "/favorites",
    description: "Check your saved recipes",
  },
  {
    title: "Signup",
    path: "/signup",
    description: "Go to Signup page",
  },
  {
    title: "Signin",
    path: "/signin",
    description: "Go to Signin page",
  },
  {
    title: "Profile",
    path: "/profile",
    description: "Manage your profile settings",
  },
];

export const FeaturedShowcase: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="p-4 h-screen overflow-y-auto bg-slate-300 mx-auto">
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
