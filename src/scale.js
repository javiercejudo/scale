/*jshint node:true */

'use strict';

var arbitraryPrecision = require('rescale-arbitrary-precision');

var decimal = arbitraryPrecision.load();

exports.scale = function scaleNormalised(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
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
