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
  IonPage,
} from "@ionic/react";
import {
  homeOutline,
  addOutline,
  heartOutline,
} from "ionicons/icons";
import React, { useRef } from "react";
import "../assets/styles/Home.css";
import CookPalDesign from "../assets/images/CookPal Design.webp";
import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import NoResultsFoundRecipe from "../components/NoResultsFoundRecipe";
import useAuthGuard from "../hooks/useAuthGuard";

const Favorites: React.FC = () => {
  useAuthGuard(!1, '/signin');
  const [recipes, setRecipes] = useState([
    {
      id: 3,
      title: "Sinigang na bangus",
      time: "45 min",
      price: "₱181.25",
      image: 'https://assets.unileversolutions.com/recipes-v2/110716.png',
      isFavorite: true,
    },
    {
      id: 4,
      title: "Tortang talong",
      time: "25 min",
      price: "₱180 - ₱200",
      image: 'https://www.pinoyfamilyrecipes.com/wp-content/uploads/2024/05/Tortang-Talong-1.jpg',
      isFavorite: true,
    },
    {
      id: 1,
      title: "Filipino Style Pork Adobo",
      time: "45 min",
      price: "₱181.25",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Adobo_DSCF4391.jpg/1200px-Adobo_DSCF4391.jpg',
      isFavorite: true,
    },
    {
      id: 2,
      title: "Fried Chicken",
      time: "25 min",
      price: "₱180 - ₱200",
      image: 'https://christieathome.com/wp-content/uploads/2020/10/Facetune_06-10-2020-15-37-58-scaled.jpg',
      isFavorite: true,
    },
  ]);

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const searchInputRef = useRef<HTMLIonSearchbarElement>(null);

  const handleSearchInput = (e: any) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    if (!searchTerm) {
      setFilteredRecipes(recipes);
    } else {
      handleSearchTerm(searchTerm);
    }
  };

  const handleSearchTerm = (searchTerm: string) => {
    const filteredItems = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    setFilteredRecipes(filteredItems);
  };

  return (
    <IonPage>
      <IonTabs className="md:max-w-1/3 w-full mx-auto bg-white text-black">
        <IonTab tab="home">
          <div id="home-page">
            <IonHeader style={{ boxShadow: "none" }}>
              <IonToolbar>
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center justify-start gap-2">
                    {/* user profile placeholder */}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                      alt="Profile avatar"
                      width={"50px"}
                      className="rounded-full border border-slate-400"
                      onClick={() => {
                        // Open profile section
                      }}
                    />
                    <div style={{ lineHeight: "20px" }}>
                      <span className="block font-semibold">John Doe</span>
                      <span className="block">johnDoe@gmail.com</span>
                    </div>
                  </div>
                  <img src={CookPalDesign} alt="CookPal" className="logo" width={'50px'} />
                </div>
              </IonToolbar>

              <h1 className="caprasimo-bold px-5">
                Your Favorites Recipes
              </h1>

              <div className="px-3">
                <IonSearchbar
                  placeholder="Search Recipe"
                  className="custom-searchbar"
                  onInput={handleSearchInput}
                  ref={searchInputRef}
                  onIonClear={() => {
                    setFilteredRecipes(recipes);
                  }}
                />
              </div>
            </IonHeader>

            <IonContent
              scrollY={true}
              style={{
                minHeight: "45vh",
              }}
            >
              <div
                className="px-4 py-5"
                style={{ background: "#EFD959", borderRadius: "40px 40px 0 0" }}
              >
                {filteredRecipes.length ? (
                  filteredRecipes.map((recipe, index) => (
                    <>
                    </>
                    // <RecipeCard
                    //   key={recipe.id}
                    //   recipe={recipe}
                    //   recipes={recipes}
                    //   setFilteredRecipes={setFilteredRecipes}
                    //   setRecipes={setRecipes}
                    //   filteredRecipes={filteredRecipes}
                    // />
                  ))
                ) : (
                  <NoResultsFoundRecipe
                    recipes={recipes}
                    setFilteredRecipes={setFilteredRecipes}
                  />
                )}
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

export default Favorites;
