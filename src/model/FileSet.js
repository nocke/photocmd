'use strict'
import fs from 'fs';
import path from 'path';

import config from '../../config';
import { logLevel, LEVELS, info, log, warn, error, enforce, fail } from '../log';
import {
	Family,
	Member
} from '.';

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
		config.coreMatches.find(function(expCandidate) {
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

	constructor(dirs = undefined) {

		this._families = new Map();

		if (typeof dirs === 'undefined') {
			info('constructing empty fileSet');
			return;
		}

		enforce(Array.isArray(dirs), 'not an array');


		// parsing each dir:
		dirs.forEach(function(dir) {

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

				// remove leading dot on ext, except extensionless:
				if (p.ext.length > 0) {
					enforce(p.ext[0] === '.', 'sanity');
					p.ext = p.ext.substr(1);
				}

				// filter for supported filetypes
				if (!config.extensions.includes(p.ext.toLowerCase()))
					return;

				// figure out Core
				p.core = FileSet.getCore(p);

				// construct Member
				const member = new Member(p);

				if (p.core === null) {
					// treat singles just like families with the exception,
					// that p.core is defined by full name...
					p.core = p.name;
				}

				if (!this._families.has(p.core))
					this._families.set(p.core, new Family(p.core));

				const f = this._families.get(p.core);
				f.add(member);


				error('##################2');

				// =====================================
				// BIG LOOP end
				// =====================================

			}) // files.map
		}, this); // forEach

	} // constructor

	// =====================================
	// public instance methods
	// =====================================

	filter(cb) {
		const r = new FileSet();

		for (var [key, value] of this._families) {
			if (cb(value)) r._families.set(key, value);
		}

		return r;
	}

	/**
	 * @return {Map} all lonely families
	 */
	getLonely() {
		return this.filter((f) => f._isLonely);
	}

	/**
	 * @return {Map} all unstarred families
	 */
	getUnstarred() {
		// TODO
	}

	/**
	 *
	 * @param {boolean} liveMode simulate, unless set to true
	 * @param {force} force if true: actually delete. move-to-recycle otherwise
	 */
	delete(liveMode = false, force = false) {
		log("delete..........");
		this.getLonely();

		// all but true shall be false
		liveMode = liveMode === true;
		force = force === true;

		for (var [key, value] of this._families) {
			if (!liveMode) {
				info('mock delete ' + value.dump());
				continue;
			}

			if (force === true) {
				info('TODO hard delete');
				continue;
			} else {
				info('TODO move to recycle');
				continue;
			}

		}
	}

	dump() {
		info('== fileSet dump ===========================');

		for (let [k, f] of this._families) {
			info(`${k} ->  ${f._core} ||  ◌: ${f._isLonely}  || ★: ${f._isStarred} ||  ${f._map.size}`);
		}

		info('==========================================');
	}


} // class

export default FileSet;
