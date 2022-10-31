import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getSpots } from "../../store/spots"


const SpotEditForm = () => {
  const {spotId} = useParams()
  const sessionUser = useSelector((state) => state.session.user)
  const spot = useSelector((state) => state.spots[spotId])
  const dispatch = useDispatch()
  const history = useHistory()

  const [disabled, setDisabled] = useState(false)
  const [address, setAddress] = useState(spot.address)
  const [city, setCity] = useState(spot.city)
  const [state, setState] = useState(spot.state)
  const [country, setCountry] = useState(spot.country)
  const [lat, setLat] = useState(spot.lat)
  const [lng, setLng] = useState(spot.lng)
  const [name, setName] = useState(spot.name)
  const [description, setDescription] = useState(spot.description)
  const [price, setPrice] = useState(spot.price)
  const [previewImage, setPreviewImage] = useState(spot.previewImage)

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  return (
    <div>
      <h1>Edit Spot Form</h1>
      <form>
        
      </form>
    </div>
  )
}

export default SpotEditForm
