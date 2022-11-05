import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react";
import { getReviews, deleteReview } from "../../store/reviews";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ReviewBySpotId.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewBySpotId = ({spot}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()
  const reviews = useSelector(state =>state.reviews)
  const sessionUser = useSelector((state) => state.session.user);

  const allReviews = Object.values(reviews)

  // console.log(reviews)
  // const allReviewsArray = Object.values(reviews).filter((review)=> spotId === review.spotId);

  useEffect(() => {
    dispatch(getReviews(spotId));
	}, [dispatch]);

  const specificReview = allReviews.filter(review =>review.spotId === spot.id)


	const handleDeleteClick = (id) => {
		dispatch(deleteReview(id));
		history.push(`/spots/${spot.id}`);
	};

  return (specificReview.map(review =>{
    return <div className="review-box">
      <br></br>
            {/* <div>{review.User.firstName}</div> */}
            <div>{review.createdAt.slice(0, 10)}</div>
            <div>{review.review} </div>
            <div>
            <FontAwesomeIcon className="star" icon={faStar} />
              {review.stars}
              </div>
            {review.userId === sessionUser?.id && (
							<button onClick={() => handleDeleteClick(review.id)}>
								Delete Review
							</button>
						)}
            <br></br>
    </div>
})
  )




}


export default ReviewBySpotId
