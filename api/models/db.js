var mongoose = require('mongoose');
var dbURI = require('../../credentials');

var connectedDB;

if(process.env.NODE_ENV == "production"){
  connectedDB = dbURI.mongo.production.connectionString
  mongoose.connect(connectedDB, { useNewUrlParser: true });
} else if (process.env.NODE_ENV == "development"){
  connectedDB = dbURI.mongo.development.connectionString
  mongoose.connect(connectedDB, {
    dbName: "cpldatabase",
  });
}

mongoose.set('useCreateIndex', true)

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + connectedDB );
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

require('./news');
require('./meet');
require('./media');
require('./league');
require('./membership');
require('./member');
require('./user');
require('./coordinator');
require('./record');
require('./result');
require('./registration');
require('./notification');
require('./coordinator-application');
require('./meet-request');
require('./global-notification');
require('./admin-notification')
require('./plan');
require('./lift');
require('./attempt');
require('./admin-user.model');
