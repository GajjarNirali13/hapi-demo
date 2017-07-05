const Hapi = require ('hapi');


const server = new Hapi.Server();
server.connection({port: 3000, host: 'localhost'});



server.register([
	require('./config/mongo'),
	require('./routes/auth'), 
	require('./routes/books')
], (err) => {
    if (err) {
        throw err;
    }
});


server.start((err)=> {
	if (err) {
		throw err;
	}
	console.log('server running at: '+ server.info.uri);
});