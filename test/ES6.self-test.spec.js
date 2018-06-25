'use strict';

import chai, { assert } from 'chai';
import path from 'path';
import sinon from 'sinon';
import { setLevel, LEVELS, info, log, warn, error, enforce, fail } from '../src/log';


// a simple promise function
function promised42() {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(42), 20);
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
	it('Async - Await I', () => {
		let promiseWrap = sinon.spy(promised42);
		assert(promiseWrap.notCalled);

		promiseWrap()
			.then(v => {
				assert.equal(v, 42);
				//console.log(promiseWrap.callCount);
				assert(promiseWrap.calledOnce); // property!
			})
			.catch(reason => {
				throw new Error('was not supposed to fail' + reason);
			});
	});

	// same stuff with asyn/await →  http://rossboucher.com/await/
	it('Async - Await II', async () => {
		let promiseWrap = sinon.spy(promised42);
		assert(promiseWrap.notCalled);

		let v = await promiseWrap();
		assert.equal(v, 42);
		assert(promiseWrap.calledOnce); // simple property (no fn call needed)
	});

	// Promises recap ( → https://stackoverflow.com/a/50986732/444255 )
	const timeoutPromise = (time) => {
		return new Promise((resolve, reject) => {
			if (time === 0)
				reject({ 'message': 'invalid time 0' })
			setTimeout(() => resolve('done'), time)
		})
	}

	it('promise selftest', async () => {

		// positive test
		let r = await timeoutPromise(20)
		assert.equal(r, 'done')

		// negative test
		try {
			await timeoutPromise(0)
			// a failing assert here is a bad idea, since it would lead into the catch clause…
		} catch (err) {
			// optional, check for specific error (or error.type, error. message to contain …)
			assert.deepEqual(err, { 'message': 'invalid time 0' })
			return  // this is important
		}

		assert(false,'timeOut must throw')
	})

});
