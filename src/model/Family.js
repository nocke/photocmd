'use strict'

import { logLevel, LEVELS, info, log, warn, error, enforce, fail } from '../log';
import config from '../../config';

import {
	Member
} from '.';

/*
 * maintains a family of images
 * - images and sidecars belonging together, based on naming
 *
 * data structure of (family) Members
 *
 *    Hidden files beginning with a dot are never part of a family
 *    In case of multiple dots, the last one splits the extension
 *        stem:  IMG_1251.holiday.2016.usa    ext: jpg
 *    There may be extensionless files (harder to deal with, though)
 *
 */
class Family {

	/**
	 * @param {string} core Constructs a family, based on core basename (PM5A2087, or name in case of singles)
	 */
	constructor(core) {
		enforce(typeof core === 'string', 'invalid core argument');

		// properties ============================
		this._core = core;
		this._map = new Map();

		// family flags
		this._isLonely = true;
		this._isStarred = false;
	}

	add(member) {
		enforce(member instanceof Member, 'can only add members');
		this._map.set(member.name, member);

		// at least one raw file qualifies as 'not lonely'
		if (member.type === 'raw')
			this._isLonely = false;
	}


	/**
	 * output some core info, for debug purposes
	 */
	dump(ret = false) {
		if (ret)
			return `${this._core} ||  ◌: ${this._isLonely}  || ★: ${this._isStarred} ||  ${this._map.size}`;
		console.log(`${this._core} ||  ◌: ${this._isLonely}  || ★: ${this._isStarred} ||  ${this._map.size}`);
	}


} // Family

export default Family;
