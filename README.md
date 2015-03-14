# scale

[![Build Status](https://travis-ci.org/javiercejudo/scale.svg)](https://travis-ci.org/javiercejudo/scale)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/scale/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/scale?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/scale/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/scale)

Scale normalised data

## Install

    npm i scale-normalised

## Usage

```js
var scale = require('scale-normalised').scale;

scale(.5, [2, 4]); // => 3
scale(-.25, [-3, 5]); // => returns -5

scale(Math.E); // => Math.E

scale(-3, 'invalid scale'); // => RescaleError
```

See [spec](test/spec.js).
