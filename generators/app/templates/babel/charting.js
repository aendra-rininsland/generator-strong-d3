/* @flow */

var d3 = require('d3');

export class chart {
  _group: d3.selection;

  constructor(container: any): void {
    this._group = {};
    this.init(container);
  }

  init(container: any): void {
    this._group = d3.select(container).append('g');
  }

  draw(): void {
    var d3 = require('d3');
    var scale = d3.scale.linear();
    scale.domain([0, 1]);
    scale.range([0, 800]);
    var axis = d3.svg.axis();
    axis.scale(scale);
    this._group.call(axis);
  }
}
