'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: "Bob",
        lastName: "Barker",
        email: 'demo@user.io',
        username: 'Demo-lition',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: "Jon",
        lastName: "Stewart",
        email: 'user1@user.io',
        username: 'FakeUser1',
        password: bcrypt.hashSync('password2')
      },
      {
        firstName: "Jim",
        lastName: "Carrey",
        email: 'user2@user.io',
        username: 'FakeUser2',
        password: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
