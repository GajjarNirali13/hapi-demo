const Inert = require ('inert');
const Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');

exports.register = function (server, options, next) {

	server.register([{
	    register: Inert
	}, {
	    register: Basic
	}], (err) => {
	    if (err) {
	        throw err;
	    }
	});

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
        	reply('Hello, world!');	
        }
    });

    server.route([
    	{
    		method: 'GET',
    		path: '/hello',
    		handler: helloHtmlFun
    	}
    ]);

    server.auth.strategy('simple', 'basic', { validateFunc: validate });

    server.route({
        method: 'GET',
        path: '/basic',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });
    return next();
};

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validate = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

function helloHtmlFun (request, reply) {
	reply.file('./public/hello.html');
}


exports.register.attributes = {
    name: 'routes-auth'
};


