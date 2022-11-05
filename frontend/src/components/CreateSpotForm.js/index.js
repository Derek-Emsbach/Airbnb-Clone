import { createSpot } from "../../store/spots"
import './CreateSpotForm.css'

const { useState } = require("react")
const { useDispatch } = require("react-redux")
const { useHistory } = require("react-router-dom")



const CreateSpotForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()


  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [avgRating, setAvgRating] = useState('')
  const [previewImage, setPreviewImage] = useState('')


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
      avgRating: "new",
      previewImage
    }

    let createdSpot = await dispatch(createSpot(payload))
    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();

    history.push(`/spots`)
  };

  return (
    <div>
      <form className="create-spot-form" onSubmit={handleSubmit}>
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
        <button type="submit">Create new Spot</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  )
}

export default CreateSpotForm
