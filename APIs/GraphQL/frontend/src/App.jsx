import { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ShopifyItem } from "./containers/shopify-item";
import { SignupScreen } from "./containers/signup/signup.component";
import { VerifyShopifyData } from "./containers/verify-shopify-data";
import { WelcomeScreen } from "./containers/welcome";

const LoginScreen = lazy(() => import("./containers/login/login.component"));
const ShopifyDashboard = lazy(() =>
  import("./containers/shopify-dashboard/shopify-dashboard.component")
);

export const ROUTES = {
  home: "/welcome",
  login: "/login",
  signup: "/signup",
  verifyAccount: "/verify-account",
  dashboard: "/shopify-dashboard",
  shopItem: "/shopify-dashboard/:item",
};

function App() {
  return (
    <Suspense fallback={() => <h1>Loading...</h1>}>
      <Switch>
        <Redirect exact from="/" push to={ROUTES.login} />
        <Route exact path={ROUTES.home} component={WelcomeScreen} />
        <Route exact path={ROUTES.login} component={LoginScreen} />
        <Route exact path={ROUTES.signup} component={SignupScreen} />
        <Route
          exact
          path={ROUTES.verifyAccount}
          component={VerifyShopifyData}
        />
        <Route exact path={ROUTES.dashboard} component={ShopifyDashboard} />
        <Route exact path={ROUTES.shopItem} component={ShopifyItem} />
      </Switch>
    </Suspense>
  );
}

export default App;
