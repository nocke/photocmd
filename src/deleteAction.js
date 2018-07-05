// import what is not yet covered by babel runtime
import array from 'core-js/fn/array'

import assert from 'assert'
import log, { setLevel, LEVELS, info, warn, error, enforce, fail } from './log'

import {
	FileSet,
	Family,
	Member
} from './model'


// ↓ extremely important ________________________
async function deleteAction(firstDir, moreDirs, cmd) { // TODO: refactor → deleteLonely

	const liveMode = cmd.live || false

	log('a log message')
	info('an info message')

	let lonely = cmd.lonely || false
	let unstarred = cmd.unstarred || false

	// merge all dirs together
	let dirs = [firstDir, ...moreDirs]
	enforce(!!dirs, 'no directory specified')

	// COULDDO: fork  lonely / unstarred

	const fileSet = new FileSet(dirs)
	fileSet.dump()

	const loneFiles = fileSet.getLonely()

	const stats = {}
	await loneFiles.delete(stats, liveMode)

	


}


export default deleteAction
