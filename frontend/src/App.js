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
import SpotEditForm from './components/SpotsEdit/SpotEditForm'
import SpotDelete from './components/SpotsDelete/SpotDelete'

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
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path='/signup'>
          <SignupFormPage />
        </Route>
        <Route exact path={['/', '/spots']}>
          <SpotsBrowser />
        </Route>
        <Route exact path='/spots/create'>
          <CreateSpotForm />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <SpotEditForm />
        </Route>
        <Route exact path='/spots/:spotId/delete'>
          <SpotDelete />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotById />
        </Route>
      </Switch>
    )}
    </>
  );
}

export default App;
