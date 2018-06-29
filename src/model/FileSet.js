'use strict'
import fs from 'fs'
import path from 'path'

import config from '../../config'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../log'
import {
	Family,
	Member
} from '.'
import helpers from '../helpers'

/*
 *  data structure of FileSet
 *    a Map of families
 *      (no DSC IMG ...) , still important i.e. for unstarred deletion
 *      each Family consisting out of individual Members (Files)
 */
class FileSet {

	static getCore(p) {
		let exp,
			match = null

		// look for match
		config.coreMatches.find(function(expCandidate) {
			exp = expCandidate
			match = p.name.match(exp)
			return match !== null // no match → false → keep on searching
		})

		// found a match
		if (match !== null) {
			enforce(match.length === 3, 'match exprssion length')
			return match[1]
		}
		// else: a single
		return null
	}

	constructor(dirs = undefined) {

		this._families = new Map()

		if (typeof dirs === 'undefined') {
			return
		}

		enforce(Array.isArray(dirs), 'not an array')

		// parsing each dir:
		dirs.forEach(function(dir) {
			// COULDO do a file-exist-round beforehand,
			// so command execution is more likely all-or-nothing

			enforce(fs.existsSync(dir), `no directory or file ${dir}`)
			enforce(fs.statSync(dir).isDirectory(), 'single File – not handled yet')

			let files = fs.readdirSync(dir)

			files.map((filepath) => {

				// ============================================
				// parse Files, segmentize, group into families
				// ============================================
				const p = path.parse(filepath)

				// use dir path from above, so far, relative subdir is empty
				enforce(p.dir === '', 'no relative subDirs (for now)')
				p.dir = dir

				enforce(p.name.length > 0, 'sanity: no empty filenames')
				// skipping hidden
				if (p.name[0] === '.') return

				// remove leading dot on ext, except extensionless:
				if (p.ext.length > 0) {
					enforce(p.ext[0] === '.', 'sanity')
					p.ext = p.ext.substr(1)
				}

				// filter for supported filetypes
				if (!config.extensions.includes(p.ext.toLowerCase()))
					return // skip nonsupported

				// extract Core
				p.core = FileSet.getCore(p)

				// construct Member
				const member = new Member(p)

				if (p.core === null) {
					// treat singles just like families with the exception,
					// that p.core is defined by full name...
					p.core = p.name
				}

				// open new Family if needed
				if (!this._families.has(p.core))
					this._families.set(p.core, new Family(p.core))

				const f = this._families.get(p.core)
				f.add(member)

			}) // files.map ======================
		}, this) // forEach

	} // constructor

	// =====================================
	// public instance methods
	// =====================================

	filter(cb) {
		const r = new FileSet()

		for (var [key, value] of this._families) {
			if (cb(value)) r._families.set(key, value)
		}

		return r
	}

	/**
	 * @return {Map} all lonely families
	 */
	getLonely() {
		return this.filter((f) => f._isLonely)
	}

	/**
	 * @return {Map} all unstarred families
	 */
	getUnstarred() {
		// TODO
	}

	/**
	 * @param {boolean} live simulate, unless set to true
	 * @param {force} force if true: actually delete. move-to-recycle otherwise
	 */
	async delete(live = false, force = false) {
		live = live === true // (all but true shall be false)
		force = force === true

		for (var [core, family] of this._families) {
			await family.empty(live, force)
		}
	}

	dump(ret = false, detailed = false) {
		info('== fileSet dump ===========================')
		for (let [core, family] of this._families) {
			enforce(core === family._core) // sanity
			info(`${core} ->  lone◌: ${family._isLonely}  || star★: ${family._isStarred} || num: ${family._map.size}`)
		}
		info(' ')
	}


} // class

export default FileSet
