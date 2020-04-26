const accountSid = 'AC4f0233428991688e6aa22583a9284737';
const authToken = '54e5bc8f0e3e20bf501f563456713139';
const client = require('twilio')(accountSid, authToken);

console.log("activated");

client.calls.create({
         url: 'http://demo.twilio.com/docs/voice.xm',
         to: '+12269733125',
         from: '+17204774896'
        })
        .then(call => console.log(call.sid));

console.log("end");