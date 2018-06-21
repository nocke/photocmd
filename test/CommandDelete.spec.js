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


	// extract(source, {dir: dest}, function (err, results) {
	// 	if (err) {
	// 	  console.error('error!', err)
	// 	  process.exit(1)
	// 	} else {
	// 	  process.exit(0)
	// 	}
	//   })


	const source = path.resolve(app.root, 'sample1_ABCD.zip')
	const target = path.resolve(testDir)

	log(source)
	log(target)

	return new Promise((resolve, reject) => {

		resolve('foo bar doo')
		
		// extract(source, { dir: target }, (err) => {
		// 	warn('is there an error?')
		// 	return reject(err)
		// })
		// warn('log: unzip worked')
		// resolve('res: unzip worked')


	})

}

// beforeEach(async () => {
// 	// ensured fully fresh testDir creation
// 	await helpers.removeFolder(testDir)
// 	assert.isFalse(fs.existsSync(testDir))
// 	fs.mkdirSync(testDir)
// 	assert.isTrue(fs.existsSync(testDir))

// 	log('beforeeach happend')
// })

it('preview and real delete from command line', async () => {

	log('test 1')

	extractSample()
	// npm run test-single -- test/CommandDelete.spec.js

	const x = await extractSample
	log(x)
	log('test 1 done')
})

// seufz, erstmal wieder Promises schnallen
it('promise selftest', async () => {

	log('Ja')


})


