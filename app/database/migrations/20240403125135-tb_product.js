'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_product', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },

      id_type_product: {
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: 'tb_type_product', 
          key: 'id' 
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },

      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      stok: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      product_image: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('tb_product')
  }
};
