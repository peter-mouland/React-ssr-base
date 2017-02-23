import React from 'react';

// import './products.scss';

const Product = ({ product }) => (
    <div>
      <div>Order Date:</div>
      <div>{product.OrderDate}</div>
    </div>
  );

export default ({ products, className = '', ...props }) => (
    <section className={ className } { ...props }>
      {
        products.map((product, i) => <Product product={ product } key={ `row${i}`} />)
      }
    </section>
);
