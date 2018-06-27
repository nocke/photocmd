// import "babel-polyfill" // https://babeljs.io/docs/usage/polyfill/
// needed?  –  require('babel-core/register')

// TODO: name this testtools.js

// needed for all testing
import chai, { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import array from 'core-js/fn/array'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/log'

// set here, unless already set elsewhere
global.app = global.app || {} // I rather open my own subspace
global.app.root = global.app.root || path.resolve(__dirname, '..')

// same basic test config
export const testconfig = {
	testDir: path.resolve(global.app.root, 'build/actionTests'),
	testCommandDir: path.resolve(global.app.root, 'build/commandTests'),
	test: '1'
}

import helpers from '../src/helpers'

// helper functions for testing -------------------------


export const recreateDirectory = async (dirName) => {

		// ensured fully fresh testDir creation
		await helpers.removeFolder(dirName)
		assert.isFalse(fs.existsSync(dirName))
		fs.mkdirSync(dirName)
		assert.isTrue(fs.existsSync(dirName))
}


/**
 * creates a number of mockfiles (just tiny text content)
 */
export const mockfile = async (basedir, files) => {

	// TODO: assert wäre hier besser!
	enforce(typeof basedir === 'string', 'baseDir must be string')
	enforce(Array.isArray(files), 'Files must be array')

	files.forEach(file => {
		const filepath = path.join(basedir, file)
		fs.writeFileSync(filepath, 'mock content')
	})

}

export const assertFiles = async (basedir, fileObj) => {
	let numErrors = 0

	Object.keys(fileObj).forEach((file) => {
		const filepath = path.join(basedir, file)
		if (fs.existsSync(filepath) != fileObj[file]) {
			warn(`${filepath} expected to be ${fs.existsSync(filepath) ? 'missing' : 'present'}`)
			numErrors++
		}
	})

	assert(numErrors === 0, `found ${numErrors} missing/surplus files`)
}


export default {
	testconfig,
	mockfile
}
