import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpotById } from '../../store/spots';
import ReviewBySpotId from '../Reviews/ReviewBySpotId';
import { getReviews } from '../../store/reviews';
import Dev from '../dev/dev';

const SpotById = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const history = useHistory()
  const allSpots = useSelector((state) => state.spots)
  const singleSpot = allSpots[spotId]
  // const reviews = useSelector(state =>state.reviews)
  // console.log(reviews, 'reviews')
  // const allSpotReviews = useSelector((state)=> Object.values(state.reviews))
  // console.log(allSpotReviews, 'allSpotReviews')
  // const specificReviews = allSpotReviews.filter((review)=> review.spotId === singleSpot)
  // console.log(specificReviews, 'reviews')
  // const reviews = useSelector((state) => state.reviews)
  // const allReviews = Object.values(reviews)


  useEffect(() => {
    dispatch(getSpotById(spotId))
    dispatch(getReviews(spotId))
  }, [dispatch, spotId])

  // const editSpot = () => {
	// 	let path = `/spots/${spotId}/edit`
	// 	history.push(path)

	// }

  const deleteSpot = () => {
    let path = `/spots/${spotId}/delete`
    history.push(path);
  }

  const reviewSpot = () => {
    let path = `/spots/${spotId}/reviews`
    history.push(path);
  }

  return (
    <div>
      <h1>{singleSpot.name}</h1>
      {/* <Dev spots={singleSpot} /> */}
      <div>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</div>
      <div>
        <img src={singleSpot.previewImage} className="singleSpotImg" alt="spot-preview"></img>
      </div>
      <div>{singleSpot.description}</div>
      <div>${singleSpot.price}</div>
      <div>{singleSpot.avgRating}</div>
      {/* <ReviewBySpotId spot={singleSpot} /> */}
      {/* <button onClick={editSpot}>Edit Spot</button> */}
      <button onClick={deleteSpot}>Delete Spot</button>
      <button onClick={reviewSpot}>Review Spot</button>
    </div>

  )
}

export default SpotById
