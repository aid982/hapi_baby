const mongojs = require('hapi-mongojs');
const Boom = require('boom');

module.exports.get = {
    handler: function (request, reply) {
        const categoriesCollection = mongojs.db().collection('categories');
        categoriesCollection.find((err, docs) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            reply(docs);
        });
    }
};

module.exports.post = {
    auth: 'jwt',
    handler: function (request, reply) {
        const categories = request.payload;
        const categoriesCollection = mongojs.db().collection('categories');
        categoriesCollection.drop((err, result) => {
            categoriesCollection.insert(categories, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(categories);
            });


        });
    }
};
