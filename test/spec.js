var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('rescale-util');
var scale = require('../src/scale.js').scale;

describe('scaling', function() {
  describe('without a scale', function() {
    it('should be the identity', function() {
      scale(1).should.be.exactly(1);
      scale(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    beforeEach(function() {
      sinon.stub(rescaleUtil, 'isValidScale').returns(true);
    });

    afterEach(function() {
      rescaleUtil.isValidScale.restore();
    });

    it('should scale normalised data', function() {
      scale(.5, [2, 4]).should.be.exactly(3);
      scale(-.25, [-3, 5]).should.be.exactly(-5);
    });
  });

  describe('with invalid scales', function() {
    beforeEach(function() {
      sinon.stub(rescaleUtil, 'isValidScale').returns(false);
      sinon.stub(rescaleUtil, 'getLastError').returns('an error');
    });

    afterEach(function() {
      rescaleUtil.isValidScale.restore();
      rescaleUtil.getLastError.restore();
    });

    it('should throw an error', function() {
      (function() {
        scale(2, 2);
      }).should.throw('an error');
    });
  });
});
