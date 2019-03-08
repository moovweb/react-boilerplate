import React from 'react'
import { renderWithEnzyme } from 'react-moovweb-xdn'
import App from 'containers/App'
import configureStore from '../app/configureStore'
import { createMemoryHistory } from 'history'
import { translationMessages } from '../app/i18n'
import LanguageProvider from '../app/containers/LanguageProvider'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { getBundles } from 'react-loadable/webpack'
import Loadable from 'react-loadable'
import fetch from 'react-storefront/fetch'
import flatMap from 'lodash/flatMap'
import '../app/assets'

/**
 * Renders the app on the server
 * @param {String} url The url being served
 * @return {String} The rendered html
 */
export default async function ssr() {
  const loadableStats = await getLoadableStats()
  const webpackStats = await getWebpackStats()
  const url = env.path
  const history = createMemoryHistory({ initialEntries: [url] })
  const store = configureStore({}, history)
  const modules = []

  const mainJSAssets = flatMap(
    Object.keys(webpackStats.assetsByChunkName).filter(key => key.match(/(^|~)main/)),
    key => webpackStats.assetsByChunkName[key]
  ).map(file => `/pwa/${file}`)

  return await renderWithEnzyme({
    state: () => store.getState(),
    assets: () => {
      return getBundles(loadableStats, modules)
        .map(bundle => bundle.publicPath)
        .concat(mainJSAssets)
    },
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

const getLoadableStats = () => 
  fetch(`http:${env.asset_host}/pwa/react-loadable.json`)
  .then(res => res.json())

const getWebpackStats = () => 
  fetch(`http:${env.asset_host}/pwa/stats.json`)
  .then(res => res.json())
