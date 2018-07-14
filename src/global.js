import path from 'path'

if ( global.app )
	console.warn( 'global.app included twice?' )

global.app = global.app || {}
global.app.root = path.resolve( __dirname, '..' )
global.app.verbose = false
