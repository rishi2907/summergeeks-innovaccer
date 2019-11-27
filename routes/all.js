var express = require('express');
var router = express.Router();
const db = require('../config/database');
const log = require('../models/log');


/* GET users listing. */
router.get('/', function(req, res, next) {

  // here comes your find command.

  log.findAll()
  .then(log => {
    console.log(log);
    res.sendStatus(200);
  })
  .catch(err =>console.log(err))

});


// router.post("/checkin", (req, res) =>
//     db.visitor.create({
//       name: req.body.name,
//       email: req.body.email,
//       host: req.body.host,
//       phone: req.body.phone,
//       checkin:req.body.checkin,
//
//     }).then( (result) => res.json(result) )
//   );

module.exports = router;
