var config   = require('./environments');
var fs       = require('fs');
var mongoose = require('mongoose');
var mongo    = {
	dbHost:config.mongo.dbHost,
	dbName:config.mongo.dbName,
	dbUser:config.mongo.dbUser,
	dbPassword:config.mongo.dbPassword
};

//global.mongoose =mongoose;
var mongodbUri = require('mongodb-uri');
var options    = {
	db:{native_parser:true, numberOfRetries:100, retryMiliSeconds:60000},
	server:{auto_reconnect:true, poolSize:10, socketOptions:{keepAlive:1}},
	debug:true
};
if(mongo.replset !== undefined){
	options.replset = {
		rs_name:mongo.replset,
		safe:true
	};
}
var uri = mongodbUri.format(
	{
		username:mongo.dbUser,
		password:mongo.dbPassword,
		hosts:mongo.dbHost,
		database:mongo.dbName,
		options:{}
	}
);
mongoose.connect(uri, options);
mongoose.set('debug', config.mongo.debug);
global.MongoORM = {};
// fs.readdirSync(ROOT_PATH + '/models').filter(function(file){
// 	var stats = fs.statSync(ROOT_PATH + '/models/' + file);
// 	return (file.indexOf('.') !== 0 && !stats.isDirectory());
// }).forEach(function(file){
// 	require(ROOT_PATH + '/models/' + file);
// });