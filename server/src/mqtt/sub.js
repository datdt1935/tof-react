// MQTT subcriber

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1234');
var topic = '/test123';
client.on('message', (topic, message) => {
  message = message.toString();
  console.log('🚀 ~ file: sub.js ~ line 8 ~ client.on ~ message', message);
});

client.on('connect', () => {
  client.subscribe(topic);
});
