var path = require('path');
var resolve = require('resolve');

module.exports = {
  run: function(ui, options) {
    process.title = 'ghost';
    var ghostPath = resolve.sync('ghost', {
      basedir: process.cwd()
    });
    var ghost = require(ghostPath)

    var configFile = path.join(process.cwd(), 'config.js');
    ghost({config: configFile})
      .then(function(ghostServer) {
        ghostServer.start();
      });
  }
};
