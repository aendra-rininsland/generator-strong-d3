var d3 = require('d3');

export module charting {
  export class chart {
    private _group: d3.Selection<any>;

    constructor(container: any) {
      this.init(container);
    }

    private init(container: any) {
      this._group = d3.select(container).append('g');
    }

    draw() {
      var d3 = require('d3');
      var scale = d3.scale.linear();
      scale.domain([0, 1]);
      scale.range([0, 800]);
      var axis = d3.svg.axis();
      axis.scale(scale);
      this._group.call(axis);
    }
  }
}
