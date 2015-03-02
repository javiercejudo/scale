'use strict';

function scale(x, scale) {
  return scale[0] + x * (scale[1] - scale[0]);
}

module.exports = scale;
