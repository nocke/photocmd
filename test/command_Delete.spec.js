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

import { execSync } from 'child_process'

// test config
setLevel(LEVELS.INFO)
const testDir = path.resolve(global.app.root, 'build/commandTests/sample1')


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


describe('command: Delete', function () {
	
	// for entire describe
	this.slow(900)

	before( () => {
		// sanity self-test with node version ≥ 8
		// https://stackoverflow.com/a/28394895
		const result = execSync('node -v').toString()
		assert.match( result, /^v(8|9|1\d)+\.\d+\.\d+\s?$/, 'valid node version, ≥ 8' )
	})

	beforeEach(async () => {
		await recreateDirectory(testDir)
	})


	it('preview and real delete from command line', async () => {


		await extractSample()

		enforce(fs.existsSync(path.join(testDir, 'IMG_0634.JPG')))
		enforce(fs.existsSync(path.join(testDir, 'PM5A3095.CR2')))

		// avoid all linking matters
		const cmd= 'node ./build/index.js delete ./build/commandTests/sample1'
		const result =  execSync(
			'node ./build/index.js delete ./build/commandTests/sample1 -v',
			{ cwd: global.app.root }
		).toString()

		// TODO  erstmal die nonexist-Fehler fixen
		// photo delete nonexist -v

		// dann proper testing..
		// photo delete build/commandTests/sample1 -v

		// dann unit testing
		//

		log('')
		log(result)

		// allerlei matching auf das result  → regexr.com

		//  allerlei file asserts ( Gruppen-Helper-Funktion )

	})

})

