import React from 'react';
import {signInWithGooglePopup, createUserDocFromAuth, signInWithGoogleRedirect, auth} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    

    const logGoogleUser = async () => {

        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }

    

    return (

        <div>
            <h1>Signin page</h1>

            <button onClick={logGoogleUser}>
                Sign In With Google
            </button>

            <SignUpForm/>
           
        </div>
    )
}

export default SignIn;