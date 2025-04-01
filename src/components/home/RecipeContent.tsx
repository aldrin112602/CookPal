import React from "react";
import { IonContent } from "@ionic/react";
import RecipeCard from "../RecipeCard";
import NoResultsFoundRecipe from "../NoResultsFoundRecipe";

interface User {
  id: number;
  name: string;
  profile: string;
}

interface AppRecipe {
  id: number;
  user_id: number;
  title: string;
  image: string | null;
  description: string;
  preparation_time: string;
  serves: number;
  cooking_instructions: string;
  created_at: string;
  updated_at: string;
  time_ago: string;
  user: User;
  ingredients: any[];
  isFavorite?: boolean;
}


interface RecipeContentProps {
  filteredRecipes: any[];
  recipes: AppRecipe[];
  setFilteredRecipes: React.Dispatch<React.SetStateAction<AppRecipe[]>>;
  setRecipes: React.Dispatch<React.SetStateAction<AppRecipe[]>>;
  isFocus: boolean;
}

const RecipeContent: React.FC<RecipeContentProps> = ({
  filteredRecipes,
  recipes,
  setFilteredRecipes,
  setRecipes,
  isFocus,
}) => {
  return (
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
  );
};

export default RecipeContent;