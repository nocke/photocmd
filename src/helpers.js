/*
* Franks small set of little helpers.
* i.e. sanity checks
*/
import path from 'path';
import fs from 'fs';

function enforce(expr, msg = 'enforce failed', ...args) {
  if (expr !== true) {
    throw new Error(msg, args);
  }
}

function fail(msg = 'failing', ...args) {
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
function move(oldPath, newPath, callback) {
  fs.rename(oldPath, newPath, function(err) {
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

    readStream.on('close', function() {
      fs.unlink(oldPath, callback);
    });

    readStream.pipe(writeStream);
  }
}


// https://stackoverflow.com/a/25069828/444255
function removeFolder(location) {
    
    function getUserHome() {
        return path.resolve(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']);
    }
    
    enforce(location.trim() != '/','MUST NOT be root. DANGEROUS!');
    
    const absPath = path.resolve(location);
    const parentPath = path.resolve(path.join(location,'..'));

    enforce (absPath != path.parse(absPath).root, 'NOT working on ROOT' );
    enforce (parentPath != path.parse(absPath).root, 'NOT working top-level-dir');
    enforce (parentPath !== '/home', 'NOT working on user home dir');
    enforce (parentPath !== getUserHome(), 'NOT working on user top-level folder');

    // precaution: stay clear of project directories and direct subdirs
    for (let test of ['.git','package.json','../.git','../package.json']) {
        console.log(test);
        enforce (
            ! fs.existsSync( path.join(location,test)), //
            `NOT deleting project dir (found "${test}")`
        );
    }


//   fs.readdir(location, function(err, files) {
//     async.each(
//       files,
//       function(file, cb) {
//         file = location + '/' + file;
//         fs.stat(file, function(err, stat) {
//           if (err) {
//             return cb(err);
//           }
//           if (stat.isDirectory()) {
//             removeFolder(file, cb);
//           } else {
//             fs.unlink(file, function(err) {
//               if (err) {
//                 return cb(err);
//               }
//               return cb();
//             });
//           }
//         });
//       },
//       function(err) {
//         if (err) return next(err);
//         fs.rmdir(location, function(err) {
//           return next(err);
//         });
//       }
//     );
//   });
}

export default {enforce, fail, move, removeFolder };
