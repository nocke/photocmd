'use strict'

import log, { setLevel, LEVELS, info, warn, error, enforce, fail } from '../util/log'
import fileUtils from '../util/fileUtils'
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
	 * @param {string} core Constructs a family, based on core basename (PM5A2087, or name in case of singles)
	 */
	constructor( core ) {
		enforce( typeof core === 'string', 'invalid core argument' )

		// properties ============================
		this._core = core
		this._map = new Map()

		// family flags
		this._isLonely = true // assume for now
		this._isStarred = false
	}


	/**
	 * empty an entire family (determined to be lonely, unstarred, etc.),
	 * trash / delete respective members
	 * @param {Family} family
	 */
	async empty( stats, live, force ) {
		enforce( typeof live === 'boolean', 'invalid live argument' )
		enforce( typeof force === 'boolean', 'invalid force argument' )

		if ( force )
			fail( 'TODO force-delete not yet implemented' )

		const trashFiles = []

		this._map.forEach( member => {
			trashFiles.push( path.join( member.dir, member.base ) )
			stats.filesDeleted++
		} )

		if ( !live || global.app.verbose ) {
			trashFiles.forEach( f => log( `deleting ${f} ...` ) )
		}

		if ( live ) {
			await fileUtils.trashSync( trashFiles )
		}

		// (I think this is all junk, in any case, not if not live)
		// reset state
		// this._core = undefined
		// this._map = new Map()

		// // family flags
		// this._isLonely = true // assume for now
		// this._isStarred = false
	}


	add( member ) {
		enforce( member instanceof Member, 'can only add members' )
		// base (full name) → member object
		this._map.set( member.base, member )

		// at least one non-raw image file qualifies
		if ( config.extensions_nonraw.includes( member.type ) ) {
			this._isLonely = false
			this._onlySidecars = false
		}
		// else if (...

	}

	size() {
		return this._map.size
	}

	/**
	 * output some core info, for debug purposes
	 */
	dump( ret = false ) {
		const r = `${this._core + '                  '.substr(this._core.length)}` +
			` || lone: ${this._isLonely}  || star: ${this._isStarred} || ` +
			` ${this._map.size}`

		if ( ret )
			return r
		log( r )
	}


} // Family

export default Family
