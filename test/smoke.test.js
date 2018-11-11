'use strict'

import chai, { assert } from 'chai'
import path, { dirname } from 'path'
import sinon from 'sinon'
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/util/log'


describe( 'some common smoke tests', () => {
	it( 'global vars exist', () => {

		log(global.app)

		assert( global.app.root, 'at least root var exists' )
		assert( global.app.root, 'at least verbose flag exists' )
	} )

} )
