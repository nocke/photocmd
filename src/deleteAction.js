// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';

import { logLevel, LEVELS, info, log, warn, error, enforce, fail } from './log';

import {
	FileSet,
	Family,
	Member
} from './model';


// -----------------------------

function deleteAction(firstDir, moreDirs, cmd) {
	let liveMode = cmd.live || false;
	let verboseMode = cmd.verbose || false;
	
	if (verboseMode) logLevel(LEVELS.INFO);
	
	let lonely = cmd.lonely || false;
	let unstarred = cmd.unstarred || false;
	
	log('Delete Action ===============');
	


	// simply merge all dirs together
	// COULDDO: support wildcards, too.
	let dirs = [firstDir, ...moreDirs];
	enforce(!!dirs, 'no directory');

	let fileSet = new FileSet(dirs);


	let loneFiles = fileSet.getLonely();

	loneFiles.dump();
	loneFiles.delete(liveMode);

	// fileSet.dump( fileSet.getLonely() );
	// fileSet.dump( fileSet.getUnstarred() );


	log('deleteAction End.');
}

export default deleteAction;
