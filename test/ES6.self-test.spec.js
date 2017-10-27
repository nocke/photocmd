'use strict';

import chai, {assert} from 'chai';
import path from 'path';
import sinon from 'sinon';

// a simple promise function
function promised42() {
	//console.log('promise42');
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(42), 50);
	});
}

describe('ES6 self-test', () => {
	it('Array', () => {
		var a = [1, 2, 3];
		assert(a.includes(2), 'one');
		assert(!a.includes(4), 'two');
	});

	it('Set', () => {
		var mySet = new Set();
		mySet.add(1); // Set { 1 }
		mySet.add(5); // Set { 1, 5 }

		assert(mySet.has(1));
		assert(!mySet.has(3));
		assert(mySet.size === 2);
	});

	// classic promise testing:
	it('Async - Await', () => {
		let promiseWrap = sinon.spy(promised42);
		assert(promiseWrap.notCalled);

		promiseWrap()
			.then(v => {
				assert.equal(v, 42);
				console.log(promiseWrap.callCount);
				assert(promiseWrap.calledOnce); // property!
			})
			.catch(reason => {
				throw new Error('was not supposed to fail' + reason);
			});
	});

	// same stuff with asyn/await →  http://rossboucher.com/await/
	it('Async - Await', async () => {
		let promiseWrap = sinon.spy(promised42);
		assert(promiseWrap.notCalled);

		let v = await promiseWrap();
		assert.equal(v, 42);

		assert(promiseWrap.calledOnce); // property!
	});
});
