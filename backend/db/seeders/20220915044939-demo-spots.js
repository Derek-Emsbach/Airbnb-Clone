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
    avgRating: 3,
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
    avgRating: 5,
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
    avgRating: 5,
    previewImage: "https://coolmaterial.com/wp-content/uploads/2020/06/William-Kaven-Architecture-Royal-House-1000x600.jpg"
  },
  {
    ownerId: 1,
    address: "177 Mainstreet",
    city: "New Havewn",
    state: "Connecticut",
    country: "United States",
    lat: 39.2090,
    lng: -93.2923,
    name: "New Haven Home",
    description: "Beautiful hom enear the beach",
    price: 230.00,
    avgRating: 3,
    previewImage: "https://photos.zillowstatic.com/fp/7c46e4d20da0c60df72b02f5527eccd4-p_e.jpg"
  },
  {
    ownerId: 1,
    address: "177 Mainstreet",
    city: "Fairplay",
    state: "Colorado",
    country: "United States",
    lat: 39.2090,
    lng: -93.2923,
    name: "Nestled in the Rockies",
    description: "Beautiful hom enear the beach",
    price: 150.00,
    avgRating: 5,
    previewImage: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-27851589/original/70bad371-3654-4a62-843c-3ab4accbfab6.jpeg?im_w=1200"
  },
  {
    ownerId: 1,
    address: "12 Eagle Ln",
    city: "Superior",
    state: "Montana",
    country: "United States",
    lat: 39.2090,
    lng: -93.2923,
    name: "Big sky ranch",
    description: "Beautiful home in the middle of nowhere",
    price: 400.00,
    avgRating: 5,
    previewImage: "https://cdn.midwesthome.com/wp-content/uploads/sites/2/2020/10/mh-2020-09_LHT_Hendel-1_G-1024x681.jpg"
  },
  {
    ownerId: 1,
    address: "E 32nd St",
    city: "New York City",
    state: "New York",
    country: "United States",
    lat: 39.2090,
    lng: -93.2923,
    name: "NYC Apartment",
    description: "Beautiful home in the middle of the big apple",
    price: 400.00,
    avgRating: 5,
    previewImage: "https://wp-tid.zillowstatic.com/bedrock/app/uploads/sites/26/types-of-townhouses-in-NYC-a-row-of-brick-townhouses-f35509.jpeg"
  },
  {
    ownerId: 1,
    address: "E 32nd St",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    lat: 39.2090,
    lng: -93.2923,
    name: "LA Mansion",
    description: "Beautiful home in the middle of LA",
    price: 600.00,
    avgRating: 5,
    previewImage: "https://mlangeleno.com/get/files/image/galleries/908BelAirRoad.jpg"
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
