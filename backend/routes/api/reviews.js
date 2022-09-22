const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

// Create an Image for a Review
router.post('/:reviewId/images', [requireAuth, restoreUser], async (req,res) => {
  const user = req.user;
  const { reviewId } = req.params
  const { url } = req.body

  // const userReview = await Review.findByPk(reviewId, {
  //   where: {
  //     userId: userId
  //   }
  // })
  const review = await Review.findOne( { where: { id: reviewId } })

  const reviewNumImages = await review.getImages()

  if(reviewNumImages.length >= 10) {
    res.status(403).json({
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    })
  } else {
    res.status(404).json({
      "message": "Review couldn't be found",
      "statusCode": 404

    })
  }
  const reviewImage = await review.createImage({
    userId: user.id,
    url

  })
  res.json(reviewImage)
})




module.exports = router;
