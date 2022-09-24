const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js')
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { User, Spot, Review, Booking, Image, sequelize } = require('../../db/models')


router.get('/', async (req,res) => {

  let query = {
		where: {},
	};

	const page = req.query.page === undefined ? 0 : parseInt(req.query.page);
	const size = req.query.size === undefined ? 20 : parseInt(req.query.size);

	if (page >= 1 && size >= 1) {
		query.limit = size;
		query.offset = size * (page - 1);
	}

	if (req.query.title) query.where.title = req.query.title;
	if (req.query.createdAt) query.where.createdAt = req.query.createdAt;

  const spots = await Spot.findAll(query,{
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
router.get('/current',restoreUser,requireAuth, async(req, res)=>{
    const userId = req.user.id
    //console.log(req.user)
    const spots = await Spot.findAll({
        where:{
            userId: userId
        },
        attributes:['id','ownerId','address','city','state','country','lat','lng','name','description','price','avgRating','previewImage','createdAt','updatedAt'],

        include: {model: Image, as: 'SpotImages'}
    })

    //add preview image
    let userSpots = [];
        spots.forEach((spot)=>{
        userSpots.push(spot.toJSON())
    })

    userSpots.forEach((spot)=>{
        spot.SpotImages.forEach((image)=>{
        if (image.preview === true) {
            spot.previewImage = image.url;
        }
    });
    //if no preview image
    if (!spot.previewImage) {
        spot.previewImage = "There is no preview image for the spot yet.";
        }
        delete spot.SpotImages;
    })
    return res.status(200).json(userSpots)
})

// Get details of a Spot from an id
router.get('/:spotId', async(req, res, next)=>{
    const { spotId } = req.params;
    //find spot
    const spot = await Spot.findAll({
        where: {
            id: spotId
        },

        include: [
            {model: Image, as: 'SpotImages'},
            {model: User, as: 'Owner', attributes: {exclude: ['email', 'username', 'createdAt', 'updatedAt', 'hashedPassword']} },
            {model: Review, attributes: []}
        ],
        attributes: {
            include:[
             [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
             [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
             ],
             exclude: ['avgRating']
        },
        group: ['Spot.id', 'Owner.id','SpotImages.id']
    });

    console.log(spot, "spot")
    //if spot doesn't exist
    if(!spot.length){
    res.status(404).json({
        message: "Spot couldn't be found",
    	statusCode: 404
        })
    }

    // push spot to an array as a .JSON obj
    let spotList = [];

    spot.forEach(item =>{
        spotList.push(item.toJSON()) // is an obj that we can manipulate, push to list; array of objs
    })
    //find and identify the item/spot and then iterate through the SpotImages array
        spotList.forEach(item =>{
            item.SpotImages.forEach(image =>{  // loop over Images array
                if(image.preview === true){
                    item.previewImage = image.url //set item/spot preview image to image.url if preview is true
                }
            });
            //if item/spot doesn't have a previw image, set the property
            if(!item.previewImage){
                item.previewImage ="There is no preview image for the spot yet."
            }
            //if no avgStarRating, either say so, or if there is, assign it
             if(!item.avgStarRating){
                item.avgStarRating = 0
            }

        })
            res.status(200).json(spotList)

    })





// Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const spotReviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {model: User, attributes: {exclude: ['email', 'username', 'createdAt', 'updatedAt', 'password']}},
      {model: Image, as:'reviewImages',attributes: {include: ['id', 'url']}},
          ]
  });
  const existingReview = await Review.findOne({
        where:{
            spotId: spotId,
            userId: req.user.id
        }})
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
  const { address, city, state, country, lat, lng, name, description, price, avgRating } = req.body

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
    price,
	  avgRating
  })
  const spot = await Spot.findByPk(createSpot.id, {
    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
  })

  res.json(spot)
  })


  // Add an Image to a Spot based on the Spot's id
  router.post('/:spotId/images',requireAuth, restoreUser, async(req, res)=>{
    const {url, previewImage} = req.body;
    const { spotId } = req.params;
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId,{
        where:{
            userId: req.user.id
        },
        include: {model: Image, as: 'SpotImages'} //added image model here
    })

    // //error if no spot found
       if(!spot){
        res.status(404).json({
            message: "Spot couldn't be found",
	        statusCode: 404
        })
    }
    //add image
    const newImage = await spot.createSpotImage({
        spotId,
        url,
        preview: previewImage
    })

    //create payload for desired output
    const payload = {
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    }

    return res.json(payload)

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
      return res.status(403).json({
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

      if (findSpot.ownerId === userId) {
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
