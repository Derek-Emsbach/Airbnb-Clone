import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import CreateSpotForm from './components/CreateSpotForm.js';
import * as sessionActions from "./store/session";
import SpotsBrowser from './components/Spots/index';
import SpotById from './components/SpotsById/SpotById';

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
        <Route exact path='/'>
          <SpotsBrowser />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route>
          <SpotById path='/spots/:spotId' />
        </Route>
        <Route>
          <CreateSpotForm exact path='/spots/create'/>
        </Route>
        {/* <Route>
          <SpotById exact path='/spots/:spotId' />
        </Route>
        <Route>
          <SpotById exact path='/spots/:spotId' />
        </Route> */}
      </Switch>
    )}
    </>
  );
}

export default App;
