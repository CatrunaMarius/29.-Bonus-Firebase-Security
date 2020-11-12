// afiseaza o casut de tip dropdown care arata itemle care le gasim in cos
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';



import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cart-dropdown.styles';








const CartDropdown = ({ cartItems, history, dispatch }) =>(
    <CartDropdownContainer>
        <CartItemsContainer>
          {
            //  in cazul in care cosul este gos va randa un mesaj, 
            // daca in cos exista iteme va randa acele iteme 
              cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
              ) : (
                  <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
              )
             
          }  
        </CartItemsContainer> 
        <CartDropdownButton
        onClick={() => 
          {
            history.push('/checkout');
            // ascunde cart atunci cand suntem in pagina checkout
            dispatch(toggleCartHidden())
          }}>
          GO TO CHECKOUT
        </CartDropdownButton>

    </CartDropdownContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(CartDropdown));