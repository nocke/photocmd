'use strict'
/**
 * usage:
 *
 * 	info('trace() Eins')
 *	log('log() Zwei')
 *  warn('warn() Drei')
 *  error('error() Vier')
 *
 *	logLevel(LEVELS.WARN)
 *
 * TODO error/fail distinction (catchable-per-item vs. fatal) isn't there yet
 * TODO lithmus test: source errors
 * TODO feature: channels   logCh('exceptions', )
 * TOOD functionalize: a function rather than a direct action.
 *      logFn('howdy partner')()
 *      (easier to include in some places)
 *
 *  1 info  - tiny process info (-v Switch activates that)
 *  2 log   - regular output (default verbosity)
 *  3 warn  - shows warnings and above
 *  4 error - shows errors (recoverable, i.e. only single item affected)
 *            throws an exception, that gets caught for 'next round'
 *  5 fail  - only shows, when task completely breaks → fail()
 *
 */

// state ---------------------------
let logLevel = 2
let muteFlag = false // mutes all info & log, irrespective of log level (used for full test suite runs)

// one can mute fail and failed enforce output (still throwing…)
// null := snooze mode OFF  (default)
// positive number: expecting n more uses
// 0: used as often as possible, next fail/enforce will throw!
let snoozeCount = null

const color = [
	"\x1b[0m", // 0 → reset
	"\x1b[1;34m", // 1 → info:  light blue(34) cyan(36) white(37)
	"\x1b[1;32m", // 2 → log:   green
	"\x1b[1;33m", // 3 → warn:  yellow
	"\x1b[1;31m", // 4 → error: red
	"\x1b[1;31m" // 5 → fail:   also red
]

// COULDDO:
// • smart (legible) dumping of objects, arrays, ...

function _log( level, messages ) {

	if ( level < logLevel ) {
		return // skip
	}

	const lines = []

	messages.forEach( msg => {
		let line = msg; // `${msg}  (msg level: ${level}, log level: ${logLevel}`

		switch ( typeof line ) {
			default:
				case 'string':
				break

			case 'object':
					line = JSON.stringify( line, null, '  ' )
				break
		}

		lines.push( line )
	} )

	const linesMono = lines.join( '\n' )
	const linesColor = color[ level ] + linesMono + color[ 0 ]

	console.log( linesColor ) // (.join() avoids a trailing '\n' which comes from console.log anyhow)

	// COULDDO: callback to set logger function(s), substituting / adding for console.log
}

export const LEVELS = Object.freeze( {
	INFO: 1,
	LOG: 2,
	WARN: 3,
	ERROR: 4,
	FAIL: 5
} )

/**
 * Setting (or just getting) the current logLevel
 * @param {number} level
 */
export function setLevel( level ) {
	if ( level !== undefined ) {
		enforce( typeof level === 'number' )
		logLevel = level
	}
	return logLevel
}

export function info( ...msg ) {
	if ( !muteFlag )
		_log( 1, msg )
}

export function log( ...msg ) {
	if ( !muteFlag )
		_log( 2, msg )
}

export function warn( ...msg ) {
	_log( 3, msg )
}

// error handling ======================================

export function _error( msg, ...args ) {
	if ( snoozeCount === null ) { // regular use
		_log( 4, [msg] )
	} else { // counting uses
		if ( snoozeCount > 0 ) {
			snoozeCount--
		} else {
			_log( 4, [`testing error – snoozed too often, snoozeCount: ${snoozeCount} ******`] )
		}
	}
	throw new Error( msg, args )
}

export function error( msg, ...args ) {
	_error( msg, ...args )
}

export function fail( msg = 'failing', ...args ) {
	_error( msg, ...args )
}

export function enforce( expr, msg = 'enforce failed', ...args ) {
	if ( expr !== true ) {
		_error( msg, ...args )
	}
}

// testing support ========================================

/**
 * mute error output (but nevertheless throw )
 * on the next n fail() / failed enforces
 * @param {int} n
 */
export function snooze( n ) {
	enforce( Number.isInteger( n ), `snooze needs an integer parameter, got ${n}` )
	enforce( n > 0, `snooze must be larger than zero, got ${n}` )
	enforce( snoozeCount === null, `snooze already activated` )

	snoozeCount = n
}

/**
 * leave the snooze mode again. MUST happen precisely when the n are used up
 */
export function unsnooze() {
	enforce( snoozeCount !== null, `snooze not activated` )
	enforce( !( snoozeCount > 0 ), `remaining snooze count too high` )
	snoozeCount = null
}

export function mute() {
	muteFlag = true
}

export function unmute() {
	muteFlag = false
}

// log('foo') as the basic function, all else contained
// (like chai: assert(), assert.method1(),... )
export default Object.assign( log, {
	info,
	log,
	warn,
	error,
	fail,
	enforce,
	setLevel,
	LEVELS,

	snooze,
	unsnooze,

	mute,
	unmute
} )
