import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProductPage from 'containers/ProductPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/features" component={FeaturePage} />
      <Route path="/p/:id" component={ProductPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  );
}
