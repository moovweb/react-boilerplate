import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Html from './Html'
import { translationMessages } from '../i18n'
import LanguageProvider from 'containers/LanguageProvider'

export default class XdnReduxProvider extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { url, children, store } = this.props

    return (
      <Html store={store}>
        <StaticRouter location={url} context={{}}>
          <Provider store={store}>
            <LanguageProvider messages={translationMessages}>
              { children }
            </LanguageProvider>
          </Provider>
        </StaticRouter>
      </Html>
    )
  }

}