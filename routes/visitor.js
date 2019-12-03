var express = require('express');
var router = express.Router();
const db = require('../config/database');
const visitor = require('../models/visitor');
const log = require('../models/log');
const nodemailer = require('nodemailer');
const sendSMS = require('../config/sendSMS');


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

  let data={
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
    hostName:request.body.hostName,
    hostEmail:request.body.hostEmail,
    checkInTime : request.body.checkInTime,
  }

    visitor.create({
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        hostName:request.body.hostName,
        checkInTime : request.body.checkInTime,
  }).then((visitor)=> {
        if (visitor) {
            response.send(visitor);


            sendSMS.sendSMS(data,(err)=>{
              if(err){
                console.log(err);
              }
            });
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

    var message = `
    <strong>Visitor Name :</strong> `+data.name+`
    <br><strong>Visitor Email :</strong> `+data.email+`
    <br><strong>Visitor Phone Number :</strong> `+data.phone+`
    <br><strong>CheckIn Time :</strong> `+data.checkInTime+`
    <br><strong>Has schedule Meeting with you .</strong>
    `;

    var mailOptions = {
      from: 'innovaccer@yahoo.com',
      to: data.hostEmail,
      subject: 'One More Visitor In Your Office',
      html: message,

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

                var transporter = nodemailer.createTransport({
                  service: 'Yahoo',
                  auth: {
                    user: 'innovaccer@yahoo.com',
                    pass: 'lkpmgahdxpmkvuyt'
                  }
                });

                var message = `<h3> Thankyou for Visit Our Office </h3>
                <strong>Visitor Name :</strong> `+visit.name+`
                <br><strong>Visitor Email :</strong> `+visit.email+`
                <br><strong>Visitor Phone Number :</strong> `+visit.phone+`
                <br><strong>Host Email Address :</strong> `+visit.hostName+`
                <br><strong>CheckIn Time :</strong> `+visit.checkInTime+`
                <br><strong>CheckOut Time :</strong> `+visit.checkOutTime+`
                <br><strong>Address Visited :</strong> `+visit.Address+`

                <br>
                <br>
                Thanks
                <br>
                Innovaccer Team
                `;

                var mailOptions = {
                  from: 'innovaccer@yahoo.com',
                  to: visit.email,
                  subject: 'Your Visit Details',
                  html: message,

                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });





            } else {
                response.status(400).send('Error in insert new record');
            }
        }))





});

module.exports = router;
