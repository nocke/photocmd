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

	// for entire describe - live execution requires 3sec wait and a bit of execution
	this.slow(2000)

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

	it('preview and live', async () => {

		await extractSample('sample2.zip', path.resolve(testDirAbs))
		// sanity on sample2
		enforce(fs.existsSync(path.join(testDirAbs, 'sample2', 'IMG_2586.JPG')))
		enforce(fs.existsSync(path.join(testDirAbs, 'sample2', 'PM5A2847.jPg')))

		// dry run
		const result =  execSync(
			`node ./build/index.js delete ${testDirLocal}/sample2`,
			{ cwd: global.app.root }
 		).toString()

		// verify stats
		assert.match(result, /familiesTotal.*\D11/, 'regexp matches');
		assert.match(result, /familiesToDelete.*\D5/, 'regexp matches');
		assert.match(result, /familiesDeleted.*\D5/, 'regexp matches');
		assert.match(result, /filesTotal.*\D14/, 'regexp matches');
		assert.match(result, /filesDeleted.*\D6/, 'regexp matches');

		// // can't do it, unless we have a  TODO skipCountdown, since test takes too long
		// // live - doing it!
		// // dry run
		// const result2 =  execSync(
		// 	`node ./build/index.js delete ${testDirLocal}/sample2 -l`,
		// 	{ cwd: global.app.root }
 		// ).toString()

		// warn(result2)

	})


})

