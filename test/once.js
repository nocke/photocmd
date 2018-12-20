import { mute, setLevel } from "../src/util/log";

// the global nodejs object with certain settings
import '../src/global'

global.app.suiteMode = !(
	process.env.npm_lifecycle_script == 'mocha $1' ||
	process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.includes('test-single')
)

console.log('running in '+( global.app.suiteMode ? 'suite mode' : 'single mode' ))

// keep verbosity low, when running full suite (only warn() and above)
if ( global.app.suiteMode )
	mute()
else // by default, we want to read all   TODO: into the globel per-suite setup?
	setLevel(1)
