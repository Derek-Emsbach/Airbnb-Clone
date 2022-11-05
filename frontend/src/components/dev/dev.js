import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react";
import { getReviews, deleteReview } from "../../store/reviews";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Dev = ({spot}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const reviews = useSelector(state =>state.reviews)
  console.log(reviews, 'reviews')
  // const allSpotReviews = useSelector((state)=> Object.values(state.reviews.spotReviews))
  // console.log(allSpotReviews, 'allSpotReviews')
  // const specificReviews = allSpotReviews.filter((review)=> review.spotId === spot.id)
  // console.log(specificReviews, 'reviews')


  useEffect(() => {
    dispatch(getReviews(spotId));
	}, [dispatch]);

  // const specificReview = allReviews.filter(review =>review.spotId === spot.id)

return (
  <div>
    <h1>Test</h1>
  </div>
  )
}

export default Dev
