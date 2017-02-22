import React from 'react';
import debug from 'debug';
import { connect } from 'react-redux';

import { fetchProducts } from '../../actions';
import chevron from '../../../assets/chevron.svg';
import Svg from '../../components/Svg/Svg';

debug('base:Products');

const Error = () => <p>Error Loading products!</p>;
const Loading = () => <p>Loading products....</p>;

class Products extends React.Component {

  static needs = [fetchProducts];

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: false
    };
  }

  componentDidMount() {
    if (this.props.products) return;
    this.props.fetchProducts();
  }

  render() {
    const { loading, error, products } = this.state;

    return (
      <div id="products">
        <banner className="header">
          <h1>Credit Suisse Products</h1>
          <p><Svg markup={chevron} /> Jeans.</p>
        </banner>
        {error && <Error />}
        {loading && <Loading />}
        {products && <div></div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Products);
