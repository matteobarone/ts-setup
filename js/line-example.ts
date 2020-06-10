import dataSet from './data';
import * as d3 from 'd3';
import {responsivefy} from './responsivefy';

export function lineExample() {
  dataSet.forEach(company => {
    company.values.forEach(d => {
      d.date = d3.timeParse('%Y/%m/%d')(d.date) as any;
    })
  });

  let counter = 0;
  const data = [
    {ticker: 'AMZN', values: []},
    {ticker: 'GOOG', values: []},
  ];

  const margin = {top: 20 , right: 20, bottom: 30, left: 30 };
  const width = 400 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleTime()
    .domain([
      d3.min(dataSet, (co: any) => d3.min(co.values, (d: any) => new Date(d.date))),
      d3.max(dataSet, (co: any) => d3.max(co.values, (d: any) => new Date(d.date))),
    ])
    .range([0, width]);
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5));

  const yScale = d3.scaleLinear()
    .domain([
      d3.min(dataSet, (co: any) => d3.min(co.values, (d: {close: number}) => d.close)),
      d3.max(dataSet, (co: any) => d3.max(co.values, (d: {close: number}) => d.close)),
    ])
    .range([height, 0]);
  svg.append('g').call(d3.axisLeft(yScale));

  const line = d3.line()
    .x((d: any) => xScale(d.date))
    .y((d: any) => yScale(d.close))
    .curve(d3.curveCatmullRom.alpha(0.5));

  const interval = setInterval(() => {
    data[0].values.push(dataSet[0].values[counter]);
    data[1].values.push(dataSet[1].values[counter]);
    counter++;

    if (counter < 64) {
      render([...data]);
    } else {
      clearInterval(interval);
    }
  }, 100);

  function render(data: any) {
    const update = svg
      .selectAll('.line')
      .data(data);

    update.exit().remove();

    update.attr('d', (d: any) => line(d.values as any));

    update
      .enter()
      .append('path')
      .attr('class', 'line')
      .style('stroke', (d, i) => ['#ff9900', '#3369e8'][i])
      .style('stroke-width', 2)
      .style('fill', 'none');
  }
}
