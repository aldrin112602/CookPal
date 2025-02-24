import { useEffect, useState } from "react";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";

const BASE_URL_API =
  import.meta.env.VITE_BASE_URL_API ||
  "https://close-chronicles-moldova-immune.trycloudflare.com/api";

const useFetchUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenData = await Preferences.get({ key: "TOKEN" });
        const token = tokenData.value;

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL_API}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Fetch user error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, loading, error };
};

export default useFetchUser;
