import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSpotById } from '../../store/spots';

const SpotById = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const history = useHistory()
  const spot = useSelector((state) => state.spots[spotId])
  // const sessionUser = useSelector((state) => state.sessionUser.user)
  useEffect(() => {
    dispatch(getSpotById(spotId));
  }, [dispatch, spotId]);
  console.log(spotId)
  console.log(spot)

  const editSpot = () => {
		let path = `/spots/${spotId}/edit`;
		history.push(path)

	};

  const deleteSpot = () => {
    let path = `/spots/${spotId}/delete`;
    history.push(path);
  };

  return (
    <div>
      <div>Hello</div>
      <h1>{spot.name}</h1>
      <div>{spot.city}, {spot.state}, {spot.country}</div>
      <div>
        <img src={spot.previewImage} className="singleSpotImg" alt="spot-preview"></img>
      </div>
      <div>{spot.description}</div>
      <div>${spot.price}</div>
      {/* <button onClick={editSpot}>Edit Spot</button> */}
      <button onClick={deleteSpot}>Delete Spot</button>
    </div>

  )
}

export default SpotById
