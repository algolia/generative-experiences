'use strict';

const playground = require('..');
const assert = require('assert').strict;

assert.strictEqual(playground(), 'Hello from playground');
console.info('playground tests passed');
