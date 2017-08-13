'use strict'
import fs from 'fs';
import path from 'path';

import config from '../../config';
import {
	enforce,
	fail
} from '../helpers';
import {Family, Member} from '.';

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

		// parsing each dir:
		dirs.forEach(function (dir) {

			enforce(fs.existsSync(dir), `no directory or file ${dir}`);
			enforce(fs.statSync(dir).isDirectory(), 'single File – not handled yet');

			let files = fs.readdirSync(dir);

			files.map((filepath) => {

				// =====================================
				// BIG LOOP
				// =====================================

				const p = path.parse(filepath);

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

				// figure out Core
				p.core = FileSet.getCore(p);

				// construct Member
				const member = new Member(p);

				if ( p.core === null )
				{
					// treat singles just like families
					// with the exception, that p.core is defined by the full p.name...
					p.core = p.name;
				}

				if (!this._families.has(p.core))
					this._families.set(p.core, new Family(p.core));

				const f = this._families.get(p.core);
				f.add(member);


				// =====================================
				// BIG LOOP
				// =====================================

			}) // files.map
		}, this); // forEach


		console.log('dumping FileSet Map: ===============================');


		for( var [key, value] of this._families) {
			console.log(`key: ${key} ---------------------`);
			console.dir(value)
		}
		// for (var [key, value] of this._families) {
		// 	console.log(key + ' = ' + value);
		// }
		// console.log('singles');
		// for (var [key, value] of this._singles) {
		// 	console.log(key + ' = ' + value);
		// }


		return;
	} // constructor


} // class

export default FileSet;
