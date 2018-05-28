'use strict'

/**
 * testing whole command from command line
 *
 * - first simulation
 * - then actual deleting (large files used)
 *
 */

import chai, { assert } from 'chai'
import path from 'path'
import sinon from 'sinon'
import fs from 'fs'

import extract from 'extract-zip'

import { mockfile, assertFiles, testconfig } from './_testtools'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/log'

// test config
setLevel(LEVELS.INFO)
const testDir = testconfig.testCommandDir

// system under test:
import helpers from '../src/helpers'


const extractSample = () => {

	// extract('sample'
	console.log( path.resolve(app.root,'sample1.zip'))

}

beforeEach(async () => {
	// ensured fully fresh testDir creation
	await helpers.removeFolder(testDir)
	assert.isFalse(fs.existsSync(testDir))
	fs.mkdirSync(testDir)
	assert.isTrue(fs.existsSync(testDir))
})

it('preview and real Delete', async () => {

	console.log('test 1')

	extractSample()
	// npm run test-single -- test/CommandDelete.spec.js

	

})
