const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

router.get('/current', [requireAuth, restoreUser], async (req,res) => {
  const userId = req.user.id
  const reviews = await Review.findAll({
    where: {
      userId: userId
    },
    include: [
      {model: User, attributes: {exclude: ['email', 'username', 'createdAt', 'updatedAt', 'password']}},
      {model: Spot, attributes: {exclude: ['description', 'avgRating', 'previewImage', 'createdAt', 'updatedAt']}},
      {model: Image, as:'reviewImages', attributes: ['id', 'url']},
          ]
  })
  return res.json(reviews)
})

// Edit a Review
router.put('/:reviewId', [restoreUser, requireAuth], async (req,res)=>{
  const {reviewId} = req.params
  const {review, stars} = req.body
  const updateToReview = await Review.findByPk(reviewId)

  if(!updateToReview){
      res.status(404).json({
          message: "Review couldn't be found",
          statusCode: 404
      })

  }

  const updateReview = await updateToReview.update({review,stars})

  return res.json(updateReview)
})


// Create an Image for a Review
router.post('/:reviewId/images', [requireAuth, restoreUser], async (req,res) => {
  const { reviewId } = req.params
  console.log(reviewId)
  const { url, previewImage } = req.body

  const review = await Review.findByPk(reviewId)

  const reviewNumImages = await Image.findAll({where:{reviewImagesId:reviewId}})

  if(reviewNumImages.length >= 10) {
    return res.status(403).json({
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    })
  } else if(!review){
    return res.status(404).json({
      "message": "Review couldn't be found",
      "statusCode": 404

    })
  }
  const reviewImage = await review.createReviewImage({
    url,
    previewImage
  })

  res.json(reviewImage)
})

// Delete an existing review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const currentReview = await Review.findByPk(reviewId);
  if (!currentReview) {
    res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  currentReview.destroy();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//Delete a Spot
router.delete('/:id', [restoreUser, requireAuth], async (req, res) => {
  const { id } = req.params;

  const spot = await Spot.findByPk(id);
  await spot.destroy();

  res.json({
      message: "Successfully deleted",
      statusCode: 200
  });
});


module.exports = router;
