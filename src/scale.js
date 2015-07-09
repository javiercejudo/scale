/*jshint node:true */

'use strict';

var arbitraryPrecision = require('linear-arbitrary-precision');
var isUndefined = require('lodash.isundefined');

module.exports = function factory(adapter) {
  var Decimal = arbitraryPrecision(adapter);
  var api = {};

  api.scale = function scaleNormalised(x, scale) {
    if (isUndefined(scale)) {
      return x;
    }

    var scale0 = new Decimal(scale[0].toString());

    return Number(
      new Decimal(scale[1].toString()).minus(scale0)
        .times(new Decimal(x.toString())).plus(scale0)
    );
  };

  return api;
}
