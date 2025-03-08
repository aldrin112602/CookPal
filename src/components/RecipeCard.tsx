import { IonCard, IonImg, IonIcon } from "@ionic/react";
import { heart, heartOutline, timeOutline, eyeOutline } from "ionicons/icons";
const BASE_URL_API =
  import.meta.env?.VITE_BASE_URL_API ??
  "https://lavender-armadillo-802676.hostingersite.com/api";
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

interface RecipeCardProps {
  key: number;
  recipe: Recipe;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  filteredRecipes: Recipe[];
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  key,
  recipe,
  recipes,
  setRecipes,
  filteredRecipes,
  setFilteredRecipes,
}) => {
  const toggleFavorite = () => {
    const updatedRecipes = recipes.map((item) =>
      item.id === recipe.id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setRecipes(updatedRecipes);

    setFilteredRecipes(
      filteredRecipes.map((item) =>
        item.id === recipe.id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };
  

  const defaultImage = "https://img.freepik.com/premium-vector/image-available-icon-set-default-missing-photo-stock-vector-symbol-black-filled-outlined-style-no-image-found-sign_268104-6708.jpg?semt=ais_hybrid";
  const profileImage = recipe?.user?.profile
    ? `${BASE_URL_API.replace("api", "")}${recipe?.user?.profile}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s";
  return (
    <IonCard className="recipe-card" key={key}>
      <div className="image-container relative">
        <IonImg
          src={recipe?.image || defaultImage}
          className="object-fit-cover w-full"
          style={{
            height: "240px",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <div className="flex items-start justify-between absolute w-full top-0 mt-3 px-4">
          <div className="flex items-start justify-start">
            <img
              src={profileImage}
              alt="Profile avatar"
              width={"50px"}
              className="rounded-full border border-slate-400 cursor-pointer object-cover" 
            />
            <div
              className="text-white p-2"
              style={{ textShadow: "1px 1px 5px #222" }}
            >
              <span className="block font-semibold">{recipe.user.name}</span>
              <span className="block">{recipe.time_ago}</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center bg-white rounded-full cursor-pointer"
            style={{ height: "30px", width: "30px" }}
            onClick={toggleFavorite}
          >
            <IonIcon
              icon={recipe.isFavorite ? heart : heartOutline}
              className={`text-2xl ${
                recipe.isFavorite ? "text-black" : "text-gray-600"
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 pb-3 pl-3 pt-0 w-full"
        style={{ background: "rgba(0,0,0,0.1)" }}
      >
        <div
          style={{ color: "white", textShadow: "1px 1px 1px #222" }}
          className="pt-2 mb-2"
        >
          <span className="text-2xl font-bold">{recipe.title}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <span
              className="rounded-full px-2 flex items-center justify-start gap-2"
              style={{
                color: "#222",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
              title="Estimated cooking time"
            >
              <IonIcon icon={timeOutline} /> {recipe.preparation_time}
            </span>
            <span
              title={`Serves ${recipe.serves}`}
              className="rounded-full px-2"
              style={{
                color: "#222",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Serves {recipe.serves}
            </span>
          </div>

          <span className="text-white mr-5 flex border px-1 rounded-full items-center justify-start gap-1 hover:bg-yellow cursor-pointer hover:text-black transition-all">
            <IonIcon icon={eyeOutline} /> View Recipe
          </span>
        </div>
      </div>
    </IonCard>
  );
};

export default RecipeCard;
