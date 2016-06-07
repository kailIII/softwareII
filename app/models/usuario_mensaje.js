'use strict';
module.exports = function(sequelize, DataTypes) {
  var Usuario_Mensaje = sequelize.define('Usuario_Mensaje', {
      id_usuario_emisor: {type: DataTypes.INTEGER,
			  references:'Cliente',
			  referencesKey: 'id_cliente'},
      
      id_usuario_receptor: {type: DataTypes.INTEGER,
			  references:'Cliente',
			  referencesKey: 'id_cliente'},
      id_mensaje: {type: DataTypes.INTEGER,
			  references:'Mensaje',
			  referencesKey: 'id_mensaje'}
	  
      
  },{
              timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  paranoid: true,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: 'Usuario_Mensaje'
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Usuario_Mensaje;
};
