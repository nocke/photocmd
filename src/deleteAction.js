// import what is not covered by babel runtime
import array from 'core-js/fn/array'

import assert from 'assert'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from './log'

import {
	FileSet,
	Family,
	Member
} from './model'


// ↓ extremely important ________________________
async function deleteAction(firstDir, moreDirs, cmd) { // TODO: refactor → deleteLonely
	log('Delete Action ************************')

	// const liveMode = cmd.live || false
	// const verboseMode = cmd.verbose || false
	// if (verboseMode) setLevel(LEVELS.INFO)

	// let lonely = cmd.lonely || false
	// let unstarred = cmd.unstarred || false

	// // merge all dirs together
	// let dirs = [firstDir, ...moreDirs]
	// enforce(!!dirs, 'no directory specified')

	// // TODO: force lonely only   or   starred only   or  …else…

	// const fileSet = new FileSet(dirs)
	// fileSet.dump()


	// const loneFiles = fileSet.getLonely()
	// await loneFiles.delete(liveMode)
}


export default deleteAction
