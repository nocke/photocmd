// import what is not covered by babel runtime
import array from 'core-js/fn/array';

import assert from 'assert';
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from './log';

import {
	FileSet,
	Family,
	Member
} from './model';


// -----------------------------
function deleteAction(firstDir, moreDirs, cmd) { // TODO: refactor → deleteLonely
	log('Delete Action ===============');

	let liveMode = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	if (verboseMode) setLevel(LEVELS.INFO);

	let lonely = cmd.lonely || false;
	let unstarred = cmd.unstarred || false;

	// merge all dirs together
	let dirs = [firstDir, ...moreDirs];
	enforce(!!dirs, 'no directory specified');

	let fileSet = new FileSet(dirs);
	
	// TODO: force lonely only   or   starred ony   or  …else…

	log('Get Lonely ===============');
	let loneFiles = fileSet.getLonely();
	//loneFiles.dump();
	loneFiles.delete(liveMode);

	// fileSet.dump( fileSet.getLonely() );
	// fileSet.dump( fileSet.getUnstarred() );

	log('deleteAction End.');
}

export default deleteAction;
