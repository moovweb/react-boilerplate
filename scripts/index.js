console.error = console.warn = console.log;

const ssr = require('./ssr').default;

useMoovAsyncTransformer();

module.exports = async function() {
  if (env.__static_origin_path__) {
    // static assets
    fns.export('Cache', 'true');
    fns.export('Cache-Time', '2903040000'); // static paths use hash-based cache-busting, so we far-future cache them in varnish and the browser
    return sendResponse({ htmlparsed: false });
  }
  try {
    return sendResponse({ htmlparsed: true, body: await ssr() });
  } catch (e) {
    return sendResponse({ htmlparsed: true, body: `Error: ${e.stack}` });
  }
};
