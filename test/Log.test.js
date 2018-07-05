'use strict'

import chai, { assert } from 'chai'
import sinon from 'sinon'

// system under test:
import {log, setLevel, LEVELS, info, warn, error, enforce, fail, unmute, mute } from '../src/log'

const testString = 'Ja öäü daß - – 一 \ / <div/> ${hans} Jürgen'
const testObject = {
	truth: 42,
	yes: true,
	str: testString
	// sub: TODO
}

const suiteMode = process.env.npm_package_scripts_test_single === 'mocha $1'

let logSpy

describe('testing log', () => {

	beforeEach(function() {
		if( suiteMode )
		{
			unmute()   // only needed in this case
			// shut up:
			logSpy = sinon.stub(console, 'log').returns()
		} else {
			// be watched, but keep talking
			logSpy = sinon.spy(console, 'log')
		}
	})

	afterEach(function() {
		console.log.restore()

		if( suiteMode )
			mute()  // undo for the remainder of suite
	})

	it('simple log', () => {
		log(testString)
		sinon.assert.called(console.log)
		// log always gets colored green:
		sinon.assert.calledWith(logSpy, "\x1b[1;32m" + testString + "\x1b[0m")
	});

	it('logging an object', () => {
		// works !!  console.log(testString)
		log(testObject)

		sinon.assert.calledOnce(console.log)
		sinon.assert.calledWith(logSpy, "\x1b[1;32m" + '{"truth":42,"yes":true,"str":"Ja öäü daß - – 一  / <div/> ${hans} Jürgen"}' + "\x1b[0m")
	});

	it('multiple params - info', () => {
		setLevel(LEVELS.INFO)
		info('info vanilla string', testObject, `someValue: ${testString}`)

		sinon.assert.calledOnce(console.log)
		sinon.assert.calledWith(logSpy,
			"\x1b[1;34m"+
			"info vanilla string\n"+
			"{\"truth\":42,\"yes\":true,\"str\":\"Ja öäü daß - – 一  / <div/> ${hans} Jürgen\"}\n"+
			"someValue: Ja öäü daß - – 一 \ / <div/> ${hans} Jürgen"+
			"\x1b[0m"
		)
	})

	it('multiple params - warn (and testing logLevel', () => {
		setLevel(LEVELS.WARN) // must suffice (this is a test)
		warn('warn vanilla string', testObject, `someValue: ${testString}`)

		info('should not show, nor trigger console.log() call…')
		log('should not show, nor trigger console.log() call…')
		sinon.assert.calledOnce(console.log)

		sinon.assert.calledWith(logSpy,
			"\x1b[1;33m"+
			"warn vanilla string\n"+
			"{\"truth\":42,\"yes\":true,\"str\":\"Ja öäü daß - – 一  / <div/> ${hans} Jürgen\"}\n"+
			"someValue: Ja öäü daß - – 一 \ / <div/> ${hans} Jürgen"+
			"\x1b[0m"
		)
	})

}); // describe
