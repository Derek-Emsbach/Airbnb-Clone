const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, Booking, Image, sequelize, } = require('../../db/models');
const { Op } = require("sequelize");


const router = express.Router();

// Get current booking
router.get("/current", requireAuth, async (req, res) => {
  const user = req.user;
  const bookings = await Booking.findAll({
    include: {
      model: Spot,
      attributes: ['id','ownerId','address','city','state','country','lat','lng','name','price','previewImage']
    },
     where: { userId: user.id }
  },

    );


  res.json({bookings});
});

// Edit a booking
router.put('/:bookingId', requireAuth, async (req,res)=>{
  const {user} = req
  const {startDate,endDate} = req.body
const {bookingId} = req.params
  const existingBooking = await Booking.findOne({where:{id:bookingId, userId:user.id},})
  if (!existingBooking){
    res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }
  const updateBooking = await existingBooking.update({startDate,endDate})


  if(endDate<= startDate){
    res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate"
    }
  })

  }
  res.json(updateBooking)
})

// Delete an existing booking
router.delete('/:bookingId',requireAuth, async (req,res)=>{
  const {user} = req
  const {bookingId} = req.params
    const existingBooking = await Booking.findOne({where:{id:bookingId, userId:user.id},})
    if (!existingBooking){
      res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404
      })
    }

    await existingBooking.destroy()

    return res.json({
      message: "Successfully deleted",
      statusCode: 200
    })

})

module.exports = router;
