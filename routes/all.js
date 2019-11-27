var express = require('express');
var router = express.Router();
const db = require('../config/database');
const log = require('../models/log');

// to get detail of past visitor
router.get('/', function(req, res, next) {

  log.findAll()
  .then(log => {
    console.log(log);
    res.send(log);
  })
  .catch(err =>console.log(err))

});



module.exports = router;
