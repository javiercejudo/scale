# scale

[![Build Status](https://travis-ci.org/javiercejudo/scale.svg)](https://travis-ci.org/javiercejudo/scale)

Scale normalised data

## Install

    npm i scale-normalised

## Usage

```js
var scale = require('scale-normalised').scale;

scale(.5, [2, 4]); // => 3
scale(-.25, [-3, 5]); // => returns -5

scale(Math.E); // => Math.E

scale(-3, 'invalid scale'); // => Error
```

See [spec](test/spec.js).
