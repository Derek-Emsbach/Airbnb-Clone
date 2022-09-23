const express = require("express");
const router = express.Router();
const { Spot, Booking, Image, Review, User, sequelize } = require("../../db/models")
const { requireAuth, restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");


// Delete a Review Image
router.delete('/:reviewImageId', [requireAuth, restoreUser], async(req, res)=>{
  const userId = req.user.id;
  const {reviewImageId} = req.params;
  const image = await Image.findByPk(reviewImageId);

  if(!image){
      res.status(404).json({
          message: "Review Image couldn't be found",
        statusCode: 404
      })
  }

//   const review = await Review.findOne({
//       where:{
//               id: reviewImageId
//       }})

// if (review.userId !== req.user.id) {
//   res.statusCode = 403;
//   return res.json({
//     message: "Forbidden",
//     statusCode: res.statusCode,
//   });
// }

await image.destroy();
res.json({
  message: "Successfully deleted",
  statusCode: 200,
});
});


module.exports = router;
