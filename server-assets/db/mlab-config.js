var mongoose = require('mongoose');
var connectionString = 'mongodb://test:test@ds062448.mlab.com:62448/test-db';
var connection = mongoose.connection;

mongoose.connect(connectionString);

connection.on('error', err => {
  console.log("mlab Error: ", err);
});

connection.once('open', ()=>{
  console.log("mlab connection established!");
});