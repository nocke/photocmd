'use strict';

import { assert, fail, expect } from 'chai';
import path from 'path';
import fs from 'fs';

import {mockfile, config} from './common';
const testDir = config.testDir;

import helpers from '../src/helpers';
import Family from '../src/model/Family';

const errCB = err => {
  if (err) fail('callback failed');
  else console.log('ok');
};



describe('trash module', () => {
  beforeEach(async () => {
    // remove dir (or not), ensure its gone
    // console.log(`deleting ${dir}`);
    // const r = await fs.rmdir(dir, err => {
    //   err.code === 'ENOENT' || console.log(err);
    // });

    // //
    // assert.isFalse(fs.existsSync(dir));
    if (!fs.existsSync(testDir)) {
      console.log('creating!');
      fs.mkdirSync(testDir);
    }
    // assert.isTrue(fs.existsSync(dir));
  });

  it('test simple deletion', () => {
    fs.writeFileSync(
      path.join(config.testDir, 'foo.jpg'), //
      'mock content'
    ); 
  });
  //   //

  it.only('test removeFolder', async () => {

	assert(fs.existsSync(testDir),'directory not gone!');

	const mock1 = path.join(testDir, 'mock1.jpg');
	const mock2 = path.join(testDir, 'mock2.jpg');
	const mock3 = path.join(testDir, 'mock3.jpg');

	mockfile( mock1, mock2, mock3 );

	await helpers.trashSync( mock1, mock3 );

	assert(!fs.existsSync(mock1));
	assert(fs.existsSync(mock2));
	assert(!fs.existsSync(mock3));

	await helpers.removeFolder(testDir);
	assert(!fs.existsSync(testDir),'directory not gone!');

  });
});
