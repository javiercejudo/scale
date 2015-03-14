/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var RescaleError = rescaleUtil.RescaleError;

exports.scale = function scaleNormalised(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  return scale[0] + x * (scale[1] - scale[0]);
};
