const Bcrypt = require('bcryptjs');
const mongojs = require('hapi-mongojs');
const config = require('./config');

exports.register = function (plugin, options, next) {
    plugin.auth.strategy('jwt', 'jwt', {
        // Implement validation function
        key: config.security.JWT_SECRET,
        validateFunc: (decoded, request, callback) => {
            return callback(null, true);
        },
        verifyOptions: {algorithms: ['HS256']}
    });


  /*plugin.auth.strategy('1c', 'basic', {
    // Implement validation function
    validateFunc: (request, username, password, callback) => {
      const users = {
        aiden: {
          password: '$2a$10$sSm3GdFJgBdYOftAgiztMurcK6Qox2P1vCwJjPk7qdt726xoHmaZS',   // 'fqy1982'
        }
      };

      const user = users[username];
      if (!user) {
        return callback(null, false);
      }
      Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
      });

    }
  });*/

  next();
};

exports.register.attributes = {
  name: 'auth'
};