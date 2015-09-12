/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision')
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var scaleFactory = require('../src/scale');

describe('scaling', function() {
  describe('with valid scales', function() {
    describe('should support', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var scale = scaleFactory(Decimal).scale;

      it('native numbers', function() {
        scale([0, -9], -2/3).equals(new Decimal('6')).should.be.exactly(true);
      });

      it('as well as Decimal numbers', function() {
        scale([0, -9], new Decimal('-2').div(new Decimal('3'))).equals(new Decimal('6'))
          .should.be.exactly(true);
      });
    });

    describe('when arbitrary precision is available', function() {
      var Decimal = arbitraryPrecision(bigjsAdapter);

      Decimal.setPrecision(51);

      var scale = scaleFactory(Decimal).scale;

      it('should work with arbitrary precision', function() {
        scale([0.1, 0.5], 0.5).equals(new Decimal('0.3')).should.be.exactly(true);
        scale([-3, 5], -0.25).equals(new Decimal('-5')).should.be.exactly(true);

        scale([0, -9], new Decimal('-2').div(new Decimal('3'))).val().toFixed(50)
          .should.be.exactly(new Decimal('6').val().toFixed(50));
      });
    });

    describe('when arbitrary precision is unavailable', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var scale = scaleFactory(Decimal).scale;

      it('should work with floating-point numbers', function() {
        scale([0.1, 0.5], 0.5).equals(new Decimal('0.30000000000000004')).should.be.exactly(true);
        scale([-3, 5], -0.25).equals(new Decimal('-5')).should.be.exactly(true);
        scale([0, -9], -2/3).equals(new Decimal('6')).should.be.exactly(true);
      });
    });
  });
});
