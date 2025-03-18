import React from "react";
import { IonContent } from "@ionic/react";

const AddRecipeTab: React.FC = () => {
  return (
    <div id="add-page">
      <IonContent
        scrollY={true}
        style={{
          minHeight: "45vh",
        }}
      >
        <h1>Add Recipe</h1>
      </IonContent>
    </div>
  );
};

export default AddRecipeTab;