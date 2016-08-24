'use strict';
module.exports = function(sequelize, DataTypes) {
    var Habitacion_Tipo_Foto = sequelize.define('Habitacion_Tipo_Foto', {
        id_habitacion_tipo_foto: {type:DataTypes.INTEGER,
                                  autoIncrement:true,
                                  primaryKey:true
                                 },
        ruta_foto: DataTypes.TEXT,
	fk_habitacion_tipo:{
	    type: DataTypes.INTEGER,
	    references: 'Habitacion_Tipo',
	    referencesKey: 'id_habitacion_tipo'

	}
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
  tableName: 'Habitacion_Tipo_Foto'
    }, {
        classMethods: {
            associate: function(models) {
            Habitacion_Tipo_Foto.belongsTo(models.Habitacion_Tipo, {
		     foreignKey: 'id_habitacion_tipo',
             as: 'Fotos',
		     allowNull:true,
             constraints: false
                 });
            }
        }
    });
    return Habitacion_Tipo_Foto;
};
