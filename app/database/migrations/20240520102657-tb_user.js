'use strict';
const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_user', {
      id: {
        type: Sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      access_token: {
        type: Sequelize.STRING,
        allowNull: true
      },

      refresh_token: {
        type: Sequelize.STRING,
        allowNull: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        field: "updated_at",
        type: Sequelize.DATE,
        allowNull: false,
      },

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_user')
  }
};
