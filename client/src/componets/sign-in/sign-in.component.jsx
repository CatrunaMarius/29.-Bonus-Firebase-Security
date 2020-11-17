import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { 
    googleSignInStart, 
    emailSignInStart 
} from '../../redux/user/user.actions';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './sign-in.styles';















//  vom folosi functia SignIn pentru ca va trebui sa stocam cea ce va introduce ulilizatorul

const  SingIn = ({ emailSignInStart, googleSignInStart }) => {
    
    const [ userCredentials, setCredentials ] = useState({ 
        email:'', password:''});
        
    const { email, password } = userCredentials;

    const handleSubmit = event =>{
        event.preventDefault();

        
        

        emailSignInStart(email, password);

       
    }

    const handleChange = event =>{
        const {value, name} = event.target;
        setCredentials({
            ...userCredentials,
            [name]: value
        });

    };

 

    return(
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email" 
                    name="email" 
                    value={email}
                    handleChange={handleChange}
                    lable='email'
                    required/>
                
                <FormInput
                    type="password"
                    name="password" 
                    value={password}
                    handleChange={handleChange}
                    lable='password'
                    required />
                
                <ButtonsBarContainer>
                    <CustomButton type="submit" >SIGN IN</CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart} 
                        isGoogleSignIn>
                    
                        Sign in with Google
                    </CustomButton>
                </ButtonsBarContainer>
    
            </form>

        </SignInContainer>
    )
}



const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => 
    dispatch(emailSignInStart({ email, password}))
});

export default connect(
    null, 
    mapDispatchToProps
    )(SingIn);