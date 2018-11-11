import { mute } from "../src/util/log";

// the global nodejs object with some settings
import '../src/global'

global.app.suiteMode = process.env.npm_lifecycle_script !== 'mocha $1'

// keep verbosity low, when running full suite (only warn() and above)
if ( global.app.suiteMode ) mute()
