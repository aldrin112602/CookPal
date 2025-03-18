import React from "react";
import { IonContent } from "@ionic/react";
import RecipeCard from "../RecipeCard";
import NoResultsFoundRecipe from "../NoResultsFoundRecipe";

interface RecipeContentProps {
  filteredRecipes: any[];
  recipes: any[];
  setFilteredRecipes: (recipes: any[]) => void;
  setRecipes: (recipes: any[]) => void;
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