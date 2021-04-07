(function () {
  let express = require('express');
  let app = express();
  app.get('/', function (req, res) {
    res.send('Hello world! Lala Seth is here!');
  });
  let server = app.listen(3002, function () {
    console.log('Express server listening on port ' + server.address().port);
  });
  module.exports = app;
})();
