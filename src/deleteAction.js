'use strict';

function deleteAction( dir, otherDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	console.log( "live: "    + liveMode );
	console.log( "verbose: " + verboseMode );
	console.log( '-----------------' );
	console.log('now deleting %s', dir);

	if (otherDirs) {
		otherDirs.forEach(function (oDir) {
			console.log('also deleting %s', oDir);
		});
	}


}

// OLD: module.exports = deleteAction;
export default deleteAction;
