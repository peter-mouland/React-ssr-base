import React from 'react';
import debug from 'debug';
import { connect } from 'react-redux';

import { fetchOrders } from '../../actions';
import Orders from '../../components/Orders/Orders';

debug('base:OrdersPage');

const Loading = () => <p>Loading orders....</p>;

class OrdersPage extends React.Component {

  static needs = [fetchOrders];

  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'manufacturer'
    };
  }

  componentDidMount() {
    if (this.props.orders) return;
    this.props.fetchOrders();
  }

  updateFilter(selectedFilter) {
    this.setState({ selectedFilter });
  }

  render() {
    const { loading, orders = [] } = this.props;
    const { selectedFilter } = this.state;
    const filters = ['manufacturer', 'gender', 'size', 'colour', 'style'];
    return (
      <div id="orders">
        <banner className="header">
          <h1>Credit Suisse Orders</h1>
        </banner>
        {loading && <Loading />}
        <div>
          <h2>Filter by: </h2>
          <fieldset>
            {filters.map((filter, i) => (
                <span key={`filter-${i}`}>
                  <input
                    type="radio"
                    name="filter"
                    value={filter}
                    id={`filter-${i}`}
                    onChange={() => this.updateFilter(filter)} />
                  <label htmlFor={`filter-${i}`}>{filter}</label>
                </span>
              ))}
          </fieldset>
        </div>
        {orders.length > 0 && <Orders orders={ orders } filter={selectedFilter} />}
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
