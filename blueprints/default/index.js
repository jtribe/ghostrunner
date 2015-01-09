var ghost = require('ghost');
var path = require('path');
var configFile = path.join(__dirname, 'config.js');

ghost({config: configFile})
  .then(function(ghostServer) {
    ghostServer.start();
  });
