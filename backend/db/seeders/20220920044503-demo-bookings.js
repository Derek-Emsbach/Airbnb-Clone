'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate:"2022-04-20",
        endDate:"2022-04-21"
      },
      {
        spotId: 2,
        userId: 3,
        startDate:"2022-07-22",
        endDate:"2022-07-25"
      },
      {
        spotId: 3,
        userId: 1,
        startDate:"2022-08-04",
        endDate:"2022-08-06"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
