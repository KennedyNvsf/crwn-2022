import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

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

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

  export const db = getFirestore();

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

  export const createUserDocWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }