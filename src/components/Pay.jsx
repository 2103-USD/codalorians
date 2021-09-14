import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { sendStripePayment } from './api/stripe';
import {getToken } from './auth/auth';

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
    console.log(token);
  };

  render() {
    return (
      <StripeCheckout
      billingAddress
      description="Awesome Product"
      image="https://yourdomain.tld/images/logo.svg"
      locale="auto"
      name="YourDomain.tld"
      stripeKey="your_PUBLISHABLE_stripe_key"
      token={this.onToken}
      zipCode
      />
    )
  }
}