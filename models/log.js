const Sequelize=require('sequelize');
const db=require('../config/database');

const Model=Sequelize.Model;

class Log extends Model{};

Log.init({
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
		checkOutTime:{
			type:Sequelize.STRING,
      	allowNull:false
		},
    hostName:{
			type:Sequelize.STRING,
			allowNull: false
		},
    Address:{
			type:Sequelize.STRING,
      allowNull : false
		}
	},{
		sequelize:db,
    timestamps: false,
		modelName:'Log'
	})



Log.sync({force:false});
module.exports=Log;
