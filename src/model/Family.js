'use strict'
import assert from 'assert';
import fs from 'fs';
import path from 'path';

import {
	enforce
} from '../utils';
import config from '../../config';


/**
 * maintains a family of images
 * - images and sidecars belonging together, based on naming
 *
 * parsing is king
 * direct access, no privacy fiddling
 * re-used from various commands
 *
 * a) data structure of Family (these are groups, not individual pictures)
 *    path - directory relative to caller path
 *          This still allows to have cross-directory Family-Sets
 *          thus uses can use a multitude of dirs (later: wildcard settings)
 *          even potentially overlapping
 *
 *    core - the core, identifying this family,
 *           i.e. PM5A3135 or IMG_1251 or DSC09470
 *           this is not a full filename, not even the full name
 *           (not normalized to lowercase, but comparision happens normalized)
 *    corenumber - the isolated upcounting part as a number, i.e.
 *           3135, 1251, 9470
 *
 *  b) data structure of (family) Members
 *     basename - i.e.  DSC09470_retouche.jpg
 *     stem     - basename w/o extension, i.e. DSC09470_retouche
 *     ext      - extension, i.e. jpg
 *
 *    Hidden files beginning with a dot are never part of a family
 *    In case of multiple dots, the last one splits the extension
 *        stem:  IMG_1251.holiday.2016.usa    ext: jpg
 *    Yes, there may be extensionless files (harder to deal with, though)
 *
 */
class Family {

	/**
	 * parses a directory,
	 * @param {Array} dirs one or more directories
	 *
	 * @return {Set} a set with all families
	 *
	 *
	 */
	static parse(dirs) {
		const r = new Set();
		console.log('parsing files...');


		// parsing each dir:
		dirs.forEach(function (dir) {

			enforce(fs.existsSync(dir), `no directory or file ${dir}`);
			enforce(fs.statSync(dir).isDirectory(), 'single File – not handled yet');

			let files = fs.readdirSync(dir);

			files.filter((filepath) => {
					const p = path.parse(filepath);

					enforce(p.name.length > 0, 'sanity: no empty filenames');
					// skipping hidden
					if (p.name[0] === '.') return false;
					// remove leading dot on ext (always, unless extensionless)
					if (p.ext.length > 0) {
						enforce(p.ext[0] === '.', 'sanity');
						p.ext = p.ext.substr(1);
					}

					console.log("dir " + p.dir + "name " + p.name + "  p.ext: " + p.ext);
					// filter for supported filetypes
					return config.extensions.includes(p.ext.toLowerCase());
				})
				.map((filepath) => {
					console.log(filepath)



				});

		});



		return r;
	}



	constructor(files = undefined) {

		this._fam = [];

		console.log('Family constructed');

		if (typeof files === 'undefined')
			return;

		if (typeof files === 'object' && Array.isArray(files)) {
			this.parse(files);
			return;
		}

		throw new Error('bad constructor');
	}


	static staticHi() {
		console.log('Howdy Partner');
	}

} // Family

export default Family;
