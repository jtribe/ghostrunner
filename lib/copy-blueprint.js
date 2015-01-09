'use strict';

// Runs `npm install` in cwd

var rsvp = require('rsvp'),
    chalk = require('chalk'),
    CoreObject = require('./core-object'),
    ncp = rsvp.denodeify(require('ncp').ncp),
    path = require('path'),
    fs = require('fs');

module.exports = CoreObject.extend({
  run: function(options) {
    var from = path.resolve(__dirname, '..', 'blueprints', 'default'),
        to = process.cwd();
    if (fs.exists(to)) {
      throw new Error('ERROR: content directory already exists - not overwriting');
    }
    this.ui.pleasantProgress.start(chalk.green('Copying blueprint files'), chalk.green('.'));
    return ncp(from, to, {clobber: false, stopOnErr: true})
      .then(function() {
        this.ui.pleasantProgress.stop();
        this.ui.writeLine(chalk.green('Copied blueprint files'));
      }.bind(this));
  }
});
