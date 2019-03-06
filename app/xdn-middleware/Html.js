import React  from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

function Html({ assets, children, store }) {
  const content = children ? ReactDOM.renderToStaticMarkup(children) : ''
  const head = Helmet.rewind()

  return (
    <html lang="en-us">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {assets && assets.styles && (
          Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8" />
          )
        )}
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
        <script dangerouslySetInnerHTML={{ __html: `window.initialState=${serialize(store.getState())}` }} charSet="UTF-8" />
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object
}

export default Html