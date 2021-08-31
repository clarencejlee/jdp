import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StripeCheckout, CreateProduct, AdminDashboard } from '../.';

const App = () => {
  return (
    <AdminDashboard isAdmin adminEndpoint="http://localhost:3000/products" />
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
