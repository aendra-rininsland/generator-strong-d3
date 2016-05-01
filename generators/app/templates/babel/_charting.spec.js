import * as chai from 'chai';
import { Chart } from './charting';
import * as d3 from 'd3';

var should = chai.should();

var chart;

describe('a testing testing <%= _.slugify(appName) %>', () => {
  beforeEach(() => {
    chart = new Chart();
  });

  it('should do something', () => {
    should.exist(chart);
    d3.selectAll('svg').should.have.length.at.least(1);
  });
});
