import React from "react";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./Components/StripeCheckout";
import Dashboard from "./Components/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QBTable from "./Components/QBTable";

const stripeElements = loadStripe(
  "pk_test_51Igi1YG7Q5UI7HFB8FBqzZDbdfiPp0CtDB8YVwEE8HGbFfUkgOQq829SD0qIET03fyC7rqRH8mwloIAPoFVrchYX00BEkq69L8"
);

function App() {
  return (
    <div className="App">
      <Router>
        <Elements stripe={stripeElements}>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/subscribe" exact component={StripeCheckoutForm} />
            <Route path="/premium" exact component={QBTable} />
          </Switch>
        </Elements>
      </Router>
    </div>
  );
}

export default App;
