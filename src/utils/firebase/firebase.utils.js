 import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc, 
    setDoc,
    collection, 
    writeBatch,
    query,
    getDocs
    } from 'firebase/firestore';

  const firebaseConfig = {
      apiKey: "AIzaSyCCXJnQEdY9MS5OUewOvJ8n8EuPM9eYYnU",
      authDomain: "crwn-2022.firebaseapp.com",
      projectId: "crwn-2022",
      storageBucket: "crwn-2022.appspot.com",
      messagingSenderId: "625218826815",
      appId: "1:625218826815:web:c98088bc360c7d3919be8a"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const GoogleProvider = new GoogleAuthProvider();
  GoogleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider)

  export const db = getFirestore();

  export const addCollectionAndDocuments =  async (collectionLabel, objectsToAdd) => {
    const collectionRef = collection(db, collectionLabel);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    })

    await batch.commit();
    console.log('Done');
  };

  export const getCategoriesAndDocuments = async () => {

    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;

    }, {})

    return categoryMap;
  }

  //storing user in the db collections
  export const createUserDocFromAuth = async (
    userAuth, additionalInfo = {}
    ) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    

    const userSnapshot = await getDoc(userDocRef);
    

    if(!userSnapshot.exists()) {

      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {

        await setDoc(userDocRef, {

          displayName,
          email,
          createdAt,
          ...additionalInfo,
          
        });

      } catch (error) {

        console.log('error creating the user', error.message)

      }

    }

    return userDocRef;

  };


//creating user for the first time
  export const createUserAuthWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

//signing with email and password
  export const signInUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  //signout the user
  export const signOutUser = async () => await signOut(auth);


  //onAuthStateChanged Listener 
  export const onAuthStateChangedListener = (callback) => {
    
    onAuthStateChanged(auth, callback);
  
  }