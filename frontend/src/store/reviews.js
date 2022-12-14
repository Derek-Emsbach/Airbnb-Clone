import { csrfFetch } from "./csrf"

export const LOAD_REVIEWS = "spots/LOAD_REVIEWS"
export const ADD_REVIEW = "spots/ADD_REVIEW"
export const REMOVE_REVIEW = "review/REMOVE_REVIEW"

const load = (reviews, spotId) => {
  return {
    type: LOAD_REVIEWS,
    reviews,
    spotId
  }
}

const add = (reviews) => {
  return {
    type: ADD_REVIEW,
    reviews
  }

  }

const remove = reviewId => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  }
}

export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(response.ok) {
    const reviews = await response.json()
    dispatch(load(reviews, spotId))
    return reviews
  }
}

export const addReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
  })

  if(response.ok) {
    const data = await response.json()
    dispatch(add(data))
    return data
  }
}

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers:{
      'Content-Type':'application/json'
    }
  })

  if(response.ok) {
    dispatch(remove(reviewId))
  }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_REVIEWS:
      action.reviews.spotReviews.forEach(review => {
        newState[review.id] = review
      });
      return newState
    case ADD_REVIEW:
      newState[action.reviews.id] = action.reviews
      return newState
    case REMOVE_REVIEW:
      delete newState[action.reviewId]
      return newState
    default:
      return state
  }
}

export default reviewReducer
