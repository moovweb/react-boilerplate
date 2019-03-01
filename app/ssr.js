import React from 'react';
import { renderToString } from 'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import LanguageProvider from 'containers/LanguageProvider';
import App from 'containers/App';
import configureStore from './configureStore';
import { translationMessages } from './i18n';

global.ssr = function ssr(request, response) {
  const html = renderHtml(renderApp(request.path + request.search));
  response.send(html);
};

function renderApp(uri) {
  const history = createMemoryHistory({ initialEntries: [uri] });
  const context = {};
  const initialState = {};
  const store = configureStore(initialState, history);

  return renderToString(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <StaticRouter location={uri} context={context}>
          <App />
        </StaticRouter>
      </LanguageProvider>
    </Provider>,
  );
}

function renderHtml(app) {
  return `
    <!doctype html>
    <html lang="en">
    
    <head>
      <!-- The first thing in any HTML file should be the charset -->
      <meta charset="utf-8">
    
      <!-- Make the page mobile compatible -->
      <meta name="viewport" content="width=device-width, initial-scale=1">
    
      <!-- Allow installing the app to the homescreen -->
      <meta name="mobile-web-app-capable" content="yes">
    
      <link rel="icon" href="/favicon.ico" />
      <title>React.js Boilerplate</title>
    </head>
    
    <body>
      <!-- Display a message if JS has been disabled on the browser. -->
      <noscript>SSR</noscript>
    
      <!-- The app hooks into this div -->
      <div id="app">
        ${app}
      </div>
    
      <!-- Open Sans Font -->
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
    
      <!-- A lot of magic happens in this file. HtmlWebpackPlugin automatically injects all assets (e.g. bundle.js, main.css) with the correct HTML tags, which is why they are missing in this file. Don't add any assets here! (Check out webpack.dev.babel.js and webpack.prod.babel.js if you want to know more) -->
      
    </body>
    
    </html>  
  `;
}
