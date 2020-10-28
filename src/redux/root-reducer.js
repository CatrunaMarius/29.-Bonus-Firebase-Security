import { combineReducers } from 'redux';
import { persistReducer} from 'redux-persist';
import storage  from 'redux-persist/lib/storage'


import userReducer from './user/user.reducer';
import cartReaducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// stocare locala
const persistConfig ={
    key: 'root',
    storage,
    whitelist: ['cart']
}

// reducer
const rootReducer = combineReducers ({
    user: userReducer,
    cart: cartReaducer,
    directory: directoryReducer,
    shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);