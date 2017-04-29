import fs from 'fs';
import path from 'path';


function deleteAction( firstDir, moreDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	console.log( "live: "    + liveMode );
	console.log( "verbose: " + verboseMode );
	console.log( '-----------------' );
	
	let dirs = [firstDir, ...moreDirs];

	console.dir(dirs, 'dirs');

	if (!dirs)
		return new Error('no directory');

	dirs.forEach(function (dir) {

		console.log('\nhandling dir %s', dir);

		if ( fs.existsSync(dir) ) {

			let stats = fs.statSync( dir );
			if (stats.isDirectory()) {
				console.log( "directory!" );
			} else {
				console.log( "file!" );
			}
		}
		else
		{
			console.error('no directory or file %s', dir);
		}

	});

} // deleteAction

// OLD: module.exports = deleteAction;
export default deleteAction;
