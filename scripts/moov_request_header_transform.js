console.error = console.warn = console.log;

module.exports = function() {
  if (env.__static_origin_path__) {
    // always go upstream for static paths
  } else {
    // don't bother going upstream if we're not using https, we're just going to redirect
    return moovSkipUpstream();
  }
};
