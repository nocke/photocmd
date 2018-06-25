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

	const source = path.resolve(app.root, 'sample1.zip')
	const target = path.resolve(testDir)

	return new Promise((resolve, reject) => {

		extract(source, { dir: target }, (err) => {

			log('err:')
			warn(err)
			// 	warn('is there an error?')
			// 	return reject(err)
			reject(err)

		})
		log('unreachable?')
		resolve('done')
	})

}

it('preview and real delete from command line', async () => {

	const x = await extractSample()
	log('test 1 done')

})
