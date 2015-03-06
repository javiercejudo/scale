/*jshint node:true, mocha:true */

'use strict';

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

  describe('with a scale', function() {
    var rescaleUtilMock;

    afterEach(function () {
      rescaleUtilMock.verify();
    });

    it('should delegate its validation to rescale-util', function() {
      rescaleUtilMock = sinon.mock(rescaleUtil);

      rescaleUtilMock.expects('isValidScale')
        .withExactArgs([0, 5]).returns(true);

      rescaleUtilMock.expects('isValidScale')
        .withExactArgs([-5, 1]).returns(true);

      scale(2.5, [0, 5]);
      scale(-3, [-5, 1]);
    });
  });

  describe('with valid scales', function() {
    var isValidScaleStub;

    beforeEach(function() {
      isValidScaleStub = sinon.stub(rescaleUtil, 'isValidScale');
      isValidScaleStub.returns(true);
    });

    afterEach(function() {
      isValidScaleStub.restore();
    });

    it('should scale normalised data', function() {
      scale(0.5, [2, 4]).should.be.exactly(3);
      scale(-0.25, [-3, 5]).should.be.exactly(-5);
    });
  });

  describe('with invalid scales', function() {
    var isValidScaleStub, getLastErrorStub;

    beforeEach(function() {
      isValidScaleStub = sinon.stub(rescaleUtil, 'isValidScale');
      getLastErrorStub = sinon.stub(rescaleUtil, 'getLastError');

      isValidScaleStub.returns(false);
      getLastErrorStub.returns('an error');
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
