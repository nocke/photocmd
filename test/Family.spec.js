'use strict'

import chai, {assert} from 'chai';
import path from 'path';
import sinon from 'sinon';

// system under test:
import Family from '../src/model/Family';

// REF http://chaijs.com/api/assert/

describe('Family Initialize', () => {

	let f;

	beforeEach(() => {
		console.log('beforeEach123');
	});

	// reactivate some time

	// it('plain initialize', () => {
	// 	f = new Family();
	// 	assert.typeOf(f, 'object');
	// });

	// it('array initialize', () => {
	// 	f = new Family(['foo.jpg', 'bar.png']);
	// 	assert.typeOf(f, 'object');
	// 	assert.deepEqual(f._fam, ['foo.jpg', 'bar.png']);
	// });

	it('bad initialize', () => {
		assert.throws(() => {
			new Family(42);
		});
	});

});
