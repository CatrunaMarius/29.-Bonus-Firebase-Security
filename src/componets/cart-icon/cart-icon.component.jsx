// creaza imaginea si afisarea cosului
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';


import {
    CartContainer,
    ShoppingIcon,
    ItemCountContainer
  } from './cart-icon.styles';








const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <CartContainer onClick={toggleCartHidden}>
        <ShoppingIcon  />
        <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartContainer>
);

//trimite 
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

// care afiseaza nr total de iteme in cos
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(
     mapStateToProps,
     mapDispatchToProps
     )(CartIcon);

