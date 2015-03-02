var should = require('should');
var rescale = require('../src/scale.js');

describe('scale', function() {
  it('should scale normalised data', function() {
    rescale(.5, [2, 4]).should.be.exactly(3);
    rescale(-.25, [-3, 5]).should.be.exactly(-5);
  });
});
