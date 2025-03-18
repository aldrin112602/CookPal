import React from "react";
import { IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { homeOutline, addOutline, heartOutline } from "ionicons/icons";

const TabBar: React.FC = () => {
  return (
    <IonTabBar
      slot="bottom"
      style={{
        borderRadius: "25px 25px 0 0",
      }}
    >
      <IonTabButton tab="home">
        <IonIcon icon={homeOutline} />
      </IonTabButton>
      <IonTabButton tab="add">
        <div
          style={{
            fontSize: "2rem",
            background: "#ECD659",
            height: "45px",
            width: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <IonIcon icon={addOutline} />
        </div>
      </IonTabButton>
      <IonTabButton tab="favorites">
        <IonIcon icon={heartOutline} />
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar;