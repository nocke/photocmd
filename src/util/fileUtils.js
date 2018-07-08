'use strict'
/*
 * Franks small set of little fileUtils.
 * i.e. sanity checks
 */
import path from 'path'
import fs from 'fs'

import rimraf from 'rimraf'
import trash from 'trash'

import log, { info, warn, error, setLevel, LEVELS, enforce, fail } from './log'

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
	fs.rename(oldPath, newPath, function(err) {
		if (err) {
			if (err.code === 'EXDEV') {
				copy()
			} else {
				callback(err)
			}
			return
		}
		callback()
	})

	function copy() {
		var readStream = fs.createReadStream(oldPath)
		var writeStream = fs.createWriteStream(newPath)

		readStream.on('error', callback)
		writeStream.on('error', callback)

		readStream.on('close', function() {
			fs.unlink(oldPath, callback)
		})

		readStream.pipe(writeStream)
	}
}

// TODO enforceSafePath Function (for delete, trash, ...)

/**
 * a promisified (async/await compatible) folder removal function
 *
 * REF → stackoverflow.com/a/25069828/444255
 */
export async function removeFolder(dir) {
	function getUserHome() {
		return path.resolve(
			process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME']
		)
	}

	// precaution: stay clear of common folders (you can thank me later)
	enforce(dir.trim() != '/', 'MUST NOT be root. DANGEROUS!')
	const absPath = path.resolve(dir)
	const parentPath = path.resolve(path.join(dir, '..'))
	enforce(absPath != path.parse(absPath).root, 'NOT working on ROOT')
	enforce(parentPath != path.parse(absPath).root, 'NOT working top-level-dir')
	enforce(parentPath !== '/home', 'NOT working on user home dir')
	enforce(parentPath !== getUserHome(), 'NOT working on user top-level folder')

	// precaution:
	// stay clear of project directories and direct subdirs
	for (let test of ['.git', 'package.json', '../.git', '../package.json']) {
		enforce(!fs.existsSync(path.join(dir, test)), //
			`NOT deleting project dir (found "${test}")`
		)
	}

	return new Promise((resolve, reject) => {
		rimraf(
			dir, //
			{
				disableGlob: false
			}, //
			err => {
				if (err) reject(err)
				else resolve(true)
			}
		)
	}).then(() => {
		// console.log('deleted!') // just verifies order
	})


	// TODO: promisify and async this one:
	// https://stackoverflow.com/a/25069828/444255
	/*
      fs.readdir(location, function(err, files) {
        async.each(
          files,
          function(file, cb) {
            file = location + '/' + file
            fs.stat(file, function(err, stat) {
              if (err) {
                return cb(err)
              }
              if (stat.isDirectory()) {
                removeFolder(file, cb)
              } else {
                fs.unlink(file, function(err) {
                  if (err) {
                    return cb(err)
                  }
                  return cb()
                })
              }
            })
          },
          function(err) {
            if (err) return next(err)
            fs.rmdir(location, function(err) {
              return next(err)
            })
          }
        )
	  })
	  */

} // removeFolder

export async function trashSync(filesArray) {
	enforce(Array.isArray(filesArray), 'not an array')

	return new Promise((resolve, reject) => {
		trash(filesArray, {
			glob: false
		})
		.then(() => {
			// under linux returns an object with
			//	 path: path to trashed file location (“inside the can”)
			//	 info: pointing to original, undeleted file position
			// log(filesArray)
			resolve(true)
		}).catch((err) =>  {
			// TODO leave to higher level (or use reject?)
			error(err)
			return err
		})
	})
}

export default {
	move,
	removeFolder,
	trashSync
}
