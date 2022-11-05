import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deleteSpot } from "../../store/spots"

const SpotDelete = () => {
  const dispatch = useDispatch()
  const {spotId} = useParams()
  const history = useHistory()
  const spot = useSelector((state) => state.spots[spotId])
  const sessionUser = useSelector((state) => state.session.user.id)


  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSpot(spotId))
    history.push('/spots')
  }

  const handleCancel = (e) => {
    e.preventDefault()
    history.push(`/spots/${spotId}`)
  }

  if (sessionUser !== spot.ownerId) {
    return (
      <div>
        <div> You cannot delete a spot is not yours.</div>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <h1>You are about to delete this spot!</h1>
      <p>Are you sure you want to delete? After you delete this spot there is no way to get it back.</p>

      <button type="button" onClick={handleCancel}>Cancel</button>
      <button type="submit" onClick={handleDelete}>Delete Spot</button>
    </div>
  )
}

export default SpotDelete
