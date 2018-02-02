'use strict';
/**
 * usage:
 *
 * 	info('trace() Eins');
 *	log('log() Zwei');
 *  warn('warn() Drei');
 *  error('error() Vier');
 *
 *	logLevel(LEVELS.WARN);
 *
 * TODO error/fail distinction (catchable-per-item vs. fatal) isn't there yet
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
let coloring = true; // COULDDO: getter/setter
let logLevel = 2;

const color = [
	"\x1b[0m", // 0 → reset
	"\x1b[1;34m", // 1 → info:  light blue(34) cyan(36) white(37)
	"\x1b[1;32m", // 2 → log:   green
	"\x1b[1;33m", // 3 → warn:  yellow
	"\x1b[1;31m", // 4 → error: red
	"\x1b[1;31m" // 5 → fail:   also red
]

function _log(level, msg) {
	let out = msg; // `${msg}  (msg level: ${level}, log level: ${logLevel}`;

	if (level < logLevel) {
		return; // skip
	}

	if (coloring) {
		out = color[level] + out + color[0];
	}

	console.log(out);
	// COULDDO:
	// • different output targets (logfile, ...)
	// • type detection
	// • smart (legible) dumping of objects, arrays
	// • ...REST parameters (and doing that for each of those)
}

export function _error(msg, ...args) {
	_log(4, msg);
	throw new Error(msg, args);
}

export const LEVELS = Object.freeze({
	INFO: 1,
	LOG: 2,
	WARN: 3,
	ERROR: 4,
	FAIL: 5
});

export function howdy(){console.log('howdy')};

/**
 * Setting (or just getting) the current logLevel
 * @param {number} level
 */
export function setLevel(level) {
	if (level !== undefined) {
		enforce(typeof level === 'number');
		logLevel = level;
	}
	return logLevel;
}

export function info(msg) {
	_log(1, msg);
}

export function log(msg) {
	_log(2, msg);
}

export function warn(msg) {
	_log(3, msg);
}

export function error(msg, ...args) {
	_error(msg, ...args);
}

// ======================================

export function fail(msg = 'failing', ...args) {
	_error(msg, ...args);
}

export function enforce(expr, msg = 'enforce failed', ...args) {
	if (expr !== true) {
		_error(msg, ...args);
	}
}
