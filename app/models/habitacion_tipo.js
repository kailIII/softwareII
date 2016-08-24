'use strict';
module.exports = function(sequelize, DataTypes) {
    var Habitacion_Tipo = sequelize.define('Habitacion_Tipo',{
      id_habitacion_tipo: {type:DataTypes.INTEGER,
			   primaryKey:true,
			   autoIncrement:true
			  },
    tipo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    ruta_foto: DataTypes.TEXT
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
  tableName: 'Habitacion_Tipo'
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Habitacion_Tipo.hasMany(models.Habitacion_Tipo_Foto, {as: 'Fotos'});
      }
    }
  });
  return Habitacion_Tipo;
};
