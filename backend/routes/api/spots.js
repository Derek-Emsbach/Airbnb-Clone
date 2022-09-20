const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { User, Spot, Review, Booking, Image } = require('../../db/models')


router.get('/', async (req,res) => {
  const allSpots = await Spot.findAll();

  res.json(allSpots)
})

// Create a Spot
router.post('/', async (req,res) => {
  const user = req.user
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  const createSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  const spot = await Spot.findByPk(createSpot.id, {
    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
  })

  res.json(spot)
})

module.exports = router;
