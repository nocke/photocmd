'use strict'

import log, { setLevel, LEVELS, info, warn, error, enforce, fail } from '../log'
import helpers from '../helpers'
import config from '../../config'
import { Member } from '.'
import path from 'path'

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
	 * empty an entire family (determined to be lonely, etc.),
	 * trash / delete respective members
	 * @param {Family} family
	 */
	async empty(live, force) {
		enforce(typeof live === 'boolean', 'invalid live argument')
		enforce(typeof force === 'boolean', 'invalid force argument')

		if (!live) {
			info('mock delete ' + this.dump())
			return
		}

		if (force)
			fail('force-delete not yet implemented')

		const trashFiles = []
		for (let [base, member] of this._map) {
			trashFiles.push( path.join(member.dir, member.base) )
		}

		await helpers.trashSync(trashFiles)

		// reset state
		this._core = undefined
		this._map = new Map()

		// family flags
		this._isLonely = true // assume for now
		this._isStarred = false
}


/**
 * @param {string} core Constructs a family, based on core basename (PM5A2087, or name in case of singles)
 */
constructor(core) {
	enforce(typeof core === 'string', 'invalid core argument')

	// properties ============================
	this._core = core
	this._map = new Map()

	// family flags
	this._isLonely = true // assume for now
	this._isStarred = false
}

add(member) {
	enforce(member instanceof Member, 'can only add members')
	// base (full name) → member object
	this._map.set(member.base, member)

	// TRUE: at least one IMAGE file (jpg, tiff...) qualifies as 'not lonely'
	if (config.extensions_image.includes(member.type))
		this._isLonely = false
}


/**
 * output some core info, for debug purposes
 */
dump(ret = false, detailed = false /* TODO */ ) {
	const r = `${this._core} ||  ◌: ${this._isLonely}  || ★: ${this._isStarred} ||  ${this._map.size}`
	if (ret)
		return r
	log(r)
}


} // Family

export default Family
