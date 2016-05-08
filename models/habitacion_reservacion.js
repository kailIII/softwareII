'use strict';
module.exports = function(sequelize, DataTypes) {
    var Habitacion_Reservacion = sequelize.define('Habitacion_Reservacion', {
        fecha_inicio: DataTypes.DATE
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
  tableName: 'Habitacion_Reservacion'
    }, {
        classMethods: {
            associate: function(models) {
                Habitacion_Reservacion.belongsTo(models.Habitacion,{
                    foreignKey: 'id_habitacion',
                    as:'id_hab',
                    allowNull: false
                });
		                Habitacion_Reservacion.belongsTo(models.Reservacion,{
				    foreignKey: 'id_cliente',
                    allowNull: false
                });
            }
        }
    });
    return Habitacion_Reservacion;
};
