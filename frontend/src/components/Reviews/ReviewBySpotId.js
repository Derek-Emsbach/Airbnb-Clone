import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react";
import { getReviews, deleteReview } from "../../store/reviews";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ReviewBySpotId = ({spot}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const reviews = useSelector(state =>state.reviews)
  console.log(reviews,'reviewws')

  const allReviews = Object.values(reviews)
  console.log(allReviews,'allReviews')
  // console.log(reviews)
  // const allReviewsArray = Object.values(reviews).filter((review)=> spotId === review.spotId);

  useEffect(() => {
    dispatch(getReviews(spotId));
	}, [dispatch]);

  const specificReview = allReviews.filter(review =>review.spotId === spot.id)

return (
  null
  )
}

export default ReviewBySpotId
