import React from 'react';

// import './orders.scss';

const Order = ({ order }) => (
    <div>
      <div>Order Date:</div>
      <div>{order.orderDate}</div>
      <div>{order.manufacturer}</div>
      <div>{order.deliveryCountry}</div>
      <div>{order.gender}</div>
      <div>{order.size}</div>
      <div>{order.colour}</div>
      <div>{order.style}</div>
      <div>{order.count}</div>
    </div>
  );

export default ({ orders, className = '', ...props }) => (
    <section className={ className } { ...props }>
      {
        orders.map((order, i) => <Order order={ order } key={ `row${i}`} />)
      }
    </section>
);
