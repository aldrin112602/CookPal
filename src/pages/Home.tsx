import {
  IonTabs,
  IonTab,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonPage,
  useIonLoading,
} from "@ionic/react";
import {
  homeOutline,
  addOutline,
  heartOutline,
  search,
  closeOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/Home.css";
import CookPalDesign from "../assets/images/CookPal Design.webp";
import RecipeCard from "../components/RecipeCard";
import NoResultsFoundRecipe from "../components/NoResultsFoundRecipe";
import useAuthGuard from "../hooks/useAuthGuard";
import useFetchUser from "../hooks/useFetchUser";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { useHistory } from "react-router-dom";

const BASE_URL_API =
  import.meta.env?.VITE_BASE_URL_API ??
  "https://lavender-armadillo-802676.hostingersite.com/api";

const Home: React.FC = () => {
  useAuthGuard(false, "/signin");
  const { user } = useFetchUser();
  const [present, dismiss] = useIonLoading();
  const loadingShown = useRef(false);
  const { recipes, loading, error, setRecipes } = useFetchRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [isFocus, setIsFocus] = useState(false);
  const history = useHistory();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      present(error);
    }

    if (loading && !loadingShown.current && !error && !user) {
      loadingShown.current = true;
      present("Loading screen, please wait...");
    } else {
      setFilteredRecipes(recipes);
      console.log(recipes);
      dismiss();
    }
  }, [recipes]);

  const handleSearchInput = (e: any) => {
    setIsFocus(true);
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

  const HeaderTab = () => {
    return (
      <IonHeader style={{ boxShadow: "none" }}>
        <IonToolbar>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center justify-start gap-2">
              {/* user profile placeholder */}
              <img
                src={
                  user && user.profile
                    ? `${BASE_URL_API.replace("api", "")}${user.profile}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                }
                alt="Profile avatar"
                style={{ width: "50px", height: "50px" }}
                className="rounded-full border border-slate-400 cursor-pointer object-cover"
                onClick={() => history.push("/profile")}
              />
              {/* User Info */}
              {user && (
                <div style={{ lineHeight: "20px" }}>
                  <span className="block font-semibold">{user.name}</span>
                  <span className="block">{user.email}</span>
                </div>
              )}
            </div>
            <img
              src={CookPalDesign}
              alt="CookPal"
              className="logo"
              width={"50px"}
            />
          </div>
        </IonToolbar>

        <h1 className="caprasimo-bold px-5">
          Let's make
          <br />
          delicious food's.
        </h1>

        <div className="px-3" style={{ position: "relative" }}>
          <input
            type="search"
            onInput={handleSearchInput}
            onBlur={() => {
              setIsFocus(false);
            }}
            ref={searchInputRef}
            style={{ border: "1px solid #ccc" }}
            className="w-full rounded-full py-3 px-4 transition-all"
            placeholder="Search.."
          />
          {!isFocus && (
            <IonIcon
              icon={search}
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          )}

          {isFocus && (
            <IonIcon
              icon={closeOutline}
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.value = "";
                  setFilteredRecipes(recipes);
                  setIsFocus(false);
                }
              }}
            />
          )}
        </div>
        <br />
      </IonHeader>
    );
  };

  return (
    <IonPage>
      <IonTabs className="md:max-w-1/3 w-full mx-auto bg-white text-black">
        {/* Home Tab */}
        <IonTab tab="home">
          <div id="home-page">
            <HeaderTab />
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
                    <RecipeCard
                      key={index}
                      recipe={recipe}
                      recipes={recipes}
                      setFilteredRecipes={setFilteredRecipes}
                      setRecipes={setRecipes}
                      filteredRecipes={filteredRecipes}
                    />
                  ))
                ) : (
                  <NoResultsFoundRecipe
                    isFocus={isFocus}
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

        {/* Add Recipe Tab */}
        <IonTab tab="add">
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
        </IonTab>

        {/* Favorites Tab */}
        <IonTab tab="favorites">
          <div id="favorites-page">
          <HeaderTab />
            <IonContent
              scrollY={true}
              style={{
                minHeight: "45vh",
              }}
            >
              <h1>Favorites Tab</h1>
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

export default Home;
