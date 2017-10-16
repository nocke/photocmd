'use strict'

import chai from 'chai';
const assert = chai.assert;
import path from 'path';
import fs from 'fs';

import trash from 'trash';
import config from './config';


describe('trash module', () => {

	beforeEach(async () => {
		console.log('beforeEach123');
		const dir = config.testDir;
		console.dir(dir);

		if (fs.existsSync(dir)){
			console.log(`deleting ${dir}`);
			await fs.rmdir(dir);

		} 


	});

	it('test simple deletion', () => {

		assert( true, 'worked' );
 


	});



});
