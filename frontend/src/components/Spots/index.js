import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSpots } from "../../store/spots"

const SpotsBrowser = () => {
  const dispatch = useDispatch()

  const spots = useSelector((state) => Object.values(state.spots))

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <div>
      <ul>
        {spots.map((spot) => {
          <li key={spot.id}>
            <div>
              <div>{spot.name}</div>
            </div>
          </li>
        })}
      </ul>
    </div>
  )
}

export default SpotsBrowser
