'use strict';

import {
    assert,
    fail,
    expect
} from 'chai';
import path from 'path';
import fs from 'fs';

import {
    mockfile,
    config
} from './_testtools';
const testDir = config.testDir;

import helpers from '../src/helpers';
import Family from '../src/model/Family';

const errCB = err => {
    if (err) fail('callback failed');
    else console.log('ok');
};


describe('trash module', () => {
    beforeEach(async () => {
        await helpers.removeFolder(testDir);

        assert.isFalse(fs.existsSync(testDir));
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir);
        }
        // assert.isTrue(fs.existsSync(dir));
    });

    it('trash test with removeFolder', async () => {
        assert(fs.existsSync(testDir), 'directory not gone!');

        const mockFiles = [1, 2, 'A', 'B'].map(
            v => path.join(testDir, `mock${v}`)
        );
        const mockFiles2 = [...mockFiles];

        mockfile(...mockFiles);

        await helpers.trashSync(mockFiles[0], mockFiles[2]);

        assert(!fs.existsSync(mockFiles[0]));
        assert(fs.existsSync(mockFiles[1]));
        assert(!fs.existsSync(mockFiles[2]));
        assert(fs.existsSync(mockFiles[3]));

        await helpers.removeFolder(testDir);
        assert(!fs.existsSync(testDir), 'directory not gone!');
    });
});