
import React,{useState} from "react";
import "./sign-up-form.styles.scss";//styling
import {createUserAuthWithEmailAndPassword, createUserDocFromAuth} from "../../utils/firebase/firebase.utils";//firebase utils
//components
import FormIput from "../form-input/forn-input.component";
import Button from "../../components/button/button.component";

const defaultFormFields = {

    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

   const resetFormFields = () => {
       setFormFields(defaultFormFields);
   }

    const handleChange = (event) => {

        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if(password !== confirmPassword) {

            alert('passwords do not match');
            return;
        }

        try {

            const {user} = await createUserAuthWithEmailAndPassword(email, password);
            console.log({user});
            alert('success');
            await createUserDocFromAuth(user,  {displayName});
            resetFormFields();
           
            
        } catch (error) {

            if(error.code === 'auth/email-already-in-use'){
                alert('Email already Exists')
            } else {console.log('Encountered Error creating the User', error);
        }
            
            
        }
    }
   
    return (

        <div className="sign-up-container">

            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                
                <FormIput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                
                <FormIput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

               
                <FormIput label="Password" type="password" required  onChange={handleChange} name="password" value={password} />

    
                <FormIput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>

        </div>
    )
}

export default SignUpForm;