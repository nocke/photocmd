'use strict'

import chai from 'chai';
import path from 'path';

// shorthand
const assert = chai.assert;

// async function x(aPromise) {
// 	await aPromise
// }

// a simple promise function
function get42() {
	return new Promise(function (fulfill, reject) {
		console.log('entering...');
		setTimeout( ()=>{
			console.log('about to resolve...');
			resolve(42);
		}, 500);
	});
}


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



	it('Async - Await', () => {

		// await 'Hello';
		get42()
		.then((v) =>
			console.log('now got'+v)
		)
		.catch((reason) =>
			console.error(reason)
		);

		// TODO testing promise is not really happening

	});


});
