'use strict';

import chai from 'chai';
import path from 'path';

const assert = chai.assert; // shorthand

// async function x(aPromise) {
// 	await aPromise
// }

// a simple promise function
function promised42() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(42), 50);
  });
}

function alwaysReject() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('duh'), 50);
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

  // testing the new ES7 functions
  // and promises
  it('Async - Await', () => {
    return promised42() // return leads to guarantee that we wait for promise
      .then(v => {
        assert.equal(v, 42);
      })
      .catch(reason => {
        throw new Error('was not supposed to fail'+reason);
      });
  });
});
