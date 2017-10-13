function promised42() {
	console.log('promise42');
	return new Promise((resolve, reject) => {
	  setTimeout(() => resolve(42), 50);
	});
}

//
async function wrap42() {
	let r = await promised42();
	console.log('hallo');
	console.log('halli');
	console.log('tween '+r);
	return r;
}

// regular promise use (works)
// promised42().then(v => console.log(v));

// trying await:
console.log('finally '+wrap42());


// http://rossboucher.com/await/#/15
// Following the same rule, you can't have a top level await.

