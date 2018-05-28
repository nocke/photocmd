'use strict'

/**
 * testing whole command from command line
 *
 * - first simulation
 * - then actual deleting (large files used)
 *
 */

import chai, { assert } from 'chai';
import path from 'path';
import sinon from 'sinon';
import fs from 'fs';

import { mockfile, assertFiles, testconfig } from './_testtools';
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/log';

// test config
setLevel(LEVELS.INFO);
const testDir = testconfig.testCommandDir;
