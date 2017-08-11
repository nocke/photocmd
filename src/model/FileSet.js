'use strict'
import fs from 'fs';
import path from 'path';

import config from '../../config';
import {enforce, fail} from '../helpers';

/*
 *  data structure of FileSet
 *    a Map of families
 *      (no DSC IMG ...) , still important i.e. for unstarred deletion
 *      each Family consisting out of individual Members (Files)
 */
 class FileSet {

	constructor(dirs) {

		enforce( Array.isArray(dirs), 'not an array' );
		this._families = new Map();
		console.log('FileSet constructed');

		// TEMPTEMP
		this._families.set('DSC1234',42);
		this._families.set('_IMG_5678','banana');

		// TODO:
		// STEP 1   parse picasa ini to key-value array to obtained starred
		 /*
		 * STEP 2
		 *    iterate images and collect families and singles
		 *    (non-family-matchable) singles become important for i.e. unstarred
		 *    deletions...)
		 */

		/* STEP 3  perform action
		 *    actual delete/recycle or simulation of it
		 */


		// parsing each dir:
		dirs.forEach(function (dir) {

			enforce(fs.existsSync(dir), `no directory or file ${dir}`);
			enforce(fs.statSync(dir).isDirectory(), 'single File – not handled yet');

			let files = fs.readdirSync(dir);

			files.map((filepath) => {

				// ================================================================
				// BIG LOOP
				// ================================================================

				const p = path.parse(filepath);
				//console.log("dir " + p.dir + "name " + p.name + "  p.ext: " + p.ext);

				// use dir path from above, so far, relative subdir is empty
				enforce(p.dir==='', 'no relative subDirs (for now)');
				p.dir = dir;

				enforce(p.name.length > 0, 'sanity: no empty filenames');
				// skipping hidden
				if (p.name[0] === '.')
					return;

				// remove leading dot on ext (always, unless extensionless)
				if (p.ext.length > 0) {
					enforce(p.ext[0] === '.', 'sanity');
					p.ext = p.ext.substr(1);
				}

				// filter for supported filetypes
				// TODO supported sidecars, etc
				if ( !config.extensions.includes(p.ext.toLowerCase()) )
					return;

				// REF
				// { root: '',
				// dir: '',
				// base: 'PM5A2847.JPG',
				// ext: 'JPG',
				// name: 'PM5A2847' }

				console.dir("p.dir "+ p.dir + "    name " + p.name + "  p.ext: " + p.ext);







				// ========================================================================
				// BIG LOOP
				// ========================================================================


			}) // files.map
		}); // forEach


		console.log('dumping FileSet Map: ===============================');

		for(var [key, value] of this._families) {
			console.log(key + ' = ' + value);
		}




		return;
	}
}

export default FileSet;
