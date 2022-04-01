import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

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
    prompt: 'select_Account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);