
// import what is not covered by babel runtime
import array from 'core-js/fn/array';

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
			// TODO testing
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
		.filter( (filepath) => {

			const p = path.parse( filepath );
			// remove leading dot
			if (p.ext[0]==='.')
				p.ext = p.ext.substr(1);

			// console.log("dir "+p.dir+ "name "+p.name+ "  p.ext: "+p.ext );
			return config.extensions.includes(p.ext.toLowerCase() );
		})
		.map( (file) =>
				console.log(file)
		);

	});

} // deleteAction

// OLD: module.exports = deleteAction;
export default deleteAction;
