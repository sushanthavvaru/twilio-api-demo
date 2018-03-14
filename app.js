var port = process.env.PORT || 3000;

const express = require('express');
const twilio = require('twilio')
const bodyParser = require('body-parser');

const {config} = require("./config");
var accountSid = config.accountSid; // Your Account SID from www.twilio.com/console
var authToken = config.authToken;   // Your Auth Token from www.twilio.com/console

const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var client = new twilio(accountSid, authToken);

app.post('/sms', (req, res) => {
  var messageReply;
  // Start our TwiML response.
  const twiml = new MessagingResponse();
  client.messages.list(function(err, data) {
    var msgReceived = data[0].body.toLowerCase().trim();
    var medialink = undefined;
    console.log(msgReceived);

    if(msgReceived == "hi"){
      messageReply = "Wasssup hommie!!"
    }
    else if(msgReceived == "how are you?"){
      messageReply = "I am fine. How are you?"
    }
    else if(msgReceived == "i am good"){
      messageReply = "Nice"
    }
    else if(msgReceived == "who did this?"){
      messageReply = "Sushanth developed this chat"
      medialink = 'https://media-exp2.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAA3iAAAAJDEyOTlkYTRiLTBkNjctNGY0Yy1iNWM2LWQzMDkyYzkwYWIxNA.jpg';
    }
    else if(msgReceived == "where is the cab?"){
      messageReply = "Cab is 1.1 miles away from your destination!"
      medialink = 'https://discount-car-rental-st-martin.com/img/car11.png';
    }
    else{
        messageReply = "Oops! Still under progress."
    }

    // Add a text message.
    const msg = twiml.message(messageReply);
    if(medialink){
        msg.media(medialink);
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

  });
});


app.get("/sendsms",(req, res) =>{
    client.messages.create({
      body: req.query.msg,
      to: '+16197241262',  // Text this number
      from: '+16197802027' // From a valid Twilio number
  })
  .then((message) => {console.log(message.sid);
    res.send("message sent");
  })
  .catch((e)=>{
      console.log("error",e);
      res.send("message not sent");
  });

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
