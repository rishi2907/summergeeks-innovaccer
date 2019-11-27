var express = require('express');
var router = express.Router();
const db = require('../config/database');
const visitor = require('../models/visitor');

// to get all current checkin users
router.get('/checkin', function(req, res, next) {
  visitor.findAll()
  .then(visitor => {
    console.log(visitor);
    res.send(visitor);
  })
  .catch(err =>console.log(err))

});

// to post visitor details
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
});

module.exports = router;
