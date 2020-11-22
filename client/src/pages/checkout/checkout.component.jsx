// web page checkout functionaliti  si afisasi
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.compont';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import {
    CheckoutPageContainer,
    CheckoutHeaderContainer,
    HeaderBlockContainer,
    TotalContainer,
    WarningContainer
  } from './checkout.styles';










const CheckoutPage = ({ cartItems, total}) =>(
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>




                <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
        </CheckoutHeaderContainer>
        {
            cartItems.map( cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
        }

        
        <TotalContainer>TOTAL: ${total}</TotalContainer>
        
            <WarningContainer>
                *Please use the following to test credit card for payment with stripe *
                <br />
                Card number: 4000 0566 5566 5556 - CVC:Any 3 digits - Exp: Any future date 
                <br/>
                More card number find here
                https://stripe.com/docs/testing#cards
            </WarningContainer>
              
        
        <StripeCheckoutButton  price={total} />
    </CheckoutPageContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);