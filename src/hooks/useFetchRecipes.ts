import { useEffect, useState } from "react";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";

const BASE_URL_API =
  import.meta.env?.VITE_BASE_URL_API ?? "https://lavender-armadillo-802676.hostingersite.com/api";

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const tokenData = await Preferences.get({ key: "TOKEN" });
        const token = tokenData.value;

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL_API}/user/home`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecipes(response.data.recipes);
      } catch (err) {
        setError("Failed to fetch recipes");
        console.error("Fetch recipes error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error, setRecipes };
};

export default useFetchRecipes;
