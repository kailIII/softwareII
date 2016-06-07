'use strict';
module.exports = function(sequelize, DataTypes) {
  var Local_Foto = sequelize.define('Local_Foto', {
      id_local_foto: {type: DataTypes.INTEGER,
		      primaryKey: true,
		      autoIncrement: true},
    ruta_foto: DataTypes.STRING
      
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
  tableName: 'Local_Foto'
  }, {
    classMethods: {
      associate: function(models) {
	  Local_Foto.belongsTo(models.Local,{
	      foreignKey: 'id_local',
	      allowNull:true
	  });
      }
    }
  });
  return Local_Foto;
};
