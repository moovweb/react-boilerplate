console.error = console.warn = console.log;

const ssr = require('./ssr').default

useMoovAsyncTransformer()

module.exports = async function() {
  try {
    const body = await ssr(env.path)
    console.log('sendResponse')
    return sendResponse({ htmlparsed: true, body })
  } catch (e) {
    console.log(e)
    return sendResponse({ htmlparsed: true, body: `Error: ${e.stack}` })
  }
}
