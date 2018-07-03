'use strict'
import { mute } from "../src/log";

const suiteMode = process.env.npm_package_scripts_test_single === 'mocha $1'

// cut the crap on running full suite
if (suiteMode) mute()
