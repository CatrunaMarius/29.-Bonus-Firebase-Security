// web page checkout functionaliti  si afisasi
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../componets/checkout-item/checkout-item.compont';
import StripeCheckoutButton from '../../componets/stripe-button/stripe-button.component'

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total}) =>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map( cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
        }

        <div className='total'>
            <span>TOTAL: ${total}</span>
           
             <div className='test'>
                 *Please use the following to test credit card for payment with stripe *
                 <br />
                 Card number: 4000 0566 5566 5556 - CVC:Any 3 digits - Exp: Any future date 
                 <br/>
                 More card number find here
                 https://stripe.com/docs/testing#cards
                 </div>
              
        </div>
        <StripeCheckoutButton  price={total} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);