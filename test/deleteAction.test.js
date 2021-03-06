'use strict'

/**
 * testing the delete action
 *
 */

import chai, { assert } from 'chai'
import path from 'path'
import sinon from 'sinon'
import fs from 'fs-extra'

import { mockfile, assertFiles, recreateDirectory } from './_testtools'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/util/log'

// test config:
const testDir = path.resolve( global.app.dirs.test, 'deleteActionTests' )
import trash from 'trash'

// system under test:
import fileUtils from '../src/util/fileUtils'
import Family from '../src/model/Family'
import deleteAction from '../src/action/deleteAction'

let clock

describe( 'deleteAction', function() {

	this.slow( 300 )

	beforeEach( async () => {
		await recreateDirectory( testDir )
		clock = sinon.useFakeTimers()
	} )

	afterEach( async () => {
		clock.restore()
	} )

	it( 'general trashSync test', async () => {
		// // create a number of files, delete a subset. verify. done.
		const mockFiles = [ 1, 2, 'A', 'B' ].map( v => `mock${v}` )
		mockfile( testDir, mockFiles )

		// add path in front of each file
		const trashFiles = []
		mockFiles.forEach( file => trashFiles.push( path.join( testDir, file ) ) )

		await fileUtils.trashSync( trashFiles )

		mockFiles.forEach( file =>
			assert( !fs.existsSync( file ) )
		)

		await fileUtils.removeFolder( testDir )
		assert( !fs.existsSync( testDir ), 'directory not gone!' )
	} )


	it( 'delete lonely', async () => {

		// create files
		await mockfile(
			testDir, [
				'no-extension-file',

				'IMG_0634.JpG', // lonely jpg, but not a lonely raw
				'beaches.JpG', // single jpg
				'IMG_0636.nef', // lonely raw → DELETE
				'PM5A2087.cr2', // Family, not lonely
				'PM5A2087.dop',
				'PM5A2087_DXs2.jpg',
				'PM5A2087_Photoshop.jpg',
				'PM5A3095.CR2', // lonely raw → DELETE
				'PM5A3095.xmp', // /(verify, entire family gets wiped)
				'PM5A3095.dop', // lone helper file
				'PM5A3095.cr.dop', // lone helper file double-ext

				'mockA.jpg', // TEMP
				'PM5A1234.cr2', // TEMP
				'PM5A3096.cr3', // lonely raw → DELETE
				'banana.cr3', // lonely raw → DELETE
				'DSCN123.cR2', // Family, not lonely
				'DSCN123.jpeg' // testing: jpeg with 'e'
			]
		)

		await new Promise( ( resolve, reject ) => {
			// await
			deleteAction( testDir, [], { live: true, lonely: true, skipCountdown: true } ).then(
				( value ) => {
					log( 'now it happend' )
					resolve()
				},
				( reason ) => {
					reject( reason )
				}
			)
			// by not using await (despite deleteAction being an sync function)
			// but rather just chaining a then, this clock.tick get run while
			// deleteAction is running resp. while it is waiting in some
			// setTimeout for it's countdown
			clock.tick( 5000 )
		} )

		await assertFiles(
			testDir, {
				'no-extension-file': true,

				'IMG_0634.JpG': true,
				'beaches.JpG': true,
				'IMG_0636.nef': false, // false, must delete lonely raw → DELETE
				'PM5A2087.cr2': true,
				'PM5A2087.dop': true,
				'PM5A2087_DXs2.jpg': true,
				'PM5A2087_Photoshop.jpg': true,
				'PM5A3095.CR2': false, // lonely raw → DELETE
				'PM5A3095.xmp': false,
				'PM5A3095.dop': false,

				'mockA.jpg': true, // lonely raw → DELETE
				'PM5A1234.cr2': false, // lonely raw → DELETE
				'PM5A3096.cr3': false, // false  lonely raw → DELETE
				'banana.cr3': false, // false  lonely raw → DELETE
				'DSCN123.cR2': true,
				'DSCN123.jpeg': true
			}
		)

		log( 'end of test ___________________________' )
	} ) // delete lonely

} )
