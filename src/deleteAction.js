
// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';
import {enforce, fail} from './helpers';

import {FileSet, Family, Member} from './model';

// ----------------------------

/**
 * parses array of directories
 *
 * returns Array of Families
 */
function parseDirs(dirs) {

	let fileSet = new FileSet(dirs);

}

// -----------------------------

function deleteAction( firstDir, moreDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	// simply merge all dirs, treat each one seperately
	let dirs = [firstDir, ...moreDirs];
	enforce(!!dirs,'no directory');

	parseDirs(dirs);
}

export default deleteAction;
