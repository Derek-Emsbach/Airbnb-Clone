'use strict';

const spots = [
  {
    ownerId: 1,
    address: "123 Fake St",
    city: "New Orleans",
    state: "Louisiana",
    country: "United States",
    lat: 37.2090,
    lng: -93.2923,
    name: "Jazz House",
    description: "Stay near the French Quarter.",
    price: 230.00,
    previewImage: "https://gonola.com/images/2018/11/Bywater_PaulBroussard-500x334.jpg"
  },
  {
    ownerId: 2,
    address: "722 Steiner St",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.2753,
    lng: -107.8801,
    name: "Victorian Stacked House",
    description: "Nestled in SF.",
    price: 400.00,
    previewImage: "https://assets.rbl.ms/29516544/origin.jpg"
  },
  {
    ownerId: 3,
    address: "977 Bear Ave",
    city: "Bangor",
    state: "Maine",
    country: "United States",
    lat: 42.8864,
    lng: -78.8784,
    name: "Cozy Forest House",
    description: "Live amongst the wild.",
    price: 215.00,
    previewImage: "https://coolmaterial.com/wp-content/uploads/2020/06/William-Kaven-Architecture-Royal-House-1000x600.jpg"
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
