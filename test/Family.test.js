'use strict'

import chai, { assert } from 'chai'
import path from 'path'
import sinon from 'sinon'
import fs from 'fs'

import { mockfile, assertFiles, testconfig } from './_testtools'
import log, { setLevel, LEVELS, info, warn, error, enforce, fail, snooze, unsnooze } from '../src/util/log'

// test config _______________________
const testDir = testconfig.testDir

// system under test:
import fileUtils from '../src/util/fileUtils'
import Family from '../src/model/Family'
import FileSet from '../src/model/FileSet' // testing has to go through FileSet anyway


// REF http://chaijs.com/api/assert/

describe('Family Initialize', () => {

	beforeEach(async () => {
		await fileUtils.removeFolder(testDir)
		fs.mkdirSync(testDir)
	})


	it('bad initialize', () => {

		snooze(1)
		assert.throws(() => {
			new Family(42)
		})
		unsnooze()

	})

	it('simple Family', async () => {

		await mockfile(
			testDir, [
				'DSCN00248.cr2',
				'DSCN00248.dop',
				'DSCN00248.xmp',
				'DSCN00248_DXs2.jpg', // test: also non-obvious jpg makes it non-lonely
				'DSCN00248_Photoshop.jpg',
				// testing android cores (aka Families based on iso-dates)
				'2017-10-25_01234567.jpg',
				'2017-10-25_01234567_crop.jpg',
				'2017-10-25_01234567_colorcorrect.tiff'
			]
		)

		const fileSet = new FileSet([testDir])
		// console.dir(fileSet._families)

		const family1 = fileSet._families.get('DSCN00248')

		assert.equal(family1._core, 'DSCN00248', 'family core name')
		assert.equal(family1._map.size, 5, 'family member count mismatch')
		assert.isFalse(family1._isLonely, 'family not lonely')


		const family2 = fileSet._families.get('2017-10-25_01234567')
		assert.equal(family2._core, '2017-10-25_01234567', 'family core name')
		assert.equal(family2._map.size, 3, 'family member count mismatch')
		assert.isFalse(family2._isLonely, 'family not lonely')

	})

	it('single jpg', async () => {

		await mockfile(
			testDir, [
				'Beach-somewhere_foo.jpg' // no detectable pattern
			]
		)

		const fileSet = new FileSet([testDir])
		const family = fileSet._families.get('Beach-somewhere_foo')

		assert.equal(family._core, 'Beach-somewhere_foo', 'family core name')
		assert.equal(family._map.size, 1, 'family member count mismatch')
		assert.isFalse(family._isLonely, 'family not lonely')
	})

	it('two lonely RAWs', async () => {

		await mockfile(
			testDir, [
				'single-named.cr2',
				'IMGSX00000012.cr'
			]
		)

		const fileSet = new FileSet([testDir])
		const family1 = fileSet._families.get('single-named')
		const family2 = fileSet._families.get('IMGSX00000012')

		assert.equal(family1._core, 'single-named', 'family core name')
		assert.equal(family1._map.size, 1, 'family member count mismatch')
		assert.isTrue(family1._isLonely, 'yes, a raw –is– lonely')

		assert.equal(family2._core, 'IMGSX00000012', 'family core name')
		assert.equal(family2._map.size, 1, 'family member count mismatch')
		assert.isTrue(family2._isLonely, 'yes, a raw –is– lonely')
	})

})
