import React,{createContext, useState, useEffect} from 'react';
import { onAuthStateChangedListener, createUserDocFromAuth} from '../utils/firebase/firebase.utils';


//default context value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//context component 
//this wrapps around every components that need access to the it's context (state) value
export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {

       const unsubscribe =onAuthStateChangedListener((user) => {

         if(user) {

             createUserDocFromAuth(user);
         }

         setCurrentUser(user);
       });
       
       return unsubscribe;

    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}