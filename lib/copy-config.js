'use strict';

var rsvp = require('rsvp');
var chalk = require('chalk');
var CoreObject = require('./core-object');
var fs = require('fs');
var copy = rsvp.denodeify(require('fs-extra').copy);
var path = require('path');

module.exports = CoreObject.extend({
  run: function(options) {
    var ui = this.ui;
    var from = path.resolve(process.cwd(), 'node_modules', 'ghost', 'config.example.js');
    var to = path.join(process.cwd(), 'config.js');
    return rsvp.resolve()
      .then(function() {
        if (fs.existsSync(to)) {
          ui.writeLine('config.js already exists - not overwriting');
        }
        else {
          return copy(from, to).then(function() {
            ui.writeLine(chalk.green('Copied config.js into new blog.'));
          });
        }
      })
      .then(function() {
        ui.writeLine(chalk.blue('You will need to edit config.js to add your configuration.'));
      });
  }
});
