import React from 'react'
import { renderWithEnzyme } from 'react-moovweb-xdn'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import Loadable from 'react-loadable'
import getLoadableAssets from 'react-moovweb-xdn/react-loadable/getLoadableAssets'

// app-specific paths
import LanguageProvider from '../../app/containers/LanguageProvider'
import { translationMessages } from '../../app/i18n'
import App from 'containers/App'
import configureStore from '../../app/configureStore'

/**
 * Renders the app on the server
 * @param {String} url The url being served
 * @return {String} The rendered html
 */
export default async function renderToString() {
  const url = env.path
  const history = createMemoryHistory({ initialEntries: [url] })
  const store = configureStore({}, history)
  const modules = []
  
  const assets = await getLoadableAssets(modules, {
    statsPath: 'stats.json',
    loadableStatsPath: 'react-loadable.json'
  })

  return await renderWithEnzyme({
    state: () => store.getState(),
    assets,
    element: (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter location={url} context={{}}>
          <Provider store={store}>
            <LanguageProvider messages={translationMessages}>
              <App/>
            </LanguageProvider>
          </Provider>
        </StaticRouter>
      </Loadable.Capture>
    )
  })
}
