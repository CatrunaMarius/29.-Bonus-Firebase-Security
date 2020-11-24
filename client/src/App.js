import React, { lazy, Suspense, useEffect } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';



// imparte chunk im mai multe chunk mai mici
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))










const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  
  return (
    <div>
      <GlobalStyle />
      <Header /> 
      <Switch>
        <ErrorBoundary>
        {/* imparte chunk im mai multe chunk mai mici 
            Imparte app in parti cat mai mici pentru a 
            crete performata si viteza site-ului
       */}
          <Suspense fallback={<Spinner />} >
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
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
          </Suspense>
        </ErrorBoundary>
      
      </Switch>
      

    </div>
  );
}
  


// atunci cand este conecta userul nu mai ai a acces la pagina de signin
// redirectioneaza catre home daca utilizatorul este signin
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
  
})


const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
