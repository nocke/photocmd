
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

	Family.parse(dirs);

	console.log('parseDirs -------------------------');

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
