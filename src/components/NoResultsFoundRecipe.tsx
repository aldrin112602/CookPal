import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";

// Define Recipe type
interface Recipe {
  id: number;
  image: string;
  title: string;
  time: string;
  price: string;
  isFavorite: boolean;
}

interface NoResultsFoundRecipeProps {
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  recipes: Recipe[];
}
const NoResultsFoundRecipe: React.FC<NoResultsFoundRecipeProps> = ({
  setFilteredRecipes,
  recipes,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <IonIcon icon={searchOutline} className="text-5xl text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        No recipes found
      </h3>
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
    </div>
  );
};

export default NoResultsFoundRecipe;
