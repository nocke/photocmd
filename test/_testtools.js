// import "babel-polyfill"; // https://babeljs.io/docs/usage/polyfill/
// needed?  –  require('babel-core/register');

// TODO: name this testtools.js

// needed for all testing
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
export const mockfile = async (basedir, files) => {

	enforce(typeof basedir==='string', 'baseDir must be string');
	enforce(Array.isArray(files),'Files must be array')

	files.forEach(file => {
		const filepath = path.join(basedir,file);
		console.log('creating: '+file);
		fs.writeFileSync(file, 'mock content');
	});

}


export default {
	testconfig,
	mockfile
};
