'use strict';

const spots = [
  {
    hostId: 1,
    address: "123 Fake St",
    city: "Springfield",
    state: "Missouri",
    country: "United States",
    lat: 37.2090,
    lng: -93.2923,
    name: "Simpson House",
    description: "Create your own iconic couch scene",
    price: 150.00,
    previewImage: "https://upload.wikimedia.org/wikipedia/en/c/ca/742_Evergreen_Terrace.png"
  },
  {
    hostId: 2,
    address: "4657 Raven Ave",
    city: "Durango",
    state: "Colorado",
    country: "United States",
    lat: 37.2753,
    lng: -107.8801,
    name: "Cozy Home",
    description: "Nestled in the Rockies",
    price: 200.00,
    previewImage: "https://upload.wikimedia.org/wikipedia/commons/5/51/Durango_Colorado_from_Rim_Drive.jpg"
  },
  {
    hostId: 3,
    address: "977 Bear Ct",
    city: "Buffalo",
    state: "New York",
    country: "United States",
    lat: 42.8864,
    lng: -78.8784,
    name: "Wing House",
    description: "Big kitchen to make wings for gameday!",
    price: 215.00,
    previewImage: "https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2016-10/HERO%201_GettyImages-182773106_Cropped_Web72DPI.jpg?itok=wEITQRS2"
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert("Spots", spots, {})
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Spots", null, {})
  }
};
