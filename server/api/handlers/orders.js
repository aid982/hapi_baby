const mongojs = require('hapi-mongojs');
const Boom = require('boom');

module.exports.get = {
    handler: function (request, reply) {
        const ordersCollection = mongojs.db().collection('orders');
        ordersCollection.find((err, docs) => {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            reply(docs);
        });
    }
};
module.exports.post = {
    //auth:'simple',
    handler: function (request, reply) {
        var currentUser = request.session.currentUser;
        if(!currentUser) {
            return reply({"error": "Unauthorized"}).code(403);
        }
        const order = request.payload;
        order.Client = currentUser;
        order.totalSum = 0;
        order.purchaseItemList.forEach(function(item) {
            order.totalSum = order.totalSum + item.qty * item.price;
        });

        const ordersCollection = mongojs.db().collection('orders');
        ordersCollection.insert(order, (err, result) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                return reply(order);
            }
        );
    }
};