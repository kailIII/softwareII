'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tarjeta = sequelize.define('Tarjeta', {
        id_tarjeta: {type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true},
        numero: DataTypes.STRING,
        banco: DataTypes.STRING,
	fk_cliente:{
	    type: DataTypes.INTEGER,
	    references: 'Cliente',
	    referencesKey: 'id_cliente'
	}
    },{
        timestamps : false,
	paranoid: true,
	underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                // Tarjeta.belongsTo(models.Cliente, {
                //   foreignKey: 'id_cliente',
                //   as: 'fk_cliente',
                //   allowNull:false
                // });
            }
        }
    });
    return Tarjeta;
};
