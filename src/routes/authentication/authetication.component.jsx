import React from 'react';
//firebase
import {signInWithGooglePopup, createUserDocFromAuth, signInWithGoogleRedirect, auth} from "../../utils/firebase/firebase.utils";
//components
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form";

const Authentication = () => {

    return (

        <div>
            <h1>Signin page</h1>

            <SignInForm/>
            <SignUpForm/>
           
        </div>
    )
}

export default Authentication;