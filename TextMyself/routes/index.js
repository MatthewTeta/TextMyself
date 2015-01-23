var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var fs = require('fs');

var TWILIO_ACCOUNT_SID = 0;
var TWILIO_AUTH_TOKEN = 0;

// fs.readFile("C:\\Websites\\api-keys\\TWILIO_ACCOUNT_SID.txt", {encoding: 'utf-8'}, function(err,data){
//     if (!err){
//         TWILIO_ACCOUNT_SID = data;
//         console.log(data);
//     }else{
//         console.log(err);
//     }
// });
// fs.readFile("C:\\Websites\\api-keys\\TWILIO_AUTH_TOKEN.txt", {encoding: 'utf-8'}, function(err,data){
//     if (!err){
//         TWILIO_AUTH_TOKEN = data;
//         console.log(data);
//     }else{
//         console.log(err);
//     }
// });
var client = new twilio.RestClient(fs.readFileSync('C:\\Websites\\api-keys\\TWILIO_ACCOUNT_SID.txt') + "", fs.readFileSync('C:\\Websites\\api-keys\\TWILIO_AUTH_TOKEN.txt') + "");

router.get('/m/:phone', function(req, res) {
    console.log("\n");
    console.log(req.query.message);
    console.log("\n");
    if (req.query.message == null) {
        res.render("index", {
            phone: req.params.phone
        });
    } else {
        sendText(req.params.phone, req.query.message, req, res);
    }
});

function sendText(number, Message, req, res) {
    client.sms.messages.create({
        to: '+1' + number,
        from: '+17204087417',
        body: Message
    }, function(error, MEssage) {
        if (!error) {
            res.render("sent", {
                message: req.query.message
            });
        } else {
            res.send(error);
        }
    });
}

module.exports = router;
