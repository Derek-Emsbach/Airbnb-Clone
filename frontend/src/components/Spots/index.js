import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getSpots } from "../../store/spots"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import './Spots.css'
import reviewReducer from "../../store/reviews";

const SpotsBrowser = () => {
  const dispatch = useDispatch()

  const allSpots = useSelector((state) => Object.values(state.spots))


  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])



  return (
    <>
      {allSpots &&(
        <div className="spots">
          <ul className="spotList">
            {allSpots.map((spot) => (
              <li  className="singleSpot">
                <div className="cropImg">
                  <Link key={spot.id} to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} className="spotImg" alt="preview"></img>
                  </ Link>
                </div>
                <div className="desription-rating-box">
                  <div className="spot-description">{spot.city}, {spot.state}</div>
                  <div className="starRating">
                  {/* {!Number(averageRating) ? null :averageRating } */}
                    {/* <FontAwesomeIcon className="star" icon={faStar} />
                    <div>{spot.avgRating?.toFixed(2)}</div> */}
                  </div>
                </div>
                <div>${spot.price} night</div>
              </li>
            ))}
          </ul>

        </div>
      )}
    </>
  )
}

export default SpotsBrowser
