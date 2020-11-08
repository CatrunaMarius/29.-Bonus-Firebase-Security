import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcsf6Vi76rmsNdDTxdaCE62H60rcK85uw",
  authDomain: "crwn-db-17f11.firebaseapp.com",
  databaseURL: "https://crwn-db-17f11.firebaseio.com",
  projectId: "crwn-db-17f11",
  storageBucket: "crwn-db-17f11.appspot.com",
  messagingSenderId: "700159832264",
  appId: "1:700159832264:web:c2e5173caeefb87fd7f5fd",
  measurementId: "G-9MG0295FZB"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

//  setare autetificare utiliti cu Google
const provider = new firebase.auth.GoogleAuthProvider();


export const signInWithGoogle = () => firebase.auth().signInWithRedirect(provider);

// initialize database
  //preaia userul autetificat cu google si il trece in database
  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    // daca nu exista vom crea acel utilizator in baza de date
    //verifica daca acel user exita
    if (!snapShot.exists){
      const { email, displayName } = userAuth;
      const createdAt = new Date();

      // creaza acel user daca nu exista
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
     } catch (error) {
        console.log('error create user ', error.message);
      }

    }
    
    return userRef;
  }

// functia care creza noi colecti si documente cand vrem
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  console.log(collectionRef);

  // creaza o batch in cazul incare data_list esueaza inrun anumit punct
  // atunci toata data_list va esua
  const batch = firestore.batch();
  objectsToAdd.forEach( obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) =>{
   const trasformedCollection = collections.docs.map(doc =>{
     const { title, items } = doc.data();

     return {
       routeName: encodeURI(title.toLowerCase()),
       id: doc.id,
       title,
       items
     };
   });

  return trasformedCollection.reduce( (accumulator, collection) => {
     accumulator[collection.title.toLowerCase()]= collection;
     return accumulator;
   }, {});
 }

export default firebase;