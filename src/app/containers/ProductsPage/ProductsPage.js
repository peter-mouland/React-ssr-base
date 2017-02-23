import React from 'react';
import debug from 'debug';
import { connect } from 'react-redux';

import { fetchProducts } from '../../actions';
import chevron from '../../../assets/chevron.svg';
import Svg from '../../components/Svg/Svg';
import Products from '../../components/Products/Products';

debug('base:Products');

const Loading = () => <p>Loading products....</p>;

class ProductsPage extends React.Component {

  static needs = [fetchProducts];

  componentDidMount() {
    if (this.props.products) return;
    this.props.fetchProducts();
  }

  render() {
    const { loading, products = [] } = this.props;
    return (
      <div id="products">
        <banner className="header">
          <h1>Credit Suisse Products</h1>
          <p><Svg markup={chevron} /> Jeans.</p>
        </banner>
        {loading && <Loading />}
        {products.length && <Products products={ products } />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    loading: state.products.loading
  };
}

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductsPage);
