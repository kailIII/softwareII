'use strict';
module.exports = function(sequelize, DataTypes) {
    var Reservacion = sequelize.define('Reservacion', {
	id_reservacion:{type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement:true},
      id_cliente: {type: DataTypes.INTEGER,
		   references: 'Cliente',
		   referencesKey: 'id_cliente'},
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE
  },{
              timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: 'Reservacion'
  }, {
    classMethods: {
      associate: function(models) {
	  // Reservacion.belongsTo(models.Cliente,{
	  //     foreignKey: 'id_cliente',
	  //     allowNull: false
	  // });
      }
    }
  });
  return Reservacion;
};
