import React from 'react'
import { renderToString } from 'react-dom/server'
import App from 'containers/App'
import { whenAllFetchesAreDone } from '../app/xdn-middleware/fetch'
import ReduxRenderer from '../app/xdn-middleware/ReduxRenderer'
import configureStore from '../app/configureStore'
import { createMemoryHistory } from 'history'
import { translationMessages } from '../app/i18n'
import LanguageProvider from '../app/containers/LanguageProvider'

/**
 * Renders the app on the server
 * @param {String} url The url being served
 * @return {String} The rendered html
 */
export default async function ssr(url) {
  return new Promise((resolve, reject) => {
    try {
      const history = createMemoryHistory({ initialEntries: [url] })
      let store = configureStore({}, history)
  
      const render = (store) => renderToString(
        <ReduxRenderer url={url} store={store}>
          <LanguageProvider messages={translationMessages}>
            <App/>
          </LanguageProvider>
        </ReduxRenderer>
      )
  
      // render the app so that the router runs, mounts the correct page component
      // and fires off all API requests.
      render(store)

      // When all fetch requests are finished, we wait until the next next tick 
      // to render so that fetch results can be processed and added to the store.
      whenAllFetchesAreDone(() => resolve(
        render(
          configureStore(store.getState(), history)
        )
      ))
    } catch (e) {
      reject(e)
    }
  })
}

global.ssr = ssr
global.__SERVER__ = true