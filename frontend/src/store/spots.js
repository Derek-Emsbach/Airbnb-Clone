import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const ADD_SPOT = 'spots/ADD_SPOT'
const EDIT_SPOT = 'spot/EDIT_SPOT'
const DELETE_SPOT = 'spot/DELETE_SPOT'

//? Actions

const loadSpots = spots => ({
  type: GET_ALL_SPOTS,
  spots
})

const addSpot = spots => ({
  type: ADD_SPOT,
  spots
})

const updateSpot = spots => ({
  type: EDIT_SPOT,
  spots
})

const deleteSpots = spotId => ({
  type: DELETE_SPOT,
  spotId
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

export const getSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)

  if(response.ok) {
    const spots = await response.json()
    dispatch(addSpot(spots))
    return spots
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
    dispatch(addSpot(spot));
    return spot;
  }
};

export const editSpot = (spotId, spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(spot),
	});
  if (response.ok) {
    const spotEdited = await response.json()
    dispatch(updateSpot(spotEdited))
    return spotEdited
  }
}

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
  }
  })
  if(response.ok){
    dispatch(deleteSpots(spotId))
  }
}


const initialState = {}

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_ALL_SPOTS:
      // const newState = {}
      action.spots.forEach(spot => {
        newState[spot.id] = spot
      })
      return {
        ...state,
        ...newState
      }
    case ADD_SPOT:
      // let newStateAdd = { ...state }
      newState[action.spots.id] = action.spots
      return newState
    case EDIT_SPOT:
      // let newStateEdit = { ...state }
      newState[action.spots.id] = action.spots
      return newState
    case DELETE_SPOT:
      // let newStateDelete = { ...state }
      delete newState[action.spotId]
      return newState
    default:
      return state
  }
}

export default spotsReducer
