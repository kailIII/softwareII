'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Locals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_local: {
        type: Sequelize.INT
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      categoria: {
        type: Sequelize.INT
      },
      direccion: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      codigo_postal: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      ubicacion: {
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
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Locals');
  }
};