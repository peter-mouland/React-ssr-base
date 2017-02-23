import debug from 'debug';
import Chance from 'chance';

const log = debug('base:fetch-orders');
const chance = new Chance();

const sizes = {
  F: [14, 16, 18, 20], // eslint-disable-line id-length
  M: ['28/28', '28/30', '30/30', '30/32', '32/32', '32/34', '34/34'] // eslint-disable-line id-length
};
const colours = ['blue', 'red', 'yellow', 'black', 'dark blue', 'dark red', 'dark yellow', 'dark black'];
const styles = ['Relaxed', 'Fitted', 'Skinny', 'Boot Cut'];
const genders = ['F', 'M'];
const manufactureres = ['The Hipster Jeans Company', 'The Hipster Jeans', 'Wrangled Jeans'];

const getMockOrders = () => {
  const orderDate = chance.date({ year: 2017, month: 0, american: false });
  const deliveryCountry = chance.country({ full: true });
  const gender = chance.pickone(genders);
  const size = chance.pickone(sizes[gender]);
  const colour = chance.pickone(colours);
  const style = chance.pickone(styles);
  const count = chance.integer({ min: 0, max: 20 });
  const manufacturer = chance.pickone(manufactureres);
  return { orderDate, manufacturer, deliveryCountry, gender, size, colour, style, count };
};

const createArrayOfOrders = (orderCount) => Array(...Array(orderCount)).map(() => getMockOrders());

const returnResultsAferDelay = ({ delayInSeconds, results }) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(results);
  }, Math.random() * delayInSeconds * 1000);
});

export default function fetchOrders() {
  return returnResultsAferDelay({ delayInSeconds: 3, results: createArrayOfOrders(250) });
}
