import { csrfFetch } from "./csrf"

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS"
export const ADD_REVIEW = "reviews/ADD_REVIEW"
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"

const load = (reviews) => {
  type: LOAD_REVIEWS,
  reviews
}

const add = (review) => {
  type: ADD_REVIEW,
  review
}

const remove = (review) => {
  type: REMOVE_REVIEW,
  review
}

const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(response.ok) {
    const reviews = await response.json()
    dispatch(load(reviews, spotId))
  }
}

const addReview = (spotId, review) => async (dispatch) => {
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

const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
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
      const newReviews = {}
      action.reviews.forEach(review => {
        newReviews[review.id] = review
      });
      return {
        ...state,
        newReviews
      }
    case ADD_REVIEW:
      newState[action.review.id] = action.review
      return newState
    case REMOVE_REVIEW:
      newState[action.review.id]
      return newState
    default:
      return state
  }
}
