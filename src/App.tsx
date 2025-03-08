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
import React from "react";
import AddRecipe from "./pages/AddRecipe";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FeaturedShowcase from "./pages/FeaturedShowcase";

setupIonicReact();


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
            <FeaturedShowcase />
          </Route>
          <Route path="/signup" exact={true}>
            <Signup />
          </Route>
          <Route path="/signin" exact={true}>
            <Signin />
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>
          <Route path="/favorites" exact={true}>
            <Favorites />
          </Route>
          <Route path="/forgot_password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/verify_otp" exact={true}>
            <VerifyOTP />
          </Route>
          <Route path="/reset_password" exact={true}>
            <ResetPassword />
          </Route>
          <Route path="/add_recipe" exact={true}>
            <AddRecipe />
          </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
