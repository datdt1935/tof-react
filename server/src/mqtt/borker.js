// import mosca from 'mosca';
const mosca = require('mosca');

var setting = { port: 1234 };
var broker = new mosca.Server(setting);

broker.on('ready', () => {
  console.log('Broker is ready !');
});
