var express = require('express');
var router = express.Router();
const db = require('../config/database');
const visitor = require('../models/visitor');


/* GET users listing. */
router.get('/checkin', function(req, res, next) {

  // here comes your find command.

  visitor.findAll()
  .then(visitor => {
    console.log(visitor);
    res.send(visitor);
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
