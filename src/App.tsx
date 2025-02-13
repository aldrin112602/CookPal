import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import LoadingScreen from "./components/LoadingScreen";
import React, { Suspense } from "react";

// Lazy load components
const Signin = React.lazy(() =>
  import("./pages/Signin").then((module) => ({
    default: module.Signin,
  }))
);
const Signup = React.lazy(() =>
  import("./pages/Signup").then((module) => ({
    default: module.Signup,
  }))
);

const Home = React.lazy(() =>
  import("./pages/Home").then((module) => ({
    default: module.Home,
  }))
);

const Favorites = React.lazy(() =>
  import("./pages/Favorites").then((module) => ({
    default: module.Favorites,
  }))
);


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet id="main">
        <Suspense fallback={<LoadingScreen />}>
          <Route path="/" exact={true}>
            {/* <Signin /> */}
            <Home/>
          </Route>
          <Route path="/signup" exact={true}>
            <Signup />
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/favorites" exact={true}>
            <Favorites />
          </Route>
        </Suspense>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
