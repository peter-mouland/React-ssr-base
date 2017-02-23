import React from 'react';
import debug from 'debug';
import { connect } from 'react-redux';

import { fetchOrders } from '../../actions';
import chevron from '../../../assets/chevron.svg';
import Svg from '../../components/Svg/Svg';
import Orders from '../../components/Orders/Orders';

debug('base:OrdersPage');

const Loading = () => <p>Loading orders....</p>;

class OrdersPage extends React.Component {

  static needs = [fetchOrders];

  componentDidMount() {
    if (this.props.orders) return;
    this.props.fetchOrders();
  }

  render() {
    const { loading, orders = [] } = this.props;
    return (
      <div id="orders">
        <banner className="header">
          <h1>Credit Suisse Orders</h1>
          <p><Svg markup={chevron} /> Jeans.</p>
        </banner>
        {loading && <Loading />}
        {orders.length > 0 && <Orders orders={ orders } />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  };
}

export default connect(
  mapStateToProps,
  { fetchOrders }
)(OrdersPage);
