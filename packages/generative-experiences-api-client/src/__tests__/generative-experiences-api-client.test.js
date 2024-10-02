'use strict';

const generativeExperiencesApiClient = require('..');
const assert = require('assert').strict;

assert.strictEqual(generativeExperiencesApiClient(), 'Hello from generativeExperiencesApiClient');
console.info('generativeExperiencesApiClient tests passed');
