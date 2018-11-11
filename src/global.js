import path from 'path'
//import { version } from '../package.json'

if ( global.app ) {
	console.warn( 'global.app included twice?' )
	throw new Error( 'global.app included twice?' )
}

const root = path.resolve( __dirname, '..' )

global.app = {

	root,
	verbose: false,
	dirs: {
		cli:  path.resolve( root, 'dist', 'cli' ),

		// some test cover local path use
		testLocal: 'dist/cli/test',

 		// others use absolute
		test: path.resolve( root, 'dist', 'cli', 'test' ),
	},

}
