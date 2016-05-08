'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cliente: {
        type: Sequelize.INT
      },
      nombre: {
        type: Sequelize.STRING
      },
      cedula: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      id_nacionalidad: {
        type: Sequelize.INT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Clientes');
  }
};