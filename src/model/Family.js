'use strict'
import assert from 'assert';


/**
 * maintains families of images
 * - images and sidecars belonging together, based on naming
 *
 * parsing is king
 * direct access, no privacy fiddling
 * re-used from various commands
 *
 */
class Family {

	constructor(files=undefined) {

		this._fam = [];

		console.log('Family constructed');

		if (typeof files === 'undefined' )
			return;

		if (typeof files === 'object' && Array.isArray(files) )
		{
			this.parse(files);
			return;
		}

		throw new Error('bad constructor');
	}


	parse( files ) {
		console.log('parsing files');
		this._fam = files;
	}

	static staticHi() {
		console.log('Howdy Partner');
	}





} // Family

export default Family;

