var should = require('should');
var scale = require('../src/scale.js');

describe('scale', function() {
  it('should scale normalised data', function() {
    scale(.5, [2, 4]).should.be.exactly(3);
    scale(-.25, [-3, 5]).should.be.exactly(-5);
  });
});
