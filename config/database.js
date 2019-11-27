const Sequelize = require('sequelize');
// database
module.exports = new Sequelize('tfGJn2sP7l', 'ohqMpdfFHo','LaxL0QBuj0',{
  host : 'remotemysql.com',
  dialect:'mysql',
  operatorsAliases:false,

  pool:{
    max:5,
    min:0,
    acquire:3000,
    idle:10000
  },
});
