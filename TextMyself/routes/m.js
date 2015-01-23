var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var fs = require('fs');

var client = new twilio.RestClient(fs.readFileSync('C:\\Websites\\api-keys\\TWILIO_ACCOUNT_SID.txt') + "", fs.readFileSync('C:\\Websites\\api-keys\\TWILIO_AUTH_TOKEN.txt') + "");

router.get('/m/:phone', function(req, res) {
    if (req.query.message == null) {
        res.render("m", {
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
