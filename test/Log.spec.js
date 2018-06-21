'use strict'

import chai, { assert } from 'chai';
import sinon from 'sinon';

// system under test:
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/log';

// test config
setLevel(LEVELS.INFO);


//const testString =
const testString = 'Ja öäü daß - – 一 \ / <div/> ${hans} Jürgen'
const testObject = {
	truth: 42,
	yes: true,
	str: testString
	// sub: TODO
}

let logSpy

describe('pretest', () => {

	it('pretest it', () => {
		log('Log')
		warn('Warn')
	});

}); // describe

describe('testing log', () => {

	beforeEach(function() {
		logSpy = sinon.spy(console, 'log');
	});

	afterEach(function() {
		console.log.restore();
	});

	it('simple log', () => {
		// works !!  console.log(testString)
		log(testString)

		sinon.assert.calledOnce(console.log)
		// log always gets colored green, thus.
		sinon.assert.calledWith(logSpy, "\x1b[1;32m" + testString + "\x1b[0m")
	});

	it('logging an object', () => {
		// works !!  console.log(testString)
		log(testObject)

		sinon.assert.calledOnce(console.log)
		sinon.assert.calledWith(logSpy, "\x1b[1;32m" + '{"truth":42,"yes":true,"str":"Ja öäü daß - – 一  / <div/> ${hans} Jürgen"}' + "\x1b[0m")
	});


}); // describe
