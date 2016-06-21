'use strict';
module.exports = function(sequelize, DataTypes) {
  var Habitacion = sequelize.define('Habitacion', {
      id_habitacion: {type: DataTypes.INTEGER,
		      primaryKey: true,
		      autoIncrement: true
		     },
    nombre: DataTypes.STRING,
    tipo:DataTypes.STRING,
    capacidad: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    tarifa:DataTypes.FLOAT,
      fk_local: {type: DataTypes.INTEGER,
		 references: 'Local',
		 referencesKey: 'id_local'}
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
  tableName: 'Habitacion'
  }, {
    classMethods: {
      associate: function(models) {
	  // Habitacion.belongsTo(models.Habitacion_Tipo,{
	  //     foreignKey: 'id_habitacion_tipo',
	  //     as:'id_tipo',
	  //     allowNull: true
	  // });
	  // Habitacion.belongsTo(models.Local,{
	  //     foreignKey: 'id_local',
	  //     allowNull: false
	  // });
      }
    }
  });
  return Habitacion;
};










