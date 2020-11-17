import React from 'react';

import SignIn from '../../componets/sign-in/sign-in.component';
import SignUp from '../../componets/sign-up/sign-up.component'

import { 
    SignInAndSignUpContainer 
} from './sign-in-and-sign-up.styles';











const SignInAndSignUpPage = () =>(
    <SignInAndSignUpContainer>
        <SignIn />
        <SignUp />
    </SignInAndSignUpContainer>
) 
export default SignInAndSignUpPage;