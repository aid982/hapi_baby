const products = require('./handlers/products');
const categories = require('./handlers/categories');
const sizes = require('./handlers/sizes');
const accounts = require('./handlers/accounts');
const orders = require('./handlers/orders');


exports.register = (plugin, options, next) => {

    plugin.route([
        {method: 'GET', path: '/products', config: products.get},
        {method: 'GET', path: '/products/{id}', config: products.getById},
        {method: 'GET', path: '/categories', config: categories.get},
        {method: 'GET', path: '/sizes', config: sizes.get},
        {method: 'GET', path: '/orders', config: orders.get},
        {method: 'GET', path: '/logout', config: accounts.logOut},
        {method: 'POST', path: '/products', config: products.post},
        {method: 'POST', path: '/categories', config: categories.post},
        {method: 'POST', path: '/sizes', config: sizes.post},
        {method: 'POST', path: '/orders', config: orders.post},
        /// accounts
        {method: 'POST', path: '/accounts/email', config: accounts.generatePasswordOverEmail},
        {method: 'DELETE', path: '/accounts', config: accounts.delete},
        {method: 'PUT', path: '/accounts', config: accounts.update},
        {method: 'GET', path: '/accounts', config: accounts.getAllAccounts},
        {method: 'POST', path: '/accounts', config: accounts.post},
        {method: 'POST', path: '/login', config: accounts.login},


    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};