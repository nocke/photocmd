// import "babel-polyfill"; // https://babeljs.io/docs/usage/polyfill/
// needed?  –  require('babel-core/register');

// TODO: name this testtools.js

// needed for all testing
import path from 'path';
import fs from 'fs';
import array from 'core-js/fn/array';

// same basic test config
export const config = {
	testDir: './build/fileTests',
	test: '1'
};

// helper functions for testing -------------------------

/**
 * creates a number of mockfiles (just tiny text content)
 */
export const mockfile = async (...files) => {

	files.forEach(v => {
		fs.writeFileSync(v, 'mock content');
	});

}


export default {
	config,
	mockfile
};
