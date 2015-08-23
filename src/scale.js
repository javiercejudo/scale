/*jshint node:true */

'use strict';

var isUndefined = require('lodash.isundefined');

module.exports = function factory(Decimal) {
  var api = {};

  api.scale = function scaleNormalised(x, scale) {
    scale = scale || [0, 1];

    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(scale[1].toString()).minus(scale0)
      .times(new Decimal(x.toString())).plus(scale0);
  };

  return api;
};
