import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReview, getReviews } from "../../store/review";


const DeleteReview = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {spotId} = useParams()
  const {reviewId} =useParams()
  const spot = useSelector(state=>state.spots[spotId])
  const review = useSelector(state=>state.reviews[reviewId])
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
      dispatch(getReviews(spotId));
  },[])

	const goBackClick = (e) => {
		history.push(`/spots/${spot.id}`);
	};

	if (!sessionUser || sessionUser.id !== review.userId) {
		return (
			<div>
				<div> You cannot delete a review that you do not own.</div>
				<button onClick={goBackClick}>Go Back to Review</button>
			</div>
		);
	}

	const handleDeleteClick = (e) => {
		e.preventDefault();
		dispatch(deleteReview(review.id));
		history.push(`/spots/${spot.id}`);
	};

	const handleCancelClick = (e) => {
		history.push(`/spots/${spot.id}`);
	};

	return (
		<div>
			<h1>Are you sure you want to delete this review?</h1>
			<button onClick={handleDeleteClick}>Delete</button>
			<button onClick={handleCancelClick}>Cancel</button>
		</div>
	);
};

export default DeleteReview;
