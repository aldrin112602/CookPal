import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";

const useAuthGuard = (isAuth: boolean, redirect: string) => {
  const history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Preferences.get({ key: "TOKEN" });

      const isUserAuthenticated = !!user.value;
      if (isUserAuthenticated === isAuth) {
        history.push(redirect);
      }
    };

    checkAuth();
  }, [isAuth, redirect]);
};

export default useAuthGuard;
