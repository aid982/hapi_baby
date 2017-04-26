exports.register = (plugin, options, next) => {

  plugin.route([
      { method: 'GET', path: '/{param*}',
          handler: {
          directory: {
              path: "frontend/build",
              index: true,
              listing: true
          }
      }}
  ]);

  next();
};

exports.register.attributes = {
  name: 'static'
};