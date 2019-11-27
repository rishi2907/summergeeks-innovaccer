var express = require('express');
var router = express.Router();
const db = require('../config/database');
const visitor = require('../models/visitor');
const log = require('../models/log');

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



router.post('/checkout', function (request, response) {

    var id = request.body.id;
    var checkOutTim = request.body.checkOutTime;

    visitor.findByPk(id)
        .then((visit) => log.create({
            name: visit.name,
            phone: visit.phone,
            email: visit.email,
            hostName:visit.hostName,
            checkInTime : visit.checkInTime,
            checkOutTime : checkOutTim,
            Address: "Innovaccer Office"

      }).then((visit)=> {
            if (visit) {
                visitor.destroy({
                    where: {
                        id: id //this will be your id that you want to delete
                        }
                        }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
                          if(rowDeleted === 1){
                            console.log('Deleted successfully');
                          }
                        }, function(err){
                          console.log(err);
                        });
                response.send(visit);
            } else {
                response.status(400).send('Error in insert new record');
            }
        }))
});

module.exports = router;
