import React from 'react';
import debug from 'debug';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { fetchOrders } from '../../actions';
import Orders from '../../components/Orders/Orders';

debug('base:OrdersPage');


function byCountry(prev, curr) {
  if (prev.deliveryCountry < curr.deliveryCountry) { return -1; }
  if (prev.deliveryCountry > curr.deliveryCountry) { return 1; }
  return 0;
}

const Loading = () => <p>Loading orders....</p>;

class OrdersPage extends React.Component {

  static needs = [fetchOrders];

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'manufacturer',
      selectedManufacturer: 'all',
      selectedCountry: 'all',
      selectedGender: 'all'
    };
  }

  componentDidMount() {
    if (this.props.orders) return;
    this.props.fetchOrders();
  }

  updateState(newState) {
    this.setState(newState);
  }

  render() {
    const { loading, orders = [] } = this.props;
    const { selectedCategory, selectedManufacturer, selectedCountry, selectedGender } = this.state;
    const categories = ['manufacturer', 'gender', 'size', 'colour', 'style'];
    const manufacturers = ['all', 'The Hipster Jeans Company', 'Denzil Jeans', 'Wrangled Jeans'];
    const genders = ['all', 'M', 'F'];
    const countries = new Set();
    countries.add('all');
    orders
      .sort(byCountry)
      .forEach((order) => countries.add(order.deliveryCountry));

    const topCountries = d3.nest()
      .key((data) => data.deliveryCountry)
      .rollup((data) => d3.sum(data, (item) => item.count))
      .entries(orders);

    const top5Countries = topCountries.sort((prev, curr) => (curr.value - prev.value)).slice(0, 5);

    return (
      <div id="orders">
        <banner className="header">
          <h1>Credit Suisse Orders</h1>
        </banner>
        {loading && <Loading />}
        <div>
          <h2>Display: </h2>
          <fieldset>
            {categories.map((category, i) => (
              <span key={`category-${i}`}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    id={`category-${i}`}
                    onChange={() => this.updateState({ selectedCategory: category })} />
                  <label htmlFor={`category-${i}`}>{category}</label>
                </span>
            ))}
          </fieldset>
          <h2>Filter: </h2>
          <fieldset>
            <legend>Manufacturer</legend>
            {manufacturers.map((manufacturer, i) => (
              <span key={`manufacturer-${i}`}>
                  <input
                    type="radio"
                    name="manufacturer"
                    value={manufacturer}
                    id={`manufacturer-${i}`}
                    onChange={() => this.updateState({ selectedManufacturer: manufacturer })} />
                  <label htmlFor={`manufacturer-${i}`}>{manufacturer}</label>
                </span>
            ))}
          </fieldset>
          <fieldset>
            <legend>Country</legend>
            <div>
              Top 5:
              <span key={'topCountry-all'}>
                  <input type="radio"
                         name="top-country"
                         value='all'
                         id={'topCountry-all'}
                         onChange={() => this.updateState({ selectedCountry: 'all' })}
                  />
                  <label htmlFor={'topCountry-all'}>all</label>
              </span>
              {top5Countries.map((topCountry, i) => (
                <span key={`topCountry-${i}`}>
                  <input type="radio"
                         name="top-country"
                         value={topCountry.key}
                         id={`topCountry-${i}`}
                         onChange={() => this.updateState({ selectedCountry: topCountry.key })}
                  />
                  <label htmlFor={`topCountry-${i}`}>{topCountry.key} ({topCountry.value})</label>
                </span>
              ))}
            </div>
            <div>all countries:
              <input type="text"
                     id="filter-country"
                     list="countries"
                     ref="country"
              />
              <datalist id="countries">
                {[...countries].map((country, i) => (
                      <option
                        key={`country-${i}`}
                        value={country}
                       />
                ))}
              </datalist>
              <button onClick={() => {
                this.updateState({ selectedCountry: this.refs.country.value });
              }}>
                Update
              </button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Gender</legend>
            {genders.map((gender, i) => (
              <span key={`gender-${i}`}>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    id={`gender-${i}`}
                    onChange={() => this.updateState({ selectedGender: gender })} />
                  <label htmlFor={`gender-${i}`}>{gender}</label>
                </span>
            ))}
          </fieldset>
        </div>
        {
          orders.length > 0 &&
            <Orders
              orders={ orders }
              category={ selectedCategory }
              manufacturerFilter={ selectedManufacturer }
              countryFilter={ selectedCountry }
              genderFilter={ selectedGender }
            />
        }
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
