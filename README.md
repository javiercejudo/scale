# scale [![Build Status](https://travis-ci.org/javiercejudo/scale.svg)](https://travis-ci.org/javiercejudo/scale)

Scale normalised data

## Install

    npm install --save-dev scale-normalised

## Usage

```js
var scale = require('scale-normalised');

scale(.5, [2, 4]); // returns 3
scale(-.25, [-3, 5]); // returns -5
```
