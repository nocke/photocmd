
export function enforce(expr, msg='enforce failed', ...args) {
	if( expr !== true )
	{
		throw new Error(msg, args);
	}
}
