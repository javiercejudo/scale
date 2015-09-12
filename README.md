# scale

[![Build Status](https://travis-ci.org/javiercejudo/scale.svg)](https://travis-ci.org/javiercejudo/scale)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/scale/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/scale?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/scale/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/scale)

Scale normalised data

## Install

    npm i scale-normalised

## Usage

```js
var Decimal = require('linear-arbitrary-precision')(require('floating-adapter'));
var scale = require('scale-normalised')(Decimal).scale;

scale([2, 4], .5); // => Decimal 3
scale([-3, 5], -.25); // => Decimal -5
```

See [spec](test/spec.js).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
- [rescale-util](https://github.com/javiercejudo/rescale-util): rescale utilities.
