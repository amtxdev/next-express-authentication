'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VericationTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => { console.log('expireToken event created') });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VericationTokens').then(() => {
      console.log('VerificationTokens table dropped')
      return queryInterface.Sequelize.query('DROP EVENT IF EXISTS  expireToken');
    }).then(() => {console.log('expireToken event dropped')});
  }
};