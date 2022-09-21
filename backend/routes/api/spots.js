const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { User, Spot, Review, Booking, Image } = require('../../db/models')


router.get('/', async (req,res) => {
  const allSpots = await Spot.findAll({
    include: {
      model: Image
    }
  }
  );

  

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


  // Add an Image to a Spot based on the Spot's id
  router.post('/:spotId/images', async (req,res,next) => {
      const user = req.user
      const { spotId } = req.params
      const { url, previewImage } = req.body
      const spot = await Spot.findOne({ where: { id: spotId } })

      if(!spot) {
        const err = new Error('Spot does not exist')
        err.status = 404
        res.json({
          message: err.message,
          code: err.status
        })
      }

      const addImage = await spot.createImage({
        url,
        previewImage
      })

      // const image = await Image.findByPk(addImage.spotId, {
      //   attributes: ['id', 'url']
      // })
      res.json(addImage)

    }
  )


module.exports = router;
