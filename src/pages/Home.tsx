import {
  IonTabs,
  IonTab,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonPage,
} from "@ionic/react";
import {
  heart,
  personCircleOutline,
  homeOutline,
  addOutline,
  heartOutline,
  timeSharp,
  timeOutline,
} from "ionicons/icons";
import React from "react";
import "../assets/styles/Home.css";
import CookPalDesign from "../assets/images/CookPal Design.png";

export const Home: React.FC = () => {
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Adobo_DSCF4391.jpg/1200px-Adobo_DSCF4391.jpg";
  const recipes = [
    {
      title: "Filipino Style Pork Adobo",
      time: "45 min",
      price: "₱181.25",
      image,
    },
    {
      title: "Fried Chicken",
      time: "25 min",
      price: "₱180 - ₱200",
      image,
    },
    {
      title: "Filipino Style Pork Adobo",
      time: "45 min",
      price: "₱181.25",
      image,
    },
    {
      title: "Fried Chicken",
      time: "25 min",
      price: "₱180 - ₱200",
      image,
    },
  ];

  return (
    <IonPage>
      <IonTabs>
        <IonTab tab="home">
          <div id="home-page">
            <IonHeader>
              <IonToolbar>
                <div className="header-content">
                  <div className="user-profile">
                    <IonIcon icon={personCircleOutline} size="large" />
                  </div>
                  <img src={CookPalDesign} alt="CookPal" className="logo" />
                </div>
              </IonToolbar>

              <div className="title-section">
                <div className="greeting">Hello There, Pal!</div>
                <br />
                <br />
                <h1 className="caprasimo-bold">
                  Let's make
                  <br />
                  delicious food's.
                </h1>
              </div>
              <IonSearchbar
                placeholder="Search Recipe"
                className="custom-searchbar"
              />
            </IonHeader>

            <IonContent
              scrollY={true}
              style={{
                minHeight: "14rem",
              }}
            >
              <div
                className="recipe-grid"
                style={{
                  paddingBottom: "30px",
                }}
              >
                {recipes.map((recipe, index) => (
                  <IonCard key={index} className="recipe-card">
                    <div className="image-container">
                      <IonImg src={recipe.image} />
                      <IonIcon icon={heart} className="favorite-icon" />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>{recipe.title}</IonCardTitle>
                      <IonCardSubtitle>
                        <span className="time"> <IonIcon icon={timeOutline}/> {recipe.time}</span>
                        <span className="price">{recipe.price}</span>
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                ))}
              </div>
            </IonContent>
          </div>
        </IonTab>

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
      </IonTabs>
    </IonPage>
  );
};
