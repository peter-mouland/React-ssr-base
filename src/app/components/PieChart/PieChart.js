/* eslint-disable id-length*/
import * as d3 from 'd3';
import reactFauxDom from 'react-faux-dom';

import './pieChart.scss';

export default ({ data }) => {
  const width = 400;
  const height = 300;
  const radius = Math.min(width, height) / 2;

  const node = reactFauxDom.createElement('svg');
  node.setAttribute('width', width);
  node.setAttribute('height', height);

  const conatiner = d3.select(node);

  const color = d3.scaleOrdinal()
    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  const pie = d3.pie()
    .sort(null)
    .value((d) => d.value);

  const svg = conatiner.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');

  g.append('path')
    .attr('d', arc)
    .style('fill', (d) => color(d.data.key));

  g.append('text')
    .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
    .attr('dy', '.35em')
    .text((d) => d.data.key);

  return node.toReact();
};
