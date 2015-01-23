/**
 * Reads and stores information about different database configurations based on the current
 * environment.  Gets the environment from the app.settings.env variable, which itself reads
 * the NODE_ENV environment variable and defaults to "development" if none is present.
 * 
 * The "data" plugins themselves are not tied to any single platform, but instead
 * provide an interface for implementing other data connectors.
 **/

/**
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
module.exports = function setup(options, imports, register) {
  var async = require('async');
  
  var disconnect = function(fn) {
    var mongoose = require('mongoose');
    mongoose.disconnect(fn);
  }
  
  var connect = function(config, fn) {
    var mongoose = require('mongoose');
    var connectionString = "mongodb://";
    if (config.host && config.database) {
        if (config.username && config.password) {
            connectionString += config.username + ":" + config.password + "@";
        }
        connectionString += config.host + "/" + config.database;
        try {
          var connection = mongoose.connect(connectionString);
          fn(null, connection);
        } catch (e) {
          fn(e);
        }
    } else {
        fn("Unable to get database connection");      
    }
  };
  /**
   * This searches through the current environment configurations and uses the
   * config info for data from there only.
   * Providers can be added by installing the "acute-data-*" npm package, where
   * "*" is the name of the provider.
   **/
    register(null, {
      'data-mongodb': {
        connect: connect,
        disconnect: disconnect
      }
    });
};