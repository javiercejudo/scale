/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var RescaleError = rescaleUtil.RescaleError;
var decimal = arbitraryPrecision.load();

exports.scale = function scaleNormalised(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  if (arbitraryPrecision.isAvailable()) {
    return Number(scaleDecimal(x, scale));
  }

  return scaleNative(x, scale);
};

function scaleDecimal(x, scale) {
  return decimal(scale[1]).minus(scale[0]).times(x).plus(scale[0]);
}

function scaleNative(x, scale) {
  return scale[0] + x * (scale[1] - scale[0]);
}
