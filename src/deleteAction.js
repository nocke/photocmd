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
	log('Delete Action ===============');

	let liveMode = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	if (verboseMode) logLevel(LEVELS.INFO);

	let lonely = cmd.lonely || false;
	let unstarred = cmd.unstarred || false;

	// merge all dirs together
	// COULDDO: support wildcards, too.
	let dirs = [firstDir, ...moreDirs];
	enforce(!!dirs, 'no directory specified');

	
	let fileSet = new FileSet(dirs);


	log('Get Lonely ===============');
	let loneFiles = fileSet.getLonely();
	loneFiles.dump();
	loneFiles.delete(liveMode);

	// fileSet.dump( fileSet.getLonely() );
	// fileSet.dump( fileSet.getUnstarred() );


	log('deleteAction End.');
}

export default deleteAction;
