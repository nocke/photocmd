
// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';
import {enforce, fail} from './helpers';

import {FileSet, Family, Member} from './model';


// -----------------------------

function deleteAction( firstDir, moreDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	let lonely      = cmd.lonely || false;
	let unstarred   = cmd.unstarred || false;

	// TODO verboseMode should set global state in some type of logger,
	// that is then used throughout...

	// simply merge all dirs together
	// COULDDO: support wildcards, too.
	let dirs = [firstDir, ...moreDirs];
	enforce(!!dirs,'no directory');

	let fileSet = new FileSet(dirs);


	let loneFiles =	fileSet.getLonely();

	loneFiles.dump();
	loneFiles.delete(liveMode);

	// fileSet.dump( fileSet.getLonely() );
	// fileSet.dump( fileSet.getUnstarred() );



	console.log('deleteAction End.');
}

export default deleteAction;
