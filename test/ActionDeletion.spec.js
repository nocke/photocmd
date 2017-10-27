'use strict'

/**
 * testing the delete action
 *
 *
 */

import chai, {assert} from 'chai';
import path from 'path';
import sinon from 'sinon';
import fs from 'fs';

import { mockfile, assertFiles, testconfig } from './_testtools';
import { logLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/log';
const testDir = testconfig.testDir;

// system under test:
import helpers from '../src/helpers';
import Family from '../src/model/Family';
import deleteAction from '../src/deleteAction';

// REF http://chaijs.com/api/assert/

describe('ActionDeletion', () => {

	beforeEach(async() => {
		await helpers.removeFolder(testDir);

		// assured testDir recreation
		assert.isFalse(fs.existsSync(testDir));
		if (!fs.existsSync(testDir)) {
			fs.mkdirSync(testDir);
		}
		assert.isTrue(fs.existsSync(testDir));
	});

	// afterEach(() => {
	// 	console.log('should do teardown.');
	// });


	// beforeEach(() => {
	// 	console.log('beforeEach123');
	// });

	it('general trashSync test', async() => {
		assert(fs.existsSync(testDir), 'directory not gone!');

		// create a number of files, delete a subset. verify. done.
		const mockFiles = [1, 2, 'A', 'B'].map(v => `mock${v}`);

		mockfile(testDir, mockFiles);

		await helpers.trashSync(mockFiles[0], mockFiles[2]);

		assert(!fs.existsSync(mockFiles[0]));
		assert(fs.existsSync(mockFiles[1]));
		assert(!fs.existsSync(mockFiles[2]));
		assert(fs.existsSync(mockFiles[3]));

		await helpers.removeFolder(testDir);
		assert(!fs.existsSync(testDir), 'directory not gone!');
	});

	it.only/*TEMPTEMP*/('delete lonely', () => {

		mockfile(  // my breakpoint, just where I wanted to be...
			testDir,
			[
				'IMG_0634.JpG', // lonely jpg, but not a lonely raw
				'beaches.JpG',  // single jpg
				'IMG_0636.nef', // lonely raw → DELETE
				'PM5A2087.cr2', // Family, not lonely
				'PM5A2087.cr2.dop',
				'PM5A2087_DXs2.jpg',
				'PM5A2087_Photoshop.jpg',
				'PM5A3095.CR2', // lonely raw → DELETE
				'PM5A3096.cr3', // lonely raw → DELETE
				'DSCN123.cR2',  // Family, not lonely
				'DSCN123.jpeg'  // testing: jpeg with 'e'
			]
		)

		deleteAction(testDir,[],{ live: true, lonely: true});

		assertFiles(  // assert file existence
			testDir,
			{
				'IMG_0634.JpG' : true,
				'beaches.JpG' : true,
				'IMG_0636.nef' : false, // lonely raw → DELETE
				'PM5A2087.cr2' : true,
				'PM5A2087.cr2.dop' : true,
				'PM5A2087_DXs2.jpg' : true,
				'PM5A2087_Photoshop.jpg' : true,
				'PM5A3095.CR2' : false, // lonely raw → DELETE
				'PM5A3096.cr3' : false, // lonely raw → DELETE
				'DSCN123.cR2' : true,
				'DSCN123.jpeg' : true
			}
		)


	});


});
