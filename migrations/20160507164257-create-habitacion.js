'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Habitacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_habitacion: {
        type: Sequelize.INT
      },
      id_tipo: {
        type: Sequelize.INT
      },
      numero: {
        type: Sequelize.INT
      },
      tarifa: {
        type: Sequelize.FLOAT
      },
      id_local: {
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
    return queryInterface.dropTable('Habitacions');
  }
};