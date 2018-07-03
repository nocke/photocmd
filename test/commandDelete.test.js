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

// local and abs path for testing
const testDirLocal = 'build/commandTests'
const testDirAbs = path.resolve(global.app.root, testDirLocal)


const extractSample = (zipfile, dir) => {
	enforce( dir && typeof dir === 'string', 'invalid directory param')
	const source = path.resolve(app.root, zipfile)

	return new Promise((resolve, reject) => {

		extract(source, { dir }, (err) => {

			if (err) {
				if (err instanceof Error)
					warn(err.name + ' *** : ' + err.message)
				else
					warn('a DIFFERENT error?')
	const target = path.resolve(dir)
				reject(err)
			} else {
				resolve('done')
			}
		})
		// this line reached in both cases
	})
}


describe('real command-line: Delete', function () {

	// for entire describe
	this.slow(1000)

	before( () => {
		// sanity self-test with node version ≥ 8
		// https://stackoverflow.com/a/28394895
		const result = execSync('node -v').toString()
		assert.match( result, /^v(8|9|1\d)+\.\d+\.\d+\s?$/, 'valid node version, ≥ 8' )
	})

	beforeEach(async () => {
		await recreateDirectory(testDirAbs)
	})


	it('command on empty folder', () => {

		// (anything but returncode 0 triggers an error,)
		const result =  execSync(
			`photo delete ${testDirLocal} -v`,
			{ cwd: global.app.root }
		).toString()

		assert.match(result, /succesfully/)
	})

	it('command on nonexisting folder', () => {

		assert.throws( () => execSync(
			'photo delete nonexistingFolder -v',
			{ cwd: global.app.root }
		))

	})

	// it.only('preview from command line', async () => {

	// 	await extractSample(path.resolve(global.app.root, 'REF_sample1'))
	// })


	it('preview from command line', async () => {

		// now with images
		await extractSample('sample2.zip', path.resolve(testDirAbs))

		// sanity sample2 existence
		enforce(fs.existsSync(path.join(testDirAbs, 'sample2', 'IMG_2586.JPG')))
		enforce(fs.existsSync(path.join(testDirAbs, 'sample2', 'PM5A2847.jPg')))

		// avoid all linking matters
		const result =  execSync(
			`node ./build/index.js delete ${testDirLocal} -v`,
			{ cwd: global.app.root }
 		).toString()


		// photo delete build/commandTests/sample1 -v

		// dann output checking
		//

		log('')
		log(result)

	})

})

