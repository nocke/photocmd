
// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';

import fs from 'fs';
import path from 'path';

import Family from './model/Family.js';
import config from '../config';



function deleteAction( firstDir, moreDirs, cmd ) {

	// // Array test:
	var a = [1, 2, 3];
	console.log( a.includes(2) ); // true
	console.log( a.includes(4) ); // false

	// Set Test:
	var mySet = new Set();
	mySet.add(1); // Set { 1 }
	mySet.add(5); // Set { 1, 5 }
	console.log(mySet);
	console.log(123);
	return 123456789;




	// var f = new Family();
	// var g = new Family(['a','b']);

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	// simply merge all dirs, treat each one seperately
	let dirs = [firstDir, ...moreDirs];

	if (!dirs)
		throw new Error('no directory');

	dirs.forEach(function (dir) {

		if ( !fs.existsSync(dir) ) {
			console.error('no directory or file %s -------------', dir);
			return;
		}

		let stats = fs.statSync( dir );
		if ( !stats.isDirectory()) {
			console.error('single File – not handled yet ------------');
			return;
		}

		let files = fs.readdirSync( dir );

		// geht: console.dir( config.extensions );

		files
		.filter( (file) => {
			// TOOD filter out extension

			return true; // NEXT config.extensions.includes('jpg');
		})
		.map( (file) =>
				console.log(file)
		);


	});

} // deleteAction

// OLD: module.exports = deleteAction;
export default deleteAction;
