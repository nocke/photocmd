/*
 * Franks small set of little helpers.
 * i.e. sanity checks
 */

export function enforce(expr, msg='enforce failed', ...args) {
	if( expr !== true )
	{
		throw new Error(msg, args);
	}
}

export function fail(msg='failing', ...args) {
	throw new Error(msg, args);
}


