var express = require('express');
var router = express.Router();
const db = require('../config/database');
const visitor = require('../models/visitor');
const log = require('../models/log');
const nodemailer = require('nodemailer');



const accountSid = 'ACcbafc12f24c574c4ab12ce5279556015';
const authToken = 'd3129a8c7794aaa7b02255af35785b4d';
const client = require('twilio')(accountSid, authToken);



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

    var transporter = nodemailer.createTransport({
      service: 'Yahoo',
      auth: {
        user: 'innovaccer@yahoo.com',
        pass: 'lkpmgahdxpmkvuyt'
      }
    });

    var mailOptions = {
      from: 'innovaccer@yahoo.com',
      to: 'rishimotoe3@gmail.com',
      subject: 'One More Awesome Visitor In Your Office',
      text: 'Details'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // var number = "+91" + request.body.phone;
    //   var message = client.messages.create({
    //       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //       from: '+19389999593',
    //       to: number
    //     })
    //     .then(message =>  console.log(message.status))
    //     .done();


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
