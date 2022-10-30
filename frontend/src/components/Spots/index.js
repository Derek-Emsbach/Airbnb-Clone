import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getSpots } from "../../store/spots"
// import SpotById from "../SpotsById/SpotById"
import './Spots.css'

const SpotsBrowser = () => {
  const dispatch = useDispatch()

  const allSpots = useSelector((state) => Object.values(state.spots))

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <div className="spots">
      <ul className="spotList">
        {allSpots.map((spot) => (
          <li key={spot.id} className="singleSpot">
            <div className="cropImg">
              <Link key={spot.id} to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} className="spotImg" alt="preview"></img>
              </ Link>
            </div>
            <div className="spot-description">{spot.city}, {spot.state}</div>
            <div>${spot.price} night</div>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default SpotsBrowser
