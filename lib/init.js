var CopyBlueprint = require('./copy-blueprint'),
    NpmInstall = require('./npm-install'),
    CopyConfig = require('./copy-config'),
    rsvp = require('rsvp'),
    Promise = rsvp.Promise;

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
