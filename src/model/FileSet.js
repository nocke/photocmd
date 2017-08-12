'use strict'
import fs from 'fs';
import path from 'path';

import config from '../../config';
import {
	enforce,
	fail
} from '../helpers';

/*
 *  data structure of FileSet
 *    a Map of families
 *      (no DSC IMG ...) , still important i.e. for unstarred deletion
 *      each Family consisting out of individual Members (Files)
 */
class FileSet {


	static getCore(p) {
		let exp,
			match = null;

		// look for match
		config.coreMatches.find(function (expCandidate) {
			exp = expCandidate;
			match = p.name.match(exp);
			return match !== null; // no match → false → keep on searching
		});

		// found a match
		if (match !== null) {
			enforce(match.length === 3, 'match exprssion length');
			return match[1];
		}
		// else: a single
		return null;
	}


	constructor(dirs) {

		enforce(Array.isArray(dirs), 'not an array');
		this._families = new Map();
		this._singles = new Map();
		console.log('FileSet constructed');

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
				enforce(p.dir === '', 'no relative subDirs (for now)');
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
				if (!config.extensions.includes(p.ext.toLowerCase()))
					return;


				p.core = FileSet.getCore(p);
				console.dir("p.dir " + p.dir + "    name: " + p.name + "  p.ext: " + p.ext + "   p.core: "+ p.core);

				if ( p.core === null )
					this._singles.set(p.name, p);
				else
					this._families.set(p.name, p);

				// ========================================================================
				// BIG LOOP
				// ========================================================================


			}) // files.map
		}, this); // forEach


		console.log('dumping FileSet Map: ===============================');

		for (var [key, value] of this._families) {
			console.log(key + ' = ' + value);
		}
		console.log('singles');
		for (var [key, value] of this._singles) {
			console.log(key + ' = ' + value);
		}




		return;
	} // constructor





} // class

export default FileSet;
