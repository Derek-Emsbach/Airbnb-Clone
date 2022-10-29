import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const ADD_SPOT = 'spots/ADD_SPOT'

//? Actions

const loadSpots = spots => ({
  type: GET_ALL_SPOTS,
  spots
})

const addSpot = spots => ({
  type: ADD_SPOT,
  spots
})

//? Thunks

export const getSpots = () => async dispatch => {
  const response = await csrfFetch('/api/spots')

  if (response.ok) {
    const data = await response.json()
    dispatch(loadSpots(data))
    return data
  }
}

export const createSpot = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  if (response.ok) {
    const spot = await response.json();
    console.log(spot, 'Spot Create')
    dispatch(addSpot(spot));
    return spot;
  }
};


const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      const newState = {}
      action.spots.forEach(spot => {
        newState[spot.id] = spot
      })
      return {
        ...state,
        ...newState
      }
    case ADD_SPOT:
      let newStateAdd = { ...state }
      newStateAdd[action.spots.id] = action.spots
      return newStateAdd
    default:
      return state
  }
}

export default spotsReducer
