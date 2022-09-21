'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews',[
      {
        userId: 1,
        spotId: 1,
        review: "meh, it was ok..",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 2,
        review: "Beter than I could have imagined",
        stars: 5,
      },

  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews',null,{})
  }
};
