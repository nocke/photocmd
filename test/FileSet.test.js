'use strict'

import chai, { assert } from 'chai'
import path from 'path'
import sinon from 'sinon'
import fs from 'fs-extra'

import { mockfile, assertFiles } from './_testtools'
import log, { setLevel, LEVELS, info, warn, error, enforce, fail, snooze, unsnooze } from '../src/util/log'

// test config:
const testDir = path.resolve( global.app.dirs.test, 'deleteActionTests' )

// system under test:
import fileUtils from '../src/util/fileUtils'
import FileSet from '../src/model/FileSet' // testing has to go through FileSet anyway



describe( 'FileSet testing', () => {


	it( 'test getCore - images', () => {
		assert.equal( FileSet.getCore( {name:'IMG_0634.JpG'}), 'IMG_0634')

		assert.equal( FileSet.getCore( {name:'PM5A2087.cr2'}), 'PM5A2087')
		assert.equal( FileSet.getCore( {name:'PM5A2087_DXs2.jpg'}), 'PM5A2087')
		assert.equal( FileSet.getCore( {name:'PM5A2087_02_final.jpg'}), 'PM5A2087')

		// singles
		assert.equal( FileSet.getCore( {name:'beaches.JpG'}), 'beaches')

		// extensionless (yes, oddity)
		assert.equal( FileSet.getCore( {name:'PM5A2087'}), 'PM5A2087')

		// COULDDO versioned singles
		// Ipswick123_01
		// Ipswick123_01_final
		// Ipswick123_02 with space
	})

	it( 'test getCore - sidecars', () => {
		// sidecar instead
		assert.equal( FileSet.getCore( {name:'IMG_0636.nef'}), 'IMG_0636')
		assert.equal( FileSet.getCore( {name:'PM5A1234.xmp'}), 'PM5A1234')
		assert.equal( FileSet.getCore( {name:'Singles.xmp'}), 'Singles')


		// sidecar append
		assert.equal( FileSet.getCore( {name:'IMG_0636.jpg.nef'}), 'IMG_0636')
		assert.equal( FileSet.getCore( {name:'PM5A1234.jpg.xmp'}), 'PM5A1234')


	})


	it( 'test getCore - movies', () => {
		
		assert.equal( FileSet.getCore( {name:'PM5A2087'}), 'PM5A2087')
	})

	it.only( 'temp', () => {
		
		assert.equal( FileSet.getCore( {name:'beaches.JpG'}), 'beaches')
	})


		// const fileSet = new FileSet( [ testDir ] )
		// // log(fileSet._families)

		// const family1 = fileSet._families.get( 'DSCN00248' )

		// assert.equal( family1._core, 'DSCN00248', 'family core name' )
		// assert.equal( family1._map.size, 5, 'family member count mismatch' )
		// assert.isFalse( family1._isLonely, 'family not lonely' )

		// const family2 = fileSet._families.get( '2017-10-25_01234567' )
		// assert.equal( family2._core, '2017-10-25_01234567', 'family core name' )
		// assert.equal( family2._map.size, 3, 'family member count mismatch' )
		// assert.isFalse( family2._isLonely, 'family not lonely' )


		// COULDDO 19-hundred?  19\d\d ?

} )
