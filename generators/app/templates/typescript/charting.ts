import * as d3 from 'd3';

export class Chart {
  private _group: d3.Selection<any>;

  constructor(container: any) {
    this._group = d3.select(container).append('g');
  }

  draw() {
    var scale = d3.scale.linear();
    scale.domain([0, 1]);
    scale.range([0, 800]);
    var axis = d3.svg.axis();
    axis.scale(scale);
    this._group.call(axis);
  }
}
