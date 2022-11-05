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
  const allSpots = useSelector((state) => state.spots)
  const singleSpot = allSpots[spotId]
  const sessionUser = useSelector((state) => state.session.user);


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
      <div>
      <FontAwesomeIcon className="star" icon={faStar} />
        {singleSpot.avgRating}
        </div>
      <br></br>
      <h3>Reviews</h3>
      <ReviewBySpotId spot={singleSpot} />
      <button onClick={editSpot}>Edit Spot</button>
      <button onClick={deleteSpot}>Delete Spot</button>
      <button onClick={reviewSpot}>Review Spot</button>
    </div>

  )
}

export default SpotById
