
import assert from 'assert';

import fs from 'fs';
import path from 'path';

const CONFIG = JSON.parse(fs.readFileSync('./config.json'));


function deleteAction( firstDir, moreDirs, cmd ) {

	let liveMode    = cmd.live || false;
	let verboseMode = cmd.verbose || false;

	// simply merge all dirs, treat each one seperately
	let dirs = [firstDir, ...moreDirs];

	console.dir(CONFIG);

	if (!dirs)
		throw new Error('no directory');

	dirs.forEach(function (dir) {

		console.log('\nhandling dir %s ---------------------', dir);

		if ( fs.existsSync(dir) ) {

			let stats = fs.statSync( dir );
			if (stats.isDirectory()) {

				console.log( "directory!" );
				assert.ok( dir.length > 0, 'insufficient string length');

				fs.readdir( dir, function( err, files) {
					if( err ) {
						console.error( "Could not list the directory.", err );
						process.exit(1);
					}

					files.forEach( function( file, index ) {
						console.log('File: ', file);
					});

				});

				// NEXT: wie fange ich so async-tasks denn dann wieder ein?

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
