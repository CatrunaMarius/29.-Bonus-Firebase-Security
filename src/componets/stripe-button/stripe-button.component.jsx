import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ( { price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HhFGpJbp6axQ3t41KItVK2T4DHHwQdBuDeNrQGNMQPiEEEdq9GPmXG6mneTgp8qis4bNMqlOCA3ApnBlJRS9tV200b18mJzl7';


    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return(
        <StripeCheckout 
            label= 'Pay Now'
            name= 'e-Shopping Ltd.'
            billingAddress
            shippingAddress
            image= 'https://svgshare.com/i/CUz.svg'
            description= {`Your total is $${price}`}
            amount= {priceForStripe}
            panelLabel= 'Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;