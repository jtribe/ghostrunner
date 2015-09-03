'use strict';

// Runs `npm install` in cwd

var rsvp = require('rsvp');
var chalk = require('chalk');
var CoreObject = require('./core-object');
var ncp = rsvp.denodeify(require('ncp').ncp);
var path = require('path');

module.exports = CoreObject.extend({
  run: function(options) {
    var from = path.resolve(__dirname, '..', 'blueprints', 'default');
    var to = process.cwd();
    this.ui.pleasantProgress.start(chalk.green('Copying blueprint files'), chalk.green('.'));
    return ncp(from, to, {clobber: false, stopOnErr: true})
      .then(function() {
        this.ui.pleasantProgress.stop();
        this.ui.writeLine(chalk.green('Copied blueprint files'));
      }.bind(this));
  }
});
