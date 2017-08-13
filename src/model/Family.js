'use strict'

import {
	enforce,
	fail
} from '../helpers';
import config from '../../config';

import {Member} from '.';

/*
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
 *    There may be extensionless files (harder to deal with, though)
 *
 */
class Family {

	/**
	 * @param {string} core Constructs a family, based on core basename (PM5A2087, or name in case of singles)
	 */
	constructor(core) {
		enforce( typeof core === 'string', 'invalid core argument');

		// properties ============================
		this._core = core;
		this._map = new Map();

		// family flags
		this._isLonely = true;
		this._isStarred = false;

	}

	add(member) {
		enforce( member instanceof Member, 'can only add members');
		this._map.set(member.name, member);

		// at least one raw file qualifies as 'not lonely'
		if (member.type === 'raw')
			this._isLonely = false;
	}

} // Family

export default Family;
