const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

router.get('/current', requireAuth, restoreUser, async(req, res)=>{
    const userId = req.user.id
   
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {model: User, attributes: {exclude: ['email', 'username', 'createdAt', 'updatedAt', 'hashedPassword']}},
            {model: Spot, attributes: {exclude: ['description', 'avgRating', 'createdAt', 'updatedAt']}},
            {model: Image, as:'ReviewImages', attributes: ['id', 'url']},
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
router.post('/:reviewId/images', requireAuth, restoreUser, async(req, res)=>{
    const userId = req.user.id
    const {reviewId} = req.params
    const {url} = req.body
    //get review of current user
    const review = await Review.findByPk(reviewId, {
        where: {
            userId: req.user.id
        }
    })

    if(!review){
    res.status(404).json({
            message: "Review couldn't be found",
	        statusCode: 404
        })
    }

    const greaterThanTenImages = await Image.findAll({
        where:{
            reviewImagesId:reviewId
        }
        })
    if(greaterThanTenImages.length >= 10 ){
            res.status(403).json({
             message: "Maximum number of images for this resource was reached",
             statusCode: 403
             })
     }
  
    const newImage = await review.createReviewImage({
            reviewId, //added reviewId to response
            url
        });

 
    const finalReview = {
        id: newImage.id,
        url: newImage.url

    }
        res.status(200),
        res.json(finalReview)

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
