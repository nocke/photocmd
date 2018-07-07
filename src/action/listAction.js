// import what is not covered by babel runtime
import array from 'core-js/fn/array'
import assert from 'assert'
import log, { setLevel, LEVELS, info, warn, error, enforce, fail } from '../log'

// ↓ extremely important ________________________
async function listAction(dirs, cmd) {

	// COULDDO: common parameter parsing (to a singleton config obj) elsewhere

	log('List: a log message')
	info('List: an info message')

	log('moreDir -------------')
	log(dirs)
	log('cmd -------------')
	// avoiding circular json problem:
	Object.keys(cmd).forEach( k => log(`${k}`) )

	log('cmd.options -------------')
	Object.keys(cmd.options).forEach( k => log(`${k}`) )

	// analog zu cmd.verbose  (geht aber nicht)
	log(` ${cmd.y}`) //geht nicht
	log(` ${cmd.Y}`) //geht  (?)

}

export default listAction
