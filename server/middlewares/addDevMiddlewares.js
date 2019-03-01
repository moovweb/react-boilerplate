const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function createWebpackMiddleware(config) {
  const compiler = webpack(config);

  return {
    compiler,
    middleware: webpackDevMiddleware(compiler, {
      logLevel: 'warn',
      publicPath: config.output.publicPath,
      silent: true,
      stats: 'errors-only',
    }),
  };
}

global.window = {};

module.exports = function addDevMiddlewares(app, clientConfig, serverConfig) {
  const {
    compiler: clientCompiler,
    middleware: clientMiddleware,
  } = createWebpackMiddleware(clientConfig);
  const {
    compiler: serverCompiler,
    middleware: serverMiddleware,
  } = createWebpackMiddleware(serverConfig);

  app.use(clientMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(serverMiddleware);

  app.get('*', (req, res) => {
    // const ssrPath = path.join(serverCompiler.outputPath, 'ssr');
    // require(ssrPath);
    // global.ssr(req, res);
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
