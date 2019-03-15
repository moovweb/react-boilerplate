import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

global.window = {
  // document: {
  //   createElement: Function.prototype,
  // },
}

export default function resetJsDom() {
  const { JSDOM } = require('jsdom')

  const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    testEnvironmentOptions: {
      runScripts: 'outside-only',
    },
    ProcessExternalResources: false,
  })

  const { window } = jsdom
  global.window = window
  global.document = window.document
  global.navigator = { userAgent: 'node.js' }
  global.requestAnimationFrame = callback => setTimeout(callback, 0)
  global.cancelAnimationFrame = id => clearTimeout(id)
  Enzyme.configure({ adapter: new EnzymeAdapter() })
}

resetJsDom()