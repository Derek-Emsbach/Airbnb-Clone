const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'

const loadSpots = spots => ({
  type: GET_ALL_SPOTS,
  spots
})

export const getSpots = () => async dispatch => {
  const response = await fetch('/api/spots')

  if (response.ok) {
    const data = await response.json()
    dispatch(loadSpots(data))
    return data
  }
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      const newState = {}
      action.spots.spotsWithPreviewImage.forEach(spot => {
        newState[spot.id] = spot
      })
      return {
        ...state,
        ...newState
      }
    default:
      return state
  }
}

export default spotsReducer
