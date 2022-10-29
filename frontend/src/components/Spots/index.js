import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSpots } from "../../store/spots"
import './Spots.css'

const SpotsBrowser = () => {
  const dispatch = useDispatch()

  const allSpots = useSelector((state) => Object.values(state.spots))

  // console.log(allSpots)

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <div className="spots">
      <ul className="spotList">
        {allSpots.map((spot) => (
          <li key={spot.id} className="singleSpot">
            <div className="cropImg">
              <img src={spot.previewImage} className="spotImg" alt="preview"></img>
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
