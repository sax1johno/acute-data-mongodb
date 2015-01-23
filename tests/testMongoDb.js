var architect = require('architect'),
    path = require('path'),
    thisApp,
    sutil = require('util'),
    async = require('async');
    
describe('mongodb', function() {
    before(function(done) {
        var configPath = path.join(__dirname, "testconfig.js");
        var config = architect.loadConfig(configPath);
        architect.createApp(config, function (err, arch) {
            if (err) {
                console.log("error was encountered", err);
                done(err);
            } else {
                // console.log(sutil.inspect(arch));
                thisApp = arch;
                done();
            }
        });
    });
    describe("#connect", function() {
        it("should return an error with invalid credentials", function(done) {
            var serviceObject = thisApp.getService("data-mongodb");
            serviceObject.connect({}, function(err, connection) {
                if (!err) {
                    done(false);
                } else {
                    done();
                }
            });
        });
        it("should return a valid connection with valid credentials", function(done) {
            var serviceObject = thisApp.getService("data-mongodb");
            
            serviceObject.connect({
                "host": "ds029821.mongolab.com:29821",
                "database": "test_public_junk",
                "username": "test",
                "password": "test"
            }, function(err, connection) {
                if (!err) {
                    console.log(sutil.inspect(connection));
                    done();
                } else {
                    done(err);
                }
            });
        });
    });

});
