
// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';
import {enforce, fail} from './helpers';

import {FileSet, Family, Member} from './model';


// -----------------------------

function deleteAction( firstDir, moreDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	// simply merge all dirs, treat each one seperately
	let dirs = [firstDir, ...moreDirs];
	enforce(!!dirs,'no directory');

	let fileSet = new FileSet(dirs);

	console.log('deleteAction End.');
}

export default deleteAction;
