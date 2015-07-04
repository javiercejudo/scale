/*jshint node:true, mocha:true */

'use strict';

var decimalDep = process.env.DECIMAL ? process.env.DECIMAL : 'big.js';

var should = require('should');
var sinon = require('sinon');
var Decimal = require(decimalDep);
var arbitraryPrecision = require('rescale-arbitrary-precision');
var scale = require('../src/scale').scale;

describe('scaling', function() {
  describe('without a scale', function() {
    it('should be the identity', function() {
      scale(42).should.be.exactly(42);
      scale(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    describe('when ' + decimalDep + ' is available', function() {
      var hasArbitraryPrecisionStub;

      beforeEach(function() {
        hasArbitraryPrecisionStub = sinon.stub(arbitraryPrecision, 'isAvailable');
        hasArbitraryPrecisionStub.returns(true);
      });

      afterEach(function() {
        hasArbitraryPrecisionStub.restore();
      });

      it('should work with arbitrary precision', function() {
        scale(0.5, [0.1, 0.5]).should.be.exactly(0.3);
        scale(-0.25, [-3, 5]).should.be.exactly(-5);
        scale(new Decimal(-2).div(3), [0, -9]).should.be.exactly(6);
      });
    });

    describe('when ' + decimalDep + ' is unavailable', function() {
      var hasArbitraryPrecisionStub;

      beforeEach(function() {
        hasArbitraryPrecisionStub = sinon.stub(arbitraryPrecision, 'isAvailable');
        hasArbitraryPrecisionStub.returns(false);
      });

      afterEach(function() {
        hasArbitraryPrecisionStub.restore();
      });

      it('should work with floating-point numbers', function() {
        scale(0.5, [0.1, 0.5]).should.be.exactly(0.30000000000000004);
        scale(-0.25, [-3, 5]).should.be.exactly(-5);
        scale(-2/3, [0, -9]).should.be.exactly(6);
      });
    });
  });
});
