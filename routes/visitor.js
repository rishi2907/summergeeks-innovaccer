var express = require('express');
var router = express.Router();
const db = require('../config/database');
const visitor = require('../models/visitor');


/* GET users listing. */
router.get('/checkin', function(req, res, next) {
  visitor.findAll()
  .then(visitor => {
    console.log(visitor);
    res.send(visitor);
  })
  .catch(err =>console.log(err))

});


router.post('/checkin', function (request, response) {
    visitor.create({
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        hostName:request.body.hostName,
        checkInTime : request.body.checkInTime,
  }).then((visitor)=> {
        if (visitor) {
            response.send(visitor);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });

    console.log(request.body);
    //console.log(request.body.email);
    // console.log(request.body.phone);

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
