
// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';
import {enforce, fail} from './helpers';

import {FileSet, Family, Member} from './model';


// -----------------------------

function deleteAction( firstDir, moreDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	// TODO verboseMode must set global state in some type of logger

	debugger;

	// simply merge all dirs together
	// COULDDO: support wildcards, too.
	let dirs = [firstDir, ...moreDirs];
	enforce(!!dirs,'no directory');

	let fileSet = new FileSet(dirs);

	fileSet.delete()
	console.log('deleteAction End.');
}

export default deleteAction;
