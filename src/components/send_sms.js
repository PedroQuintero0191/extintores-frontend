// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC806a434deb979a247235b65082a32eb5';
const authToken = 'f20658a7f8891e480fc1cec172e471c5';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Tu extintor Smartwares-1001 esta proximo a vencer, te invitamos a recargarlo en nuestras instalaciones.',
     from: '+17072053798',
     to: '+584241436092'
   })
  .then(message => console.log(message.sid));