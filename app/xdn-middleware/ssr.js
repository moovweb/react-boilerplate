import React from 'react'
import { renderToString } from 'react-dom/server'
import App from 'containers/App'
import { events } from '../utils/request'
import XdnReduxProvider from './XdnReduxProvider';
import configureStore from '../configureStore'
import { createMemoryHistory } from 'history'

/**
 * Renders the app on the server
 * @param {Request} req 
 * @param {Response} res 
 * @param {Object} store the redux store
 * @param {Object[]} routes the top-level routes
 */
export default async function ssr(req, res) {
  try {
    const history = createMemoryHistory({ initialEntries: [req.url] })
    let store = configureStore({}, history)

    const render = (store) => renderToString(
      <XdnReduxProvider url={req.url} store={store}>
        <App/>
      </XdnReduxProvider>
    )

    // Create a listener that fires when all fetch requests to finish.
    // When all fetch requests are finished, we wait until the next next tick 
    // to render so that fetch results can be processed and added to the store.
    const onDone = () => {
      events.removeListener('done', onDone)

      process.nextTick(() => {
        store = configureStore(store.getState(), history)
        const html = render(store)
        res.send(html)
      })
    }

    events.on('done', onDone)

    // render the app so that the router runs, mounts the correct page component
    // and fires off all API requests.
    render(store)
  } catch (e) {
    console.log('error', e)
    res.status(500)
  }
}

global.ssr = ssr
global.__SERVER__ = true