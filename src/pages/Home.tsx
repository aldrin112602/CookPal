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
import { useState } from "react";

export const Home: React.FC = () => {
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Adobo_DSCF4391.jpg/1200px-Adobo_DSCF4391.jpg";
  const recipes = [
    {
      id: 1,
      title: "Filipino Style Pork Adobo",
      time: "45 min",
      price: "₱181.25",
      image,
      isFavorite: false,
    },
    {
      id: 2,
      title: "Fried Chicken",
      time: "25 min",
      price: "₱180 - ₱200",
      image,
      isFavorite: false,
    },
    {
      id: 3,
      title: "Sinigang na bangus",
      time: "45 min",
      price: "₱181.25",
      image,
      isFavorite: false,
    },
    {
      id: 4,
      title: "Tortang talong",
      time: "25 min",
      price: "₱180 - ₱200",
      image,
      isFavorite: false,
    },
  ];

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearchInput = (e: any) => {
    const searchTerm = e.target.value.trim().toLowerCase();
  
    const filteredItems = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm) 
    );
  
    setFilteredRecipes(filteredItems);
  };
  

  return (
    <IonPage>
      <IonTabs className="md:max-w-1/3 w-full mx-auto">
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
                onInput={handleSearchInput}
              />
            </IonHeader>

            <IonContent
              scrollY={true}
              style={{
                minHeight: "14rem",
              }}
            >
              <div className="recipe-grid px-4 py-5">
                {filteredRecipes.map((recipe, index) => (
                  <IonCard key={index} className="recipe-card">
                    <div className="image-container relative">
                      <IonImg src={recipe.image} />
                      <div className="flex items-center justify-between absolute w-full top-0 mt-7 px-6">
                        <IonIcon
                          icon={personCircleOutline}
                          className="text-4xl text-white"
                        />
                        <div className="flex items-center justify-center p-1 bg-yellow-400 rounded-full cursor-pointer">
                          <IonIcon
                            icon={recipe.isFavorite ? heart : heartOutline}
                            className={`text-2xl ${
                              recipe.isFavorite
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                            onClick={() => {
                              setFilteredRecipes((curr) =>
                                curr.map((item) =>
                                  item.id === recipe.id
                                    ? { ...item, isFavorite: !item.isFavorite }
                                    : item
                                )
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>{recipe.title}</IonCardTitle>
                      <IonCardSubtitle>
                        <span className="time">
                          {" "}
                          <IonIcon icon={timeOutline} /> {recipe.time}
                        </span>
                        <span className="price">{recipe.price}</span>
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                ))}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
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
