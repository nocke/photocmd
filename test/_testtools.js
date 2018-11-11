// needed for all testing
import chai, { assert } from 'chai'
import path from 'path'
import fs from 'fs'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/util/log'
import fileUtils from '../src/util/fileUtils'

// helper functions for testing -------------------------


// also creates parent Dir if not (good enough for our tests), but not a full depth path
// TODO a blacklist, to not create path in dangerous regions (linux / win respectively)
// TODO create nested if necessary
export const recreateDirectory = async ( dirName ) => {

	// ensured fully fresh testDir creation
	await fileUtils.removeFolder( dirName )
	assert.isFalse( fs.existsSync( dirName ) )

	const parentDir2 = path.join(dirName,'../..')
	if( !fs.existsSync( parentDir2 ))
		fs.mkdirSync( parentDir2 )

	const parentDir = path.join(dirName,'..')
	if( !fs.existsSync( parentDir ))
		fs.mkdirSync( parentDir )

	fs.mkdirSync( dirName )
	assert.isTrue( fs.existsSync( dirName ) )
}

/**
 * creates a number of mockfiles (just tiny text content)
 */
export const mockfile = async ( basedir, files ) => {

	// TODO: assert wäre hier besser!
	enforce( typeof basedir === 'string', 'baseDir must be string' )
	enforce( Array.isArray( files ), 'Files must be array' )

	files.forEach( file => {
		const filepath = path.join( basedir, file )
		fs.writeFileSync( filepath, 'mock content' )
	} )

}

export const assertFiles = async ( basedir, fileObj ) => {
	let numErrors = 0

	Object.keys( fileObj ).forEach( ( file ) => {
		const filepath = path.join( basedir, file )
		if ( fs.existsSync( filepath ) != fileObj[ file ] ) {
			warn( `${filepath} expected to be ${fs.existsSync(filepath) ? 'missing' : 'present'}` )
			numErrors++
		}
	} )

	assert( numErrors === 0, `found ${numErrors} missing/surplus files` )
}


export default {
	mockfile
}
