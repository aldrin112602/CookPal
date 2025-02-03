import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
// Loading Component
import LoadingScreen from "./components/LoadingScreen";
import { SplashScreen } from "@capacitor/splash-screen";

const hideSplash = async () => {
  await SplashScreen.hide();
};

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

// Lazy load components
const Login = React.lazy(() =>
  import("./pages/Login").then((module) => ({
    default: module.Login,
  }))
);

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    hideSplash();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Suspense fallback={<LoadingScreen />}>
              <Route path="/" exact={true}>
                <Login />
              </Route>
            </Suspense>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
