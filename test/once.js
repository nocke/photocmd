'use strict'
import { mute } from "../src/util/log";

// the global nodejs object with some settings
import '../src/global'

const suiteMode = process.env.npm_package_scripts_test_single === 'mocha $1'

// cut the crap when running full suite
if ( suiteMode ) mute()
