import * as d3 from 'd3';

export function responsivefy(svg: d3.Selection<SVGElement, {}, HTMLElement, any>) {
  const container = d3.select(svg.node().parentNode);
  const width = parseInt(svg.style('width'));
  const height = parseInt(svg.style('height'));
  const aspect = width / height;

  svg.attr('viewBox', `0 0 ${width} ${height}`)
    .call(resize);

  d3.select(window).on(`resize.${container.attr('id')}`, resize);

  function resize() {
    const targetWidth = parseInt(container.style('width'));
    svg.attr('width', targetWidth);
    svg.attr('height', Math.round(targetWidth / aspect));
  }
}
