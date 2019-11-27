const Sequelize = require('sequelize');
const db = require('../config/database');

const visitor = db.define('visitor', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  hostid: {
    type: Sequelize.STRING
  },
  checkin: {
    type: Sequelize.STRING
  }
},
{ freezeTableName: true ,
   timestamps: false}
);


module.exports = visitor;
