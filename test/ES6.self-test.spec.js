'use strict'

import chai from 'chai';
import path from 'path';

// shorthand
const assert = chai.assert;

describe('ES6 self-test', () => {

	it('Array', () => {

		var a = [1, 2, 3];
		assert( a.includes(2),'one' );
		assert( !a.includes(4), 'two' );
	});

	it('Set', () => {

		var mySet = new Set();
		mySet.add(1); // Set { 1 }
		mySet.add(5); // Set { 1, 5 }

		assert( mySet.has(1) );
		assert( !mySet.has(3) );
		assert( mySet.size === 2 );
	});


});
