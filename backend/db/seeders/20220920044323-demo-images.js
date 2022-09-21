'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: "image url",
        preview: true,
        reviewImagesId: 1,
        spotImagesId: 1
      },
      {
        url: "image url",
        preview: true,
        reviewImagesId: 2,
        spotImagesId: 2
      },
      {
        url: "image url",
        preview: true,
        reviewImagesId: 3,
        spotImagesId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {})
  }
};
