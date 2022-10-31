import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deleteSpot } from "../../store/spots"

const SpotDelete = () => {
  const {spotId} = useParams()
  const sessionUser = useSelector((state) => state.session.user)
  const spot = useSelector((state) => state.spots[spotId])
  const dispatch = useDispatch()
  const history = useHistory()

  
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSpot(spot.id))
    history.push('/spots')
  }

  const handleCancel = (e) => {
    history.push(`/spots/${spotId}`)
  }

  return (
    <div>
      <h1>You are about to delete this spot!</h1>
      <p>Are you sure you want to delete? After you delete this spot there is no way to get it back.</p>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleDelete}>Delete Spot</button>
    </div>
  )
}

export default SpotDelete
