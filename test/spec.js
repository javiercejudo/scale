/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision')
var bigjsAdapter = require('bigjs-adapter')
var floatingAdapter = require('floating-adapter');
var scaleFactory = require('../src/scale');

describe('scaling', function() {
  describe('without a scale', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var scale = scaleFactory(floatingAdapter).scale;

    it('should be the identity', function() {
      scale(42).should.be.exactly(42);
      scale(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    describe('should support', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var scale = scaleFactory(Decimal).scale;

      it('native numbers', function() {
        scale(-2/3, [0, -9]).val().val().should.be.exactly(6);
      });

      it('as well as Decimal numbers', function() {
        scale(new Decimal('-2').div(new Decimal('3')), [0, -9]).val().val()
          .should.be.exactly(6);
      });
    });

    describe('when arbitrary precision is available', function() {
      var Decimal = arbitraryPrecision(bigjsAdapter);

      Decimal.setPrecision(51);

      var scale = scaleFactory(Decimal).scale;

      it('should work with arbitrary precision', function() {
        scale(0.5, [0.1, 0.5]).val().eq(new Decimal('0.3')).should.be.exactly(true);
        scale(-0.25, [-3, 5]).val().eq(new Decimal('-5')).should.be.exactly(true);

        scale(new Decimal('-2').div(new Decimal('3')), [0, -9]).val().toFixed(50)
          .should.be.exactly(new Decimal('6').val().toFixed(50));
      });
    });

    describe('when arbitrary precision is unavailable', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var scale = scaleFactory(Decimal).scale;

      it('should work with floating-point numbers', function() {
        scale(0.5, [0.1, 0.5]).val().val().should.be.exactly(0.30000000000000004);
        scale(-0.25, [-3, 5]).val().val().should.be.exactly(-5);
        scale(-2/3, [0, -9]).val().val().should.be.exactly(6);
      });
    });
  });
});
