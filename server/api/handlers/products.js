const mongojs = require('hapi-mongojs');
const Boom = require('boom');

module.exports.get = {
    handler: function(request, reply) {        
        const productsCollection = mongojs.db().collection('products');
        productsCollection.find((err, docs) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
        });         
    }
};

module.exports.getById = {
    handler: function(request, reply) {
        const productsCollection = mongojs.db().collection('products');
        productsCollection.findOne({'_id':request.params.id},(err, docs) => {
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
            const products = request.payload;
            const productsCollection = mongojs.db().collection('products');
            productsCollection.drop((err, result) => {                
                 productsCollection.insert(products, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(products);
                 });

               
            });       
    }
};
module.exports.notFound = {
    handler: function(request, reply) {
         reply({
            result: 'Oops, 404 Page!'
        }).code(404);
    }
};