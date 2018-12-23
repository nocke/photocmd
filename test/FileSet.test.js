'use strict'

import chai, { assert } from 'chai'
import path from 'path'
import sinon from 'sinon'
import fs from 'fs-extra'

import { mockfile, assertFiles } from './_testtools'
import log, { setLevel, LEVELS, info, warn, error, enforce, fail, snooze, unsnooze } from '../src/util/log'

// test config:
const testDir = path.resolve(global.app.dirs.test, 'deleteActionTests')

// system under test:
import fileUtils from '../src/util/fileUtils'
import FileSet from '../src/model/FileSet' // testing has to go through FileSet anyway


describe('FileSet testing', () => {

	// helper function
	const assertCoreData = (filepath, expected) => {
		const r = FileSet.parseCoreData(filepath)
		warn(r)
		for (const prop in expected) {
			assert.equal(
				r[prop],
				expected[prop],
				`prop "${prop}" on filepath "${filepath}"`
			)
			log(prop)
		}

	}

	it('test getCore - images', () => {
		assert.equal(FileSet.parseCoreData('IMG_0634.JpG'), 'IMG_0634')

		assert.equal(FileSet.parseCoreData('PM5A2087.cr2'), 'PM5A2087')
		assert.equal(FileSet.parseCoreData('PM5A2087_DXs2.jpg'), 'PM5A2087')
		assert.equal(FileSet.parseCoreData('PM5A2087_02_final.jpg'), 'PM5A2087')

		// singles
		assert.equal(FileSet.parseCoreData('beaches.JpG'), 'beaches')

		// extensionless (yes, oddity)
		assert.equal(FileSet.parseCoreData('PM5A2087'), 'PM5A2087')

		// COULDDO versioned singles
		// Ipswick123_01
		// Ipswick123_01_final
		// Ipswick123_02 with space
	})

	it('test getCore - sidecars', () => {
		// sidecar instead
		assert.equal(FileSet.parseCoreData('IMG_0636.nef'), 'IMG_0636')
		assert.equal(FileSet.parseCoreData('PM5A1234.xmp'), 'PM5A1234')
		assert.equal(FileSet.parseCoreData('Singles.xmp'), 'Singles')


		// sidecar append
		assert.equal(FileSet.parseCoreData('IMG_0636.jpg.nef'), 'IMG_0636')
		assert.equal(FileSet.parseCoreData('PM5A1234.jpg.xmp'), 'PM5A1234')

	})

	it.only('test getCore - movies', () => {
		assertCoreData('PM5A2087.mov', { name: 'PM5A2087', type: 'mov' })
	})

	// COULDDO 19-hundred?  19\d\d ?

})
