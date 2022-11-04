import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react";
import { getReviews, deleteReview } from "../../store/reviews";


const ReviewBySpotId = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const spot = useSelector((state) => state.spots[spotId])
  const allSpotReviews = useSelector((state)=> Object.values(state.reviews))
  const specificReviews = allSpotReviews.filter((review)=> review.spotId === spot.id)
  console.log(spot, 'id')
  console.log(specificReviews, 'reviews')
  // console.log(reviews)
  // const allReviewsArray = Object.values(reviews).filter((review)=> spotId === review.spotId);

  useEffect(() => {
    dispatch(getReviews(spotId));
	}, [dispatch, spotId]);

  return (
    <div>
      <div>
        <h1>Reviews</h1>
        {/* {allReviewsArray.map((review) => (
          <div className="review-id" key={review.id}>
            <div className="review-details">
              <div>{review.review}</div>
              <div>{review.stars}</div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default ReviewBySpotId
