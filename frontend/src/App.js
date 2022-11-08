import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import CreateSpotForm from './components/CreateSpotForm.js';
import * as sessionActions from "./store/session";
import SpotsBrowser from './components/Spots/index';
import SpotById from './components/SpotsById/SpotById';
import SpotEditForm from './components/SpotsEdit/SpotEditForm'
import SpotDelete from './components/SpotsDelete/SpotDelete'
import CreateReview from './components/Reviews/CreateReview'
import { getSpots, getSpotById } from './store/spots'
import { getReviews } from "./store/reviews";

function App() {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    dispatch(getSpots())
    dispatch(getReviews())
    dispatch(getSpotById(spotId))
  }, [dispatch, spotId])
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
        <Route exact path='/spots/:spotId'>
          <SpotById />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <SpotEditForm />
        </Route>
        <Route exact path='/spots/:spotId/delete'>
          <SpotDelete />
        </Route>
        <Route exact path='/spots/:spotId/reviews'>
          <CreateReview />
        </Route>
      </Switch>
    )}
    </>
  );
}

export default App;
