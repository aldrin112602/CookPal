import { IonCard, IonImg, IonIcon } from "@ionic/react";
import { heart, heartOutline, timeOutline, eyeOutline } from "ionicons/icons";

// Define Recipe type
interface Recipe {
  id: number;
  image: string;
  title: string;
  time: string;
  price: string;
  isFavorite: boolean;
}

// Define Props for RecipeCard
interface RecipeCardProps {
  recipe: Recipe;
  key: number;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  filteredRecipes: Recipe[];
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  recipes,
  setRecipes,
  filteredRecipes,
  setFilteredRecipes,
  key,
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

  return (
    <IonCard className="recipe-card" key={key}>
      <div className="image-container relative">
        <IonImg src={recipe.image} />
        <div className="flex items-start justify-between absolute w-full top-0 mt-3 px-4">
          <div className="flex items-start justify-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              alt="Profile avatar"
              width={"50px"}
              className="rounded-full"
            />
            <div
              className="text-white p-2"
              style={{ textShadow: "1px 1px 5px #222" }}
            >
              <span className="block font-semibold">John Doe</span>
              <span className="block">Posted Yesterday</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center bg-white rounded-full cursor-pointer"
            style={{ height: "30px", width: "30px" }}
          >
            <IonIcon
              icon={recipe.isFavorite ? heart : heartOutline}
              className={`text-2xl ${
                recipe.isFavorite ? "text-black" : "text-gray-600"
              }`}
              onClick={toggleFavorite}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 pb-3 pl-3 pt-0 w-full"
        style={{ backdropFilter: "blur(2px)", background: "rgba(0,0,0,0.1)" }}
      >
        <h1 style={{ color: "white", textShadow: "1px 1px 1px #222" }}>
          {recipe.title}
        </h1>
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
              <IonIcon icon={timeOutline} /> {recipe.time}
            </span>
            <span
              title={`Estimated recipe price range for ${recipe.title}`}
              className="rounded-full px-2"
              style={{
                color: "#222",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {recipe.price}
            </span>
          </div>

          <span className="text-white mr-5 flex border px-1 rounded-full items-center justify-start gap-1 hover:bg-yellow">
            {<IonIcon icon={eyeOutline} />} View recipes
          </span>
        </div>
      </div>
    </IonCard>
  );
};

export default RecipeCard;
