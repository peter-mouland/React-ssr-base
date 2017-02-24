/* eslint-disable id-length */
import React from 'react';
import * as d3 from 'd3';

import LineGraph from '../LineGraph/LineGraph';
import PieChart from '../PieChart/PieChart';

import './orders.scss';

function filter(data, { manufacturerFilter, countryFilter, genderFilter }) {
  return d3.sum(data, (g) => { // eslint-disable-line arrow-body-style
    return (manufacturerFilter === 'all' || manufacturerFilter === g.manufacturer) &&
    (countryFilter === 'all' || countryFilter === g.deliveryCountry) &&
    (genderFilter === 'all' || genderFilter === g.gender)
      ? g.count
      : 0;
  });
}

function formatDataForLineGraph(orders, category, { ...filters }) {
  const filteredData = d3.nest()
    .key((d) => d.orderDate)
    .key((d) => d[category])
    .rollup((d) => filter(d, filters))
    .entries(orders);

  const columns = new Set();
  const data = filteredData
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
  return data;
}

function formatDataForPieChart(orders, category, { ...filters }) {
  const filteredData = d3.nest()
    .key((d) => d[category])
    .rollup((d) => filter(d, filters))
    .entries(orders);

  const columns = new Set();
  filteredData
    .forEach((item) => {
      columns.add(item.key);
    });
  filteredData.columns = columns;
  return filteredData;
}

export default ({ orders, className = '', category, manufacturerFilter, countryFilter, genderFilter, ...props }) => {
  const filters = { manufacturerFilter, countryFilter, genderFilter };
  const lineGraphData = formatDataForLineGraph(orders, category, filters);
  const pieChartData = formatDataForPieChart(orders, category, filters);
  const extraText = countryFilter !== 'all' ? `in ${countryFilter}` : '';
  const preText = manufacturerFilter !== 'all' && category !== 'manufacturer' ? `${manufacturerFilter}` : '';
  return (
    <section className={ className } { ...props }>
      <h2>{preText} January Sales by {category} {extraText}</h2>
      <div className="diagrams">
        <div className='diagram'>
          {
            <LineGraph data={ lineGraphData } />
          }
        </div>
        <div className='diagram'>
          {
            <PieChart data={ pieChartData } />
          }
        </div>
      </div>
    </section>
  );
};
