import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"



const reviewForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()

  const userId = useSelector((state) => state.session.user.id)
  const reviews = useSelector((state) => state.reviews)

  const [stars, setStars] = useState("")
  const [review, setReview] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      userId,
      spotId,
      review,
      stars
    }

    let newReview = await dispatch()
  }

  return (

  )
}
