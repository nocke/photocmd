'use strict'

/**
 * testing whole command from command line
 *
 * - first simulation
 * - then actual deleting (real multi-MB files used)
 *
 * use  `node ./build/index.js ...`   for testing,
 * NOT some fancy  `photo ...` – might not test current branch,
 * but some 'stable' alias, etc...
 *
 */

import chai, { assert } from 'chai'
import path from 'path'
import sinon from 'sinon'
import fs from 'fs-extra'
import extract from 'extract-zip'

import { recreateDirectory, mockfile, assertFiles } from './_testtools'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/util/log'

import { execSync } from 'child_process'

// the command to use (build output – UNLIKE most other tests(!))
const photoCmd = `${global.app.dirs.cli}/index.js`

// local and abs path for testing
const sampleFilesOrig = path.resolve( global.app.root, 'node_modules/photocmd-testfiles/sample2' )
const testDirAbs = path.resolve( global.app.dirs.test, 'commandTests' )
const testDirLocal = global.app.dirs.testLocal + path.sep + 'commandTests'


describe( 'real command-line: Delete', function() {

	// for entire describe - live execution requires 3sec wait and a bit of execution
	this.slow( 5000 ) // yes, 2200 oder 3200 can at times not be enough (works in .only() but not on entire single test or full suite )

	before( () => {
		// sanity self-test with node version ≥ 8
		// https://stackoverflow.com/a/28394895
		const result = execSync( 'node -v' ).toString()
		assert.match( result, /^v(8|9|1\d)+\.\d+\.\d+\s?$/, 'valid node version, ≥ 8' )
	} )

	beforeEach( async () => {
		await recreateDirectory( testDirAbs )
		enforce(fs.existsSync( photoCmd ), "cli binary missing. not build?")
		await fs.copy(sampleFilesOrig, path.resolve(testDirAbs, 'sample2' ))

		enforce( fs.existsSync( path.join( testDirAbs, 'sample2', 'IMG_2586.JPG' ) ), 'no such image 1' )
		enforce( fs.existsSync( path.join( testDirAbs, 'sample2', 'PM5A2847.jPg' ) ), 'no such image 2' )
	} )

	it( 'command on empty folder', () => {

		// (anything but returncode 0 triggers an error,)
		const result = execSync(
			`node ${photoCmd} delete ${testDirLocal} -v`, { cwd: global.app.root }
		).toString()

		assert.match( result, /succesfully/ )
	} )

	it( 'command on nonexisting folder', () => {

		assert.throws( () => execSync(
			`node ${photoCmd} delete nonexistingFolder -v`, { cwd: global.app.root }
		) )

	} )

	it( 'preview and live', async () => {
		// dry run ( not live, no countDown that would time out)
		const result = execSync(
			`node ${photoCmd} delete ${testDirLocal}/sample2`, { cwd: global.app.root }
		).toString()

		// verify stats
		assert.match( result, /familiesTotal.*\D11/, 'regexp1 matches' );
		assert.match( result, /familiesToDelete.*\D5/, 'regexp2 matches' );
		assert.match( result, /familiesDeleted.*\D5/, 'regexp3 matches' );
		assert.match( result, /filesTotal.*\D14/, 'regexp4 matches' );
		assert.match( result, /filesDeleted.*\D6/, 'regexp5 matches' );

		// live - doing it! _________________________________________
		const result2 = execSync(
			`node ${photoCmd} delete ${testDirLocal}/sample2 -l --skipCountdown`, { cwd: global.app.root }
		).toString()

		// verify very same stats!
		assert.match( result2, /familiesTotal.*\D11/, 'regexp matches' );
		assert.match( result2, /familiesToDelete.*\D5/, 'regexp matches' );
		assert.match( result2, /familiesDeleted.*\D5/, 'regexp matches' );
		assert.match( result2, /filesTotal.*\D14/, 'regexp matches' );
		assert.match( result2, /filesDeleted.*\D6/, 'regexp matches' );

		await assertFiles(
			path.join( testDirAbs, 'sample2' ), {
				'a-single-jpeg.jpg': true,
				'DSCN7029.CR2': false,
				'IMG_2586.JPG': true,
				'IMGSX9999.xmp': false,
				'NotLonely.CR2': true,
				'NotLonely.JPG': true,
				'PM5A1690.CR2': true,
				'PM5A1690_DXOl.jpg': true,
				'PM5A2087.cr2': false,
				'PM5A2087.cr2.dop': false,
				'PM5A2847.jPg': true,
				'PM5A29999.cr2.dop': false,
				'PM5A3095_lonely.CR2': false
			}
		)

		// TODO aftermath – assert for reduced number of families and zero deletes
		const result3 = execSync(
			`node ${photoCmd} delete ${testDirLocal}/sample2 -l --skipCountdown`, { cwd: global.app.root }
		).toString()

		assert.match( result3, /familiesTotal.*\D6/, 'regexp matches' );
		assert.match( result3, /familiesToDelete.*\D0/, 'regexp matches' );
		assert.match( result3, /familiesDeleted.*\D0/, 'regexp matches' );
		assert.match( result3, /filesTotal.*\D8/, 'regexp matches' );
		assert.match( result3, /filesDeleted.*\D0/, 'regexp matches' );

	} ).timeout(4000); // uncached osx travis test might take a while – https://stackoverflow.com/a/15982893/444255

} )
