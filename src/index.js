#!/usr/bin/env node

'use strict'

import program from 'commander'
import pjson from '../package.json'

import log, { info, warn } from './log'

import deleteAction from './deleteAction'


const promiseWrap = (func) => (...args) => {

	const cmd = args[args.length - 1]
	func.call(null, ...args)
		.then(result => {
			info('OK')
		})
		.catch(err => {
			warn(err.message) // (makes log in error itself superficious)
			if (cmd.verbose)
				log(err.stack)
		})
}

console.log('\n')
program.version(pjson.version); // .version('0.0.1')

program
	.command('delete <dir> [moreDirs...]') // optional and mandatory params
	.alias('del')
	.description('delete \"lonely\" or \"unstarred" families of images')
	.option('-v, --verbose', 'log more details')
	.option('-l, --live', 'actually do it')
	.option('-o, --lonely', 'delete lone images')
	.option('-s, --unstarred', 'delete unstarred images')
	.action(promiseWrap(deleteAction))

program.on('--help', function() {
	console.log([
		'  Use photo [command] --help for more options on the command',
		'  e.g. photo delete --help'
	].join("\n"))
})

// if no params, output help:
if (process.argv.length == 2)
	process.argv.push('--help')

// in help case, parse exits ( .outputHelp() would avoid this )
try {
	// the actual command execution:
	program.parse(process.argv)
} catch (err) {
	log('############# this should NEVER be reached')
}

// did command run? → if not, output help
const noRun = 'string' === typeof program.args[program.args.length - 1]
if (noRun) program.help()

// note: an exit() here prevents command execution → triggered as a promise?
