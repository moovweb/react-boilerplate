import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import { makeSelectProduct } from '../App/selectors';
import saga from './saga';
import { loadProduct } from './actions';

class ProductPage extends Component {

  state = {
    id: null
  }

  componentDidMount() {
    this.fetchProduct()
  }

  componentDidUpdate() {
    this.fetchProduct()
  }

  fetchProduct() {
    const { product, onProductChange } = this.props
    const nextId = this.props.match.params.id

    if (nextId && (product == null || nextId !== product.get('id'))) {
      onProductChange(nextId)
    }
  }

  render() {
    const { product } = this.props

    if (product == null) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <h1>Product</h1>
          <div>ID: {product.get('id')}</div>
          <div>Name: {product.get('name')}</div>
        </div>
      )
    }
  }

}

export function mapDispatchToProps(dispatch) {
  return {
    onProductChange: id => {
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

const withSaga = injectSaga({ key: 'product', saga });

export default compose(
  withSaga,
  withConnect,
)(ProductPage);
