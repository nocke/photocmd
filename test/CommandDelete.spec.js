'use strict'

/**
 * testing whole command from command line
 *
 * - first simulation
 * - then actual deleting (real multi-MB files used)
 */

import chai, { assert } from 'chai'
import path from 'path'
import sinon from 'sinon'
import fs from 'fs'

import extract from 'extract-zip'

import { recreateDirectory, mockfile, assertFiles, testconfig } from './_testtools'
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

			if (err) {
				if (err instanceof Error)
					warn(err.name + ' *** : ' + err.message)
				else
					warn('a DIFFERENT error?')
				reject(err)
			} else {
				resolve('done')
			}
		})
		// this line reached in both cases
	})
}


describe('ActionDeletion', () => {

	beforeEach(async () => {
		await recreateDirectory(testDir)
	})


	it('preview and real delete from command line', async () => {

		await extractSample()

		enforce(fs.existsSync(path.join(testDir, 'IMG_0634.JPG')))
		enforce(fs.existsSync(path.join(testDir, 'PM5A3095.CR2')))

		// NEXT:
		// system call (or truly top-level "./build/index.js" ?)


	})

})

