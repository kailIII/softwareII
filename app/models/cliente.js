'use strict';
module.exports = function(sequelize, DataTypes) {
    var Cliente = sequelize.define('Cliente', {
        id_cliente: {type: DataTypes.INTEGER,
                     primaryKey: true, autoIncrement:true},
        nombre: DataTypes.STRING,
        cedula: DataTypes.STRING,
        telefono: DataTypes.STRING,
        mail: DataTypes.STRING,
	fk_nacionalidad: {
	    type: DataTypes.INTEGER,
        references: "Nacionalidad",
        referencesKey: 'id_nacionalidad'
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
        tableName: 'Cliente'
    },{
        classMethods: {
            associate: function(models) {
                Cliente.belongsTo(models.Nacionalidad, {
                    foreignKey:'id_nacionalidad',
                    as: 'fk_nacionalidad',
                    allowNull: false
                });
            }
        }
    });

    return Cliente;
};
