var express = require('express');
var router = express.Router();
const db = require('../config/database');
const host = require('../models/host');


/* GET users listing. */
router.get('/in', function(req, res, next) {

  // here comes your find command.

  host.findAll()
  .then(host => {
    console.log(host);
    res.send(host);
  })
  .catch(err =>console.log(err))

});


router.post('/in', function (request, response) {
    host.create({
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        Time:request.body.time,
        Address : request.body.address,
  }).then((host)=> {
        if (host) {
            response.send(host);
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
