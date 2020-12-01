// se ocupa de partea de adauga iteme in cos
import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';










const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };

        //adauga iteme in cos 
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload) //action.payload itemul pe care vem sa il adugam
            };
        // scade itemul din cos
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };

        // sterge iteme din cos
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            };

        // clear cosul cand utilizatorul signout
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        
        // seteaza/creaza cosul in baza de date
        case CartActionTypes.SET_CART_FROM_FIREBASE:
            return {
                ...state,
                cartItems: action.payload
            };

        default:
            return state;
    }  
};

export default cartReducer;