import React from 'react'
import { Switch, Route } from 'react-router-dom'

export default function RSFSwitch({ routes, ...rest }) {
  return (
    <Switch {...rest}>
      { routes.map((route, i) => (
        <Route key={i} {...route}/>
      ))}
    </Switch>
  )
}