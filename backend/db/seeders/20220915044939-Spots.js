'use strict';

const { Spot } = require('../models/spot')

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
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
