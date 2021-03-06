const Sequelize = require('sequelize');
const db = require('../config/database');
const Model=Sequelize.Model;

class Visitor extends Model{};

Visitor.init({
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
		checkInTime:{
			type:Sequelize.STRING,
			allowNull:false
		},
    hostName:{
      type:Sequelize.STRING,
      	allowNull:false
    }

	},{
		sequelize:db,
    timestamps: false,
		modelName:'Visitor'
	})


Visitor.sync({force:false});
module.exports=Visitor;
