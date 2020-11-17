import React, { useEffect } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './componets/header/header.component'
import SignInAndSignUpPage  from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/chechout/chechout.component'


import {selectCurrentUser} from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions';








const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  
  return (
    <div >
      <Header /> 
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route  path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route 
        exact 
        path='/signin' 
        render={() => 
          currentUser ? (
            <Redirect to='/' />
            ) : (
            <SignInAndSignUpPage />
            )
          } 
        />
      </Switch>
      

    </div>
  );
}
  


// atunci cand este conecta userul nu mai ai a acces la pagina de signin
// redirectioneaza catre home daca utilizatorul este signin
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
  
})


const mapDispatchToProps = dispatch =>({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
