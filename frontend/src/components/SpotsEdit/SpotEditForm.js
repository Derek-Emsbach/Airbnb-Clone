import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { editSpot, getSpots } from "../../store/spots"


const SpotEditForm = () => {
  const {spotId} = useParams()
  const spot = useSelector((state) => state.spots[spotId])
  const dispatch = useDispatch()
  const history = useHistory()
  // const sessionUser = useSelector((state) => state.session.user)

  // const [disabled, setDisabled] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      // avgRating,
      previewImage
    }

    let editedSpot = await dispatch(editSpot(spotId, payload))
    if(editedSpot) {
      history.push(`/spots/${spotId}`)
    }
  }


  // const handleEdit = async (e) => {
  //   e.preventDefault()
  //   dispatch(editSpot(spot.id))
  //   history.push('/spots')
  // }

  const handleCancel = (e) => {
    e.preventDefault()
    history.push(`/spots/${spotId}`)
  }

  return (
    <div>
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <label>Address</label>
        <input
          type="text"
          placeholder="Please enter name"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>City</label>
        <input
          type="text"
          placeholder="Please enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>State</label>
        <input
          type="text"
          placeholder="Please enter State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>Country</label>
        <input
          type="text"
          placeholder="Please enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Latitude</label>
        <input
          type="text"
          placeholder="Please enter Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <label>Longitude</label>
        <input
          type="text"
          placeholder="Please enter Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <label>Name</label>
        <input
          type="text"
          placeholder="Please enter Spot Namee"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          placeholder="Please enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          placeholder="Please enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {/* <label>Rating</label>
        <input
          type="text"
          placeholder="Please enter Image Link"
          value={avgRating}
          onChange={(e) => setAvgRating(e.target.value)}
        /> */}
        <label>Preview Image</label>
        <input
          type="text"
          placeholder="Please enter Image Link"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        <button type="submit">Edit Spot</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default SpotEditForm
