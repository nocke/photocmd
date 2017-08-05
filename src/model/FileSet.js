'use strict'
import config from '../../config';
import {enforce, fail} from '../helpers';

/*
 *  data structure of FileSet
 *
 */

 class FileSet {

	constructor(dirs) {

		enforce( Array.isArray(dirs), 'not an array' );
		this._families = new Set();

		console.log('FileSet constructed');
		return;
	}
}

export default FileSet;
