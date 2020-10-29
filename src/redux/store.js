import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReaducer from './root-reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

// stocare locala
export const store = createStore(rootReaducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
//===============================================

// export default { store, persistStore };
