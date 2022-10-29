import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import CreateSpotForm from './components/CreateSpotForm.js';
import * as sessionActions from "./store/session";
import SpotsBrowser from './components/Spots/index';

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])
  return isLoaded && (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route exact path={['/', '/spots']}>
          <SpotsBrowser />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route>
          <CreateSpotForm exact path='/spots/create'/>
        </Route>
      </Switch>
    )}
    </>
  );
}

export default App;
