'use strict';

import { assert, fail } from 'chai';
import path from 'path';
import fs from 'fs';

import trash from 'trash';
import config from './config';
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
    if (!fs.existsSync(testDir))
    {
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
    await helpers.removeFolder(testDir);
    console.log('going on');

    // one after Promisify:
    //assert(!fs.existsSync(testDir),'directory not gone!');

  });
});
