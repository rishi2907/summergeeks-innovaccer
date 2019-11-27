var express = require('express');
var router = express.Router();
const db = require('../config/database');
const host = require('../models/host');


// to get all host details
router.get('/in', function(req, res, next) {

  host.findAll()
  .then(host => {
    console.log(host);
    res.send(host);
  })
  .catch(err =>console.log(err))

});

// POST host details
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
});

module.exports = router;
