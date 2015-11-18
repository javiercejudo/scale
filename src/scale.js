/*jshint node:true */

'use strict';

var toDecimalFactory = require('to-decimal-arbitrary-precision');

module.exports = function factory(Decimal) {
  var toDecimal = toDecimalFactory(Decimal);
  var api = {};

  api.scale = function scaleNormalised(scale, x) {
    var scale0 = toDecimal(scale[0]);

    return toDecimal(scale[1]).minus(scale0)
      .times(toDecimal(x.toString())).plus(scale0);
  };

  return api;
};
