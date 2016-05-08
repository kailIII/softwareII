'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tarjeta = sequelize.define('Tarjeta', {
    id_tarjeta: {type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true},
    numero: DataTypes.STRING,
    banco: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tarjeta.belongsTo(models.Cliente, {
          foreignKey: 'id_cliente',
          as: 'fk_cliente',
          allowNull:false
        });
      }
    }
  });
  return Tarjeta;
};
