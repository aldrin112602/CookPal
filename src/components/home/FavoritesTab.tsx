import React from "react";
import { IonContent } from "@ionic/react";
import HomeHeader from "./HomeHeader";

interface FavoritesTabProps {
  headerProps: any;
}

const FavoritesTab: React.FC<FavoritesTabProps> = ({ headerProps }) => {
  return (
    <div id="favorites-page">
      <HomeHeader {...headerProps} />
      <IonContent
        scrollY={true}
        style={{
          minHeight: "45vh",
        }}
      >
        <h1>Favorites Tab</h1>
      </IonContent>
    </div>
  );
};

export default FavoritesTab;