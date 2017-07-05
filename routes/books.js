const Boom = require('boom');
const Joi = require('joi');
exports.register = function (server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/books',
        handler: function (request, reply) {

            db.books.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    server.route({
        method: 'POST',
        path: '/books',
        config:{
            validate: {
                payload: {
                    name: Joi.string().min(5).max(50).required(),
                    author: Joi.string().min(5).max(50).required()
                }
            }
        },
        handler: function (request, reply) {
            const book = request.payload;
            db.books.save(book, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(book);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-books'
};