import { IonIcon } from "@ionic/react";
import { addOutline, searchOutline } from "ionicons/icons";

interface User {
  id: number;
  name: string;
  profile: string;
}

interface Recipe {
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

interface NoResultsFoundRecipeProps {
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  recipes: Recipe[];
  isFocus: boolean;
}
const NoResultsFoundRecipe: React.FC<NoResultsFoundRecipeProps> = ({
  setFilteredRecipes,
  recipes,
  isFocus,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-10 text-center"
      style={{ minHeight: "400px" }}
    >
      <IonIcon icon={searchOutline} className="text-5xl text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        No recipes found
      </h3>

      {!isFocus && (
        <div className="text-gray-500">
          <p>Why not add your first one 😊?</p>
          <button
            className="mt-4 border flex items-center justify-center gap-2 bg-black text-white font-medium mx-auto "
            onClick={() => alert("TODO")}
            style={{
              height: "30px",
              width: "130px",
              borderRadius: "15px",
            }}
          >
            Add Recipe <IonIcon icon={addOutline} />
          </button>
        </div>
      )}

      {isFocus && (
        <>
          <p className="text-gray-500">
            We couldn't find any recipes matching your search criteria.
          </p>
          <button
            className="mt-4 border block bg-black text-white font-medium"
            style={{
              height: "30px",
              width: "130px",
              borderRadius: "15px",
            }}
            onClick={() => {
              setFilteredRecipes(recipes);
            }}
          >
            View all recipes
          </button>
        </>
      )}
    </div>
  );
};

export default NoResultsFoundRecipe;
