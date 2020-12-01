// se ocupa de partea de adauga iteme in cos
import CartActionTypes from './cart.types';









export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// defini actiunea de a aduga
export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

// scade itemul din cos cand sunt multe iar cand scade la zero sterge itemul din cos
export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});

// sterge itemle din cart/cos
export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

// goleste cosul
export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART
});

// Seteaza coslui in baza de date pentru primadata
export const setCartFromFirebase = cartItems  => ({
    type: CartActionTypes.SET_CART_FROM_FIREBASE,
    payload: cartItems
});

// uptateaza cosul in baza de date
export const updateCartInFirebase = () => ({
    type: CartActionTypes.UPDATE_CART_IN_FIREBASE
});