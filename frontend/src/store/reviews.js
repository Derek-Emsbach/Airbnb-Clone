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
  const response = await csrfFetch(`/api/`)
}
