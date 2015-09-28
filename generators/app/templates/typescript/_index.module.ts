/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { charting } from './charting';

module <%= _.camelize(appName) %> {
  'use strict';

  let axis = new charting.chart('#chart');
  axis.draw();
}
