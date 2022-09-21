const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { User, Spot, Review, Booking, Image, sequelize } = require('../../db/models')


router.get('/', async (req,res) => {
  const spots = await Spot.findAll({
    // include: {
    //   model: Image
    // }
  }
  );

  const spotsWithPreview = []

  spots.forEach(spot => {
    spotsWithPreview.push(spot.toJSON())

  })

  spotsWithPreview.forEach(spot => {
    if(Image.previewImage === true) {
      spot.previewImage = image.url
    }
  })

  console.log(spotsWithPreview)

  res.json(spotsWithPreview)
})


// Get all Spots owned by the Current User
router.get('/current', [restoreUser, requireAuth], async (req, res) => {

  const user = req.user

  const userSpots = await Spot.findAll({
    where: { ownerId: user.id }
  })

  res.json({
    Spots: userSpots
  })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params
  const isValid = await Spot.findByPk(spotId)
  const findSpotId = await Spot.findByPk(spotId,{
    attributes: {
      include:[
        [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
      ]
    },
    include: [
      {model: Image, as: 'SpotImages', attributes: {exclude: ['spotImagesId', 'reviewImagesId', 'createdAt', 'updatedAt']}},
      {model: User, as: 'Owner', attributes: {exclude: ['email', 'username', 'createdAt', 'updatedAt', 'password']} },
      {model: Review, attributes: {exclude: ['id', 'review', 'stars', 'userId', 'spotId', 'createdAt', 'updatedAt']}}
    ]
  });
  if(!isValid){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json(findSpotId)
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
  router.post('/:spotId/images', requireAuth, async (req,res,next) => {
      const { spotId } = req.params
      const { url, previewImage } = req.body
      const spot = await Spot.findOne({ where: { id: spotId } })

      if(!spot) {
        const err = new Error('Spot does not exist')
        err.status = 404
        res.status(404)
        res.json({
          message: err.message,
          statusCode: err.status
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

  // Create a Review for a Spot
  router.post('/:spotId/reviews', requireAuth, async (req,res) => {
    const { spotId } = req.params
    const userId = req.user.id
    const { review, stars } = req.body

    const spot = await Spot.findByPk(spotId)

    //  Error response with status 404 is given when a spot does not exist with
    //  the provided id
    if(!spot) {
      res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
    }

    // Error response with status 403 is given when a review already exists for
    // the spot from the current user
    const hasReview = await Review.findByPk(spotId,{
      where: { userId: userId },
    });

    if(hasReview) {
      res.status(403).json({
        "message": "User already has a review for this spot",
        "statusCode": 403
      })
    }

    const newReview = await spot.createReview({
      spotId,
      userId,
      review,
      stars
    });

    res.status(201)
    res.json(newReview)
    })



  // Edit a Spot
  router.put('/:spotId', [requireAuth, restoreUser], async (req,res,next) => {

    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findOne({ where: { id: spotId } })

    if(!spot) {
      res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
    }

    const updateSpot = await spot.update({
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    })

    res.json(updateSpot)
  })

  router.delete('/:spotId', [restoreUser, requireAuth], async (req, res) => {
    const { spotId } = req.params
    const userId = req.user.id

    const spotToDelete = await Spot.findByPk(spotId, {
      where: {
        ownerId: userId
      }
    })

    if(!spotToDelete) {
      res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
    }

    await spotToDelete.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
  });
  })


module.exports = router;
