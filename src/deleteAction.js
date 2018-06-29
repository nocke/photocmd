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

	const liveMode = cmd.live || false
	const verboseMode = cmd.verbose || false
	if (verboseMode) setLevel(LEVELS.INFO)

	let lonely = cmd.lonely || false
	let unstarred = cmd.unstarred || false

	// merge all dirs together
	let dirs = [firstDir, ...moreDirs]
	enforce(!!dirs, 'no directory specified')

	// TODO: force lonely only   or   starred ony   or  …else…

	//loneFiles.dump()
	const fileSet = new FileSet(dirs)
	const loneFiles = fileSet.getLonely()
	await loneFiles.delete(liveMode)
}

function deleteActionWrap(firstDir, moreDirs, cmd) {

	deleteAction(firstDir, moreDirs, cmd)
	.then( result => {
			log('confirmation message:')
			log()
	})
	.catch( err => {
		warn(err.message) // (makes log in error itself superficious)
		if(cmd.verbose)
			console.log(err.stack)
	})

}

export default deleteActionWrap
