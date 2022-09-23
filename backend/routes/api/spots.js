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
    ],
    group: ['Spot.id', 'Owner.id','SpotImages.id']
  });
  if(!isValid){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json(findSpotId)
})

// Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const spotReviews = await Review.findAll({ where: { spotId } });
  const findReview = await Review.findOne({ where: { spotId } });
  if (!findReview) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  res.json({ spotReviews });
});

// Get booking of spot by id
router.get('/:id/bookings', [restoreUser, requireAuth], async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  const spot = await Spot.findByPk(id);
  console.log(spot)

  if (!spot) {
      const err = new Error("Spot not found");
      err.message = "Spot couldn't be found";
      err.status = 404;
      return next(err)
  }

  if (spot.ownerId === user.id) {
      const bookings = await spot.getBooking({
          include: [{
              model: User,
              attributes: { exclude: ['email', 'password', 'username', 'createdAt', 'updatedAt'] }
          }],
      });

      res.json({
          Bookings: bookings
      });
  } else {
      const bookings = await spot.getBooking({
          attributes: ['spotId', 'startDate', 'endDate']
      });

      res.json({
          Bookings: bookings
      });
  }
});



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

      const addImage = await spot.createSpotImage({
        url,
        previewImage
      })

      res.json(addImage)

    }
  )

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

  // Create a Review for a Spot
  router.post('/:spotId/reviews', requireAuth, async (req,res) => {
    const { spotId } = req.params
    const userId = req.user.id
    const { review, stars } = req.body

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
      res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
    }

    const hasReview = await Review.findOne({
      where: {
        userId: userId,
        spotId: spotId
       },
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


    // Create a Booking Based on a Spot Id
    router.post("/:spotId/bookings", requireAuth, async (req, res) => {
      const { spotId } = req.params;
      const { startDate, endDate } = req.body;
      const userId = req.user.id;
      const findSpot = await Spot.findByPk(spotId);

      if (!findSpot) {
        res.status(404).json({
          message: "Spot couldn't be found",
          statusCode: 404,
        });
      }

      if (findSpot.userId === userId) {
        res.status(401).json({
          message: "Unauthorized, this is your spot",
          statusCode: 401,
        });
      }

      let dateRanges = [
        new Date(startDate).getTime(),
        new Date(endDate).getTime(),
      ];

      const booking = await Booking.findAll({where:{spotId}});


      booking.forEach((booking) => {

        if (
          (booking.startDate.getTime() <= dateRanges[0] &&
            booking.endDate.getTime() >= dateRanges[0]) ||
          (booking.startDate.getTime() <= dateRanges[1] &&
            booking.endDate.getTime() >= dateRanges[1]) ||
            (booking.startDate.getTime() >= dateRanges[0] &&
            booking.endDate.getTime() <= dateRanges[1])
        ) {

          res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking",
            },
          });
        }
      });
      const alreadyBooked = await findSpot.createBooking({ userId, startDate, endDate });
      res.json(alreadyBooked);
    });


  // Delete a spot
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
