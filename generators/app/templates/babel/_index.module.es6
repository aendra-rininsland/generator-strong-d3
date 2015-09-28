import { chart } from './charting';

module <%= _.camelize(appName) %> {
  'use strict';

  let axis = new chart('#chart');
  axis.draw();
}
