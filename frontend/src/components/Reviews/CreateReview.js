import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { addReview } from '../../store/reviews'


const ReviewForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()

  // const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser)
  // const userId = useSelector((state) => state.session.user.id)
  // console.log(userId)

  const [stars, setStars] = useState(0)
  const [review, setReview] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      // userId,
      spotId,
      review,
      stars
    }

    let newReview = await dispatch(addReview(spotId, data))

    if(newReview) {
      history.push(`/spots/${spotId}`)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();

    history.push(`/spots/${spotId}`)
  };

  return (
    <div>
      <form className="create-review-form" onSubmit={handleSubmit}>
        <h1>Write a Review</h1>
        <label>Describe your experience</label>
        <input
          type="textarea"
          placeholder="write about your experience here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          />
        <label>Rate your experience</label>
        <input
          type="number"
          placeholder="enter rating..."
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          />
        <button type="submit">Create Review</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  )
}

export default ReviewForm
