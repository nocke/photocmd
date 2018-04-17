// excellent answer:
// https://stackoverflow.com/a/33843314/444255

const log = console.log; // just shorthand

// as seen in many places
function promiseTimeout(time, value) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() { resolve(value); }, time);
	});
};

async function foo() {
	log('foo start');
	Promise.resolve('apple')
	.then((a) => {log('good inbetween step '+a); return 'pear'})
	.then(function(v) {
		return promiseTimeout(1000,v)
	});
	// .then(function(w) {
	// 	  log('bad inbetween step '+w)
	// });
	log('foo end');
};

log('start');
foo().then(function(){ log('good end, ')});
//log('bad end');
