/* eslint-disable global-require */

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const addDevMiddlewares = require('./addDevMiddlewares');

    console.log('adding dev middlewares');

    addDevMiddlewares(
      app,
      require('../../internals/webpack/webpack.dev.babel'),
      require('../../internals/webpack/webpack.server.dev'),
    );
  }

  return app;
};
