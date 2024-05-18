'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('tb_cart', {
        id: {
          type: Sequelize.UUID,
          defaultValue: sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },

        id_product: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'tb_product',
            key: 'id'
          },
          onUpdate: 'RESTRICT',
          onDelete: 'RESTRICT'
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_cart')
  }
};
