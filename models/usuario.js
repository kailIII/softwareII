'use strict';
module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define('Usuario', {
        id_usuario: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        username: DataTypes.STRING,
        password: DataTypes.TEXT,
        rol: DataTypes.STRING
    },{
        timestamps: false,
        freezeTableName: true,
	tableName: 'Usuario'
    }, {
        classMethods: {
            associate: function(models) {
            }
        }
    });

    return Usuario;
};
