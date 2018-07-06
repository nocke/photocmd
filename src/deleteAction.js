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

	let lonely = cmd.lonely || false
	let unstarred = cmd.unstarred || false

	const stats = {
		familiesTotal: 0,
		familiesToDelete: 0,
		familiesDeleted: 0,
		filesTotal: 0,
		filesDeleted: 0
	}

	// merge all dirs together
	let dirs = [firstDir, ...moreDirs]
	enforce(!!dirs, 'no directory specified')

	// COULDDO: fork  lonely / unstarred

	const fileSet = new FileSet(dirs)
	stats.filesTotal = fileSet.filesTotal()

	fileSet.dump()
	stats.familiesTotal = fileSet.size()

	const loneFiles = fileSet.getLonely()
	stats.familiesToDelete = loneFiles.size()

	await loneFiles.delete(stats, liveMode)

	log('statistics ____________________', stats)
}

export default deleteAction
