import { Chart } from './charting';

module <%= _.camelize(appName) %> {
  'use strict';

  let myChart = new Chart('#chart');
  myChart.draw();
}
