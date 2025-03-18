import React, { useEffect, useRef } from "react";
import {
  IonTabs,
  IonTab,
  IonPage,
  useIonLoading,
} from "@ionic/react";
import "../assets/styles/Home.css";
import useAuthGuard from "../hooks/useAuthGuard";
import useFetchUser from "../hooks/useFetchUser";
import useFetchRecipes from "../hooks/useFetchRecipes";
import useSearch from "../hooks/useSearch";
import HomeHeader from "../components/home/HomeHeader";

import RecipeContent from "../components/home/RecipeContent";
import TabBar from "../components/home/TabBar";
import AddRecipeTab from "../components/home/AddRecipeTab";
import FavoritesTab from "../components/home/FavoritesTab";

const Home: React.FC = () => {
  useAuthGuard(false, "/signin");
  const { user } = useFetchUser();
  const [present, dismiss] = useIonLoading();
  const loadingShown = useRef(false);
  const { recipes, loading, error, setRecipes } = useFetchRecipes();
  const {
    filteredRecipes,
    setFilteredRecipes,
    isFocus,
    setIsFocus,
    searchInputRef,
    handleSearchInput,
  } = useSearch(recipes);

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
  }, [recipes, error, loading, user, present, dismiss, setFilteredRecipes]);

  const headerProps = {
    user,
    handleSearchInput,
    isFocus,
    setIsFocus,
    searchInputRef,
    recipes,
    setFilteredRecipes,
  };

  return (
    <IonPage>
      <IonTabs className="md:max-w-1/3 w-full mx-auto bg-white text-black">
        {/* Home Tab */}
        <IonTab tab="home">
          <div id="home-page">
            <HomeHeader {...headerProps} />
            <RecipeContent
              filteredRecipes={filteredRecipes}
              recipes={recipes}
              setFilteredRecipes={setFilteredRecipes}
              setRecipes={setRecipes}
              isFocus={isFocus}
            />
          </div>
        </IonTab>

        {/* Add Recipe Tab */}
        <IonTab tab="add">
          <AddRecipeTab />
        </IonTab>

        {/* Favorites Tab */}
        <IonTab tab="favorites">
          <FavoritesTab headerProps={headerProps} />
        </IonTab>

        <TabBar />
      </IonTabs>
    </IonPage>
  );
};

export default Home;