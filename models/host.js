const Sequelize = require('sequelize');
const db = require('../config/database');
const Model=Sequelize.Model;

class Host extends Model{};

Host.init({
		name:{
			type:Sequelize.STRING,
			allowNull: false
		},
		email:{
			type:Sequelize.STRING,
			allowNull:false
		},
		phone:{
			type:Sequelize.STRING,
			allowNull:false
		},
		Time:{
			type:Sequelize.STRING,
			allowNull:false
		},
		Address:{
			type:Sequelize.STRING
		}

	},{
		sequelize:db,
    timestamps: false,
		modelName:'Host'
	})

Host.sync({force:false});
module.exports=Host;
