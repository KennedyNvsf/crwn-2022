
import React,{useState} from "react";
import "./sign-in-form.styles.scss";//styling
import {createUserDocFromAuth, signInWithGooglePopup, signInUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";//firebase utils
//components
import FormIput from "../form-input/forn-input.component";
import Button from "../../components/button/button.component";

const defaultFormFields = {

    email: "",
    password: "",
   
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

   const resetFormFields = () => {
       setFormFields(defaultFormFields);
   }

   const signInWithGoogle = async () => {

    const {user} = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
  }

    const handleChange = (event) => {

        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            const response = await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
            
        } catch (error) {

             
        }
    }
   
    return (

        <div className="sign-in-container">

            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                
                <FormIput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

               
                <FormIput label="Password" type="password" required  onChange={handleChange} name="password" value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>

        </div>
    )
}

export default SignInForm;