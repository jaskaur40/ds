var mongoose = require('mongoose');

USER_NAME = "jaspreet";
PASSWORD = "jaspreet";
DATABASE = "csu_distributed";
var uri = 'mongodb://' + USER_NAME + ':' + PASSWORD + '@cluster0-shard-00-00-txvpb.mongodb.net:27017,cluster0-shard-00-01-txvpb.mongodb.net:27017,cluster0-shard-00-02-txvpb.mongodb.net:27017/' + DATABASE + '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// var options = {
//     db: {native_parser: true},
//     server: {poolSize: 5},
//     user: 'rw',
//     pass: 'adminpwd'
// }

exports.createConnection = mongoose.createConnection(uri,{
  useMongoClient: true,
  /* other options */
});
