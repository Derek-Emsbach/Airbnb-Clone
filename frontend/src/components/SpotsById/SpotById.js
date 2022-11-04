import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpotById } from '../../store/spots';
import ReviewBySpotId from '../Reviews/ReviewBySpotId';
import { getReviews } from '../../store/reviews';

const SpotById = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const history = useHistory()
  const spot = useSelector((state) => state.spots[spotId])


  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);


  const editSpot = () => {
		let path = `/spots/${spotId}/edit`;
		history.push(path)

	};

  const deleteSpot = () => {
    let path = `/spots/${spotId}/delete`;
    history.push(path);
  };

  const reviewSpot = () => {
    let path = `/spots/${spotId}/reviews`;
    history.push(path);
  }

  return (
    <div>
      <h1>{spot.name}</h1>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <div>
        <img src={spot.previewImage} className="singleSpotImg" alt="spot-preview"></img>
      </div>
      <div>{spot.description}</div>
      <div>${spot.price}</div>
      <div>{spot.avgRating}</div>
      {/* <ReviewBySpotId /> */}
      <button onClick={editSpot}>Edit Spot</button>
      <button onClick={deleteSpot}>Delete Spot</button>
      <button onClick={reviewSpot}>Review Spot</button>
    </div>

  )
}

export default SpotById
