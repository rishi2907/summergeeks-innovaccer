
const Nexmo = require('nexmo');

module.exports.sendSMS = function(data,callback){
  console.log(data.phoneNumber);
  var error;

      const nexmo = new Nexmo({
        apiKey: "302b6cbb",
        apiSecret: "o9FsSxNeJsV5WPiO",
      }, {debug:true});


      const from = data.name;
      const to = '918958788400';
      var text = `
      New Visitor In Your Office
      Visitor Name : `+data.name+`
      Email : `+data.email+`
      Phone Number : `+data.phone+`
      CheckIn Time : `+data.checkInTime+`
      `;

      nexmo.message.sendSms('918958788400', to, text,{type:'unicode'},(err,re)=>{
        if(err){
          console.log(err);
          error = err;
        }else{
          console.log(re);
        }
      });
  callback(error);
}
