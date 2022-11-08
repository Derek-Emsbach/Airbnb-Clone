import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpotById } from '../../store/spots';
import ReviewBySpotId from '../Reviews/ReviewBySpotId';
import { getReviews } from '../../store/reviews';
import './SpotById.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SpotById = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector(state =>{
    return state.spots
  })
  const reviews = useSelector(state =>state.reviews)

  const spot = spots[spotId]


  useEffect(() => {
    dispatch(getSpotById(spotId))
    dispatch(getReviews(spotId))
  }, [dispatch, spotId])

  const editSpot = () => {
		let path = `/spots/${spotId}/edit`
		history.push(path)

	}

  const deleteSpot = () => {
    let path = `/spots/${spotId}/delete`
    history.push(path);
  }

  const reviewSpot = () => {
    let path = `/spots/${spotId}/reviews`
    history.push(path);
  }

  const allReviews = Object.values(reviews)

  const specificReview = allReviews.filter(review =>review.spotId === spot.id)

  let allStars =specificReview.map(review => review.stars)

  let rate = allStars.reduce(function(sum, star){
    const avg = (sum+star)
    return avg
  },0)

  let averageRating = Number(rate/specificReview.length).toFixed(2)


  return (
    <>
      {spot && (
        <div>
          <h1>{spot.name}</h1>
          <div>{spot.city}, {spot.state}, {spot.country}</div>
          <div>
            <img src={spot.previewImage} className="singleSpotImg" alt="spot-preview"></img>
          </div>
          <div>{spot.description}</div>
          <div>${spot.price}</div>
          <div>
          <FontAwesomeIcon className="star" icon={faStar} />
          {!Number(averageRating) ? null :averageRating }
            </div>
          <br></br>
          <h3>Reviews</h3>
          <ReviewBySpotId spot={spot} />
          {sessionUser?.id === spot.ownerId && (
            <button onClick={editSpot}>Edit Spot</button>
          )}
          {sessionUser?.id === spot.ownerId && (
            <button onClick={deleteSpot}>Delete Spot</button>
          )}
          {sessionUser?.id && (
            <button onClick={reviewSpot}>Review Spot</button>
          )}
        </div>
      )}
    </>

  )
}

export default SpotById
