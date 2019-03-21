import React from 'react';
import { renderWithEnzyme } from 'react-moovweb-xdn';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { getMainJSAssets } from 'react-moovweb-xdn/assets';

// app-specific paths
import App from 'containers/App';
import LanguageProvider from '../app/containers/LanguageProvider';
import { translationMessages } from '../app/i18n';
import configureStore from '../app/configureStore';

/**
 * Renders the app on the server
 * @param {String} url The url being served
 * @return {String} The rendered html
 */
export default async function renderToString() {
  const url = env.path;
  const history = createMemoryHistory({ initialEntries: [url] });
  const store = configureStore({}, history);
  const modules = [];

  const assets = await getMainJSAssets(modules, {
    statsPath: 'stats.json',
    loadableStatsPath: 'react-loadable.json',
  });

  return await renderWithEnzyme({
    state: () => store.getState(),
    assets,
    element: (
      <StaticRouter location={url} context={{}}>
        <Provider store={store}>
          <LanguageProvider messages={translationMessages}>
            <App />
          </LanguageProvider>
        </Provider>
      </StaticRouter>
    ),
  });
}
