/*
 * Franks small set of little helpers.
 * i.e. sanity checks
 */
var fs = require('fs');


export function enforce(expr, msg='enforce failed', ...args) {
	if( expr !== true )
	{
		throw new Error(msg, args);
	}
}

export function fail(msg='failing', ...args) {
	throw new Error(msg, args);
}



/**
 * A move() function that renames, if possible, or falls back to copying
 * https://stackoverflow.com/a/29105404/444255
 * @param {*} oldPath
 * @param {*} newPath
 * @param {*} callback
 *
 * TOTEST
 */
export function move(oldPath, newPath, callback) {

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}