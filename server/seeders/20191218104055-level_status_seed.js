'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('level_status', [
      { detail: 'Super Admin' },
      { detail: 'Admin' },
      { detail: 'User' },

      { createdAt: new Date() },
      { createdAt: new Date() },
      { createdAt: new Date() },

      { updatedAt: new Date() },
      { updatedAt: new Date() },
      { updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};