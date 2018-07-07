import log, { info, warn, error, setLevel, LEVELS, enforce, fail } from './log'

/**
 * wraps an async function (or any other promise-returning one)
 * and sets exitCode (does *not* do process.exit to allow graceful completion)
 */
export const promiseWrap = (func) => (...args) => {

	const cmd = args[args.length - 1]
	func.call(null, ...args)
		.then(result => {
			info('completed succesfully __________')
			process.exitCode = 0
		})
		.catch(err => {
			warn(err.message) // (yes, redundant to log in error itself)
			// COULDDO: examine for syntax errors (missing functions),
			// also stacktrace in that case
			if (cmd.verbose)
				log(err.stack)
			process.exitCode = 126 // command cannot execute
		})
}

/**
 * count's down from sec to 0, then launches func
 * if process is interrupted, func gets _not_ called
 * coulddo: get a return handle to .cancel()
 *
 * TODO: this needs async/await love
 */
export const countdown = async (sec) =>
	new Promise((resolve, reject) => {
		enforce(sec && Number.isInteger(sec))
		let count = sec

		const round = async () => {
			warn(`counting ${count} ...`)
			if (count === 0) {
				resolve(true) // no need for specific value
			} else {
				count--
				setTimeout(round, 1000)
			}
		}

		round()
	})