var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1234');
var topic = '/test123';
var message = 'He1123';
client.on('connect', () => {
  setInterval(() => {
    client.publish(topic, message);
    console.log(`Message sent ${message}`);
  }, 5000);
});
