import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectProduct } from '../App/selectors';
import reducer from './reducer';
import saga, { getProduct } from './saga';
import { loadProduct } from './actions';

export function ProductPage({ match, onProductChange, product }) {
  const nextId = match.params.id;
  const [id, setId] = useState(null);

  if (__SERVER__ && product == null) {
    onProductChange(nextId);
  } else {
    useEffect(() => {
      if (nextId != id) {
        onProductChange(nextId);
        setId(nextId);
      }
    });
  }

  if (product == null) {
    return <p>Loading...</p>;
  }

  return <h1>Product {product.id}</h1>;
}

ProductPage.getInitialSagas = function(match) {
  return [
    [getProduct, match.params]
  ]
}

export function mapDispatchToProps(dispatch) {
  return {
    onProductChange: id => {
      console.log(`dispatch loadProduct(${id})`)
      dispatch(loadProduct(id))
    }
  };
}

const mapStateToProps = createStructuredSelector({
  product: makeSelectProduct(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'product', reducer });
const withSaga = injectSaga({ key: 'product', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductPage);
