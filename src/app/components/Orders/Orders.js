/* eslint-disable id-length */
import React from 'react';
import * as d3 from 'd3';
import reactFauxDom from 'react-faux-dom';

import './orders.scss';

const OrderGraph = ({
  orders, category = 'manufacturer', manufacturerFilter = 'all', countryFilter = 'all', genderFilter = 'all'
}) => {
  const nestedData = d3.nest()
    .key((d) => d.orderDate)
    .key((d) => d[category])
    .rollup((d) => d3.sum(d, (g) => { // eslint-disable-line arrow-body-style
      return (manufacturerFilter === 'all' || manufacturerFilter === g.manufacturer) &&
      (countryFilter === 'all' || countryFilter === g.deliveryCountry) &&
      (genderFilter === 'all' || genderFilter === g.gender)
        ? g.count
        : 0;
    }))
    .entries(orders);
  const columns = new Set();

  const data = nestedData
    .map((item) => {
      const returnValue = item.values.reduce((prev, curr) => {
        columns.add(curr.key);
        prev[curr.key] = curr.value;
        return prev;
      }, {});
      returnValue.date = new Date(item.key);
      return returnValue;
    })
    .sort((a, b) => a.date - b.date);
  data.columns = columns;

  const node = reactFauxDom.createElement('svg');
  node.setAttribute('width', 800);
  node.setAttribute('height', 600);
  const svg = d3.select(node);
  const margin = { top: 20, right: 80, bottom: 30, left: 50 };
  const width = svg.attr('width') - margin.left - margin.right;
  const height = svg.attr('height') - margin.top - margin.bottom;
  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  const z = d3.scaleOrdinal(d3.schemeCategory10);

  const line = d3.line()
    .curve(d3.curveBasis)
    .x((d) => x(d.date))
    .y((d) => y(d.count));

  const manufacturers = [...data.columns].map((id) => ({
    id,
    values: data.map((d) => ({ date: d.date, count: d[id] }))
  }));

  x.domain(d3.extent(data, (d) => d.date));

  y.domain([
    d3.min(manufacturers, (c) => d3.min(c.values, (d) => d.count)),
    d3.max(manufacturers, (c) => d3.max(c.values, (d) => d.count))
  ]);

  z.domain(manufacturers.map((c) => c.id));

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('fill', '#000')
    .text('Sales');

  const manufacturer = g.selectAll('.manufacturer')
    .data(manufacturers)
    .enter().append('g')
    .attr('class', 'manufacturer');

  manufacturer.append('path')
    .attr('class', 'line')
    .attr('d', (d) => line(d.values))
    .style('stroke', (d) => z(d.id));

  manufacturer.append('text')
    .datum((d) => ({ id: d.id, value: d.values[d.values.length - 1] }))
    .attr('transform', (d) => `translate(${x(d.value.date)},${y(d.value.count)})`)
    .attr('x', 3)
    .attr('dy', '0.35em')
    .style('font', '10px sans-serif')
    .text((d) => d.id);

  return node.toReact();
};

export default ({ orders, className = '', category, manufacturerFilter, countryFilter, genderFilter, ...props }) => (
    <section className={ className } { ...props }>
      <h2>January Sales by Manufacturer</h2>
      <div className='graph'>
        {<OrderGraph orders={ orders }
                     category={category}
                     manufacturerFilter={ manufacturerFilter }
                     countryFilter={countryFilter}
                     genderFilter={genderFilter}
        />}
      </div>
    </section>
  );
