var CopyBlueprint = require('./copy-blueprint');
var NpmInstall = require('./npm-install');
var CopyConfig = require('./copy-config');
var rsvp = require('rsvp');
var Promise = rsvp.Promise;

module.exports = {
  run: function(ui, options) {
    Promise.resolve()
      .then(function() {
        return new CopyBlueprint({ui: ui}).run(options);
      })
      .then(function() {
        return new NpmInstall({ui: ui}).run(options);
      })
      .then(function() {
        return new CopyConfig({ui: ui}).run(options);
      })
      .catch(function(err) {
        ui.writeError(err);
      });
  }
};
