/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision')

var scaleFactory = require('../src/scale');
var bigjsAdapter = require('bigjs-adapter')
var floatingAdapter = require('floating-adapter');

describe('scaling', function() {
  describe('without a scale', function() {
    var scale = scaleFactory(floatingAdapter).scale;

    it('should be the identity', function() {
      scale(42).should.be.exactly(42);
      scale(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    describe('when arbitrary precision is available', function() {
      var scale = scaleFactory(bigjsAdapter).scale;
      var Decimal = arbitraryPrecision(bigjsAdapter);

      it('should work with arbitrary precision', function() {
        scale(0.5, [0.1, 0.5]).should.be.exactly(0.3);
        scale(-0.25, [-3, 5]).should.be.exactly(-5);
        scale(new Decimal('-2').div(new Decimal('3')), [0, -9]).should.be.exactly(6);
      });
    });

    describe('when arbitrary precision is unavailable', function() {
      var scale = scaleFactory(floatingAdapter).scale;

      it('should work with floating-point numbers', function() {
        scale(0.5, [0.1, 0.5]).should.be.exactly(0.30000000000000004);
        scale(-0.25, [-3, 5]).should.be.exactly(-5);
        scale(-2/3, [0, -9]).should.be.exactly(6);
      });
    });
  });
});
