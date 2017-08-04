
// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';
import {enforce} from './utils';

import fs from 'fs';
import path from 'path';

import Family from './model/Family.js';
import config from '../config';

// ----------------------------

/**
 * parses array of directories
 *
 * returns Array of Families
 */
function parseDirs(dirs) {

	dirs.forEach(function (dir) {

		enforce( fs.existsSync(dir), `no directory or file ${dir}`);

		let stats = fs.statSync( dir );
		enforce( stats.isDirectory(), 'single File – not handled yet');

		let files = fs.readdirSync( dir );

		// parsing an individual dir:
		files.filter( (filepath) => {

			const p = path.parse( filepath );

			// remove leading dot (hidden files)
			if (p.ext[0]==='.')
				p.ext = p.ext.substr(1);

			console.log("dir "+p.dir+ "name "+p.name+ "  p.ext: "+p.ext );

			return config.extensions.includes(p.ext.toLowerCase() );
		})
		.map( (file) =>
				console.log(file)
		);

	});

}

// -----------------------------

function deleteAction( firstDir, moreDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	// simply merge all dirs, treat each one seperately
	// TODO move to caller
	let dirs = [firstDir, ...moreDirs];

	if (!dirs)
		throw new Error('no directory');

	parseDirs(dirs);
}

export default deleteAction;
