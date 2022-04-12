import React,{createContext, useState} from 'react';


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
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}