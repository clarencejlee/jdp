import * as React from 'react';
import StripeCheckoutForm from './components/StripeCheckoutForm';
import './index.css';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
export { default as CreateProduct } from './components/CreateProduct';
export { default as AdminDashboard } from './components/AdminDashboard';

interface Props {
  apiKey: string;
  ComponentIfSubscribed: React.ReactNode;
  subscribedEndpoint: string;
  subscribeEndpoint: string;
  logoUrl?: string;
  brandName?: string;
}

export const StripeCheckout = ({
  apiKey,
  ComponentIfSubscribed,
  subscribedEndpoint,
  subscribeEndpoint,
  logoUrl,
  brandName,
}: Props) => {
  const stripeElements = loadStripe(apiKey);
  const [subscribed, setSubscribed] = React.useState(false);

  const checkSubscribed = () => {
    fetch(subscribedEndpoint)
      .then(res => res.json())
      .then(data => setSubscribed(data.subscribed));
  };

  React.useEffect(checkSubscribed, []);

  return (
    <div className={!subscribed ? 'CheckoutContainer' : ''}>
      <Elements stripe={stripeElements}>
        {!subscribed ? (
          <div className="ModalWrapper">
            {logoUrl ? (
              <div className="Logo">
                <img className="LogoImage" src={logoUrl} alt="" />
              </div>
            ) : (
              ''
            )}
            <div className="TitleContainer">
              {brandName ? <p> Payment for {brandName} </p> : ''}
            </div>
            <StripeCheckoutForm
              subscribeEndpoint={subscribeEndpoint}
              ComponentIfSubscribed={ComponentIfSubscribed}
              setParentSubscribed={setSubscribed}
            />
          </div>
        ) : (
          <div>{ComponentIfSubscribed}</div>
        )}
      </Elements>
    </div>
  );
};
