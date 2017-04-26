const mongojs = require('hapi-mongojs');
const Boom = require('boom');

module.exports.get = {
    handler: function(request, reply) {
        const sizesCollection = mongojs.db().collection('sizes');
        sizesCollection.find((err, docs) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            reply(docs);
        });
    }
};

module.exports.post = {
    auth: 'jwt',
    handler: function(request, reply) {
        const sizes = request.payload;
        const sizesCollection = mongojs.db().collection('sizes');
        sizesCollection.drop((err, result) => {
            sizesCollection.insert(sizes, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(sizes);
            });


        });
    }
};
