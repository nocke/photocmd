
import assert from 'assert';

import fs from 'fs';
import path from 'path';

import Family from './model/Family.js';
import config from '../config';


function deleteAction( firstDir, moreDirs, cmd ) {

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

		fs.readdir( dir, (err,files) => {
			files.forEach( (file) =>
				console.log(file)
			);
		});

	});

} // deleteAction

// OLD: module.exports = deleteAction;
export default deleteAction;
