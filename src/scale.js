'use strict';

var rescaleUtil = require('rescale-util');

exports.scale = function scale(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new Error(rescaleUtil.getLastError());
  }

  return scale[0] + x * (scale[1] - scale[0]);
}
