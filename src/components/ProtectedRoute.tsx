import { Route, Redirect } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
import { useEffect, useState } from "react";

const ProtectedRoute: React.FC<{ component: React.FC; path: string; exact?: boolean }> = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Preferences.get({ key: "TOKEN" });
      setIsAuthenticated(!!user.value);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? <Route {...rest} component={Component} /> : <Redirect to="/signin" />;
};

export default ProtectedRoute;
