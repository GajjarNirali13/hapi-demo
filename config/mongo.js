const mongojs = require('mongojs');

exports.register = function (server, options, next) {

	server.app.db = mongojs('hapi-db', ['books']);
    return next();
};

exports.register.attributes = {
    name: 'mongo'
};