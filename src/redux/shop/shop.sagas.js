// acest foldar contine toate codurile cu saga care sunt relevante de catre shop

import { takeLatest,call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import { 
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionAsync(){
   yield console.log('i am fired');

   try 
   {
    //colection    
   const collectionRef =  firestore.collection('collections');
    // folosim collectionref pentru a optine snapshot dar in loc sa folosim o promisiune volosim o functie generatoare
   const snapshot = yield collectionRef.get(); // cand aceasa valoare vine inapoi vine sub forma unei promisiuni
    //creare collection map    
   const collectionsMap = yield call(
       convertCollectionsSnapshotToMap,
        snapshot);
   
   yield put(fetchCollectionsSuccess(collectionsMap));

   }catch(error) {
       yield put(fetchCollectionsFailure(error.message))
   }
        
}

export function* fetchcollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
        );
}