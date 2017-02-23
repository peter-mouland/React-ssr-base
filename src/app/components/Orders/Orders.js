import React from 'react';

// import './orders.scss';

const Order = ({ order }) => (
    <div>
      <div>Order Date:</div>
      <div>{order.OrderDate}</div>
    </div>
  );

export default ({ orders, className = '', ...props }) => (
    <section className={ className } { ...props }>
      {
        orders.map((order, i) => <Order order={ order } key={ `row${i}`} />)
      }
    </section>
);
