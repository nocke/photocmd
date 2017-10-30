// import "babel-polyfill"; // https://babeljs.io/docs/usage/polyfill/
// needed?  –  require('babel-core/register');

// TODO: name this testtools.js

// needed for all testing
import chai, { assert } from 'chai';
import path from 'path';
import fs from 'fs';
import array from 'core-js/fn/array';
import { logLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/log';

// same basic test config
export const testconfig = {
	testDir: './build/fileTests',
	test: '1'
};

// helper functions for testing -------------------------

/**
 * creates a number of mockfiles (just tiny text content)
 */
export const mockfile = async(basedir, files) => {

	// TODO: assert wäre hier besser!
	enforce(typeof basedir === 'string', 'baseDir must be string');
	enforce(Array.isArray(files), 'Files must be array')

	files.forEach(file => {
		const filepath = path.join(basedir, file);
		// info('creating: ' + filepath);
		fs.writeFileSync(filepath, 'mock content');
	});

}

export const assertFiles = async(basedir, fileObj) => {

	Object.keys(fileObj).forEach((file) => {
		const filepath = path.join(basedir, file);
		assert(
			fs.existsSync(filepath) == fileObj[file],
			`${filepath} expected to be ${fs.existsSync(filepath) ? 'missing' : 'present'}`
		);
		log(`found ${filepath}   ${fileObj[file]} ✓`);
	});

}


export default {
	testconfig,
	mockfile
};
