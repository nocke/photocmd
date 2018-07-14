#!/usr/bin/env node

'use strict'

import program from 'commander'
import pjson from '../package.json'
import './global'
import log, { info, warn, error, LEVELS, setLevel } from './log'
import deleteAction from './action/deleteAction'
import listAction from './action/listAction'
import { promiseWrap } from './promiseUtils'

process.exitCode = 1 // assume there to be errors for now

log('')

program
	.version(pjson.version) // .version('0.0.1')
	.option('-v, --verbose', 'log more details')
	.on('option:verbose', () => {
		global.app.verbose = true
		log.setLevel(log.LEVELS.INFO)
	})

program
	.command('delete <dir> [moreDirs...]') // optional and mandatory params
	.alias('del')
	.description('–\ndelete \"lonely\" or \"unstarred" families of images\n')
	.option('-l, --live', 'actually do it')
	.option('-o, --lonely', 'delete lone images')
	.option('-s, --unstarred', 'delete unstarred images')
	.option('--skipCountdown', 'skip countdown on actual delete (case matters)')
	.action(promiseWrap(deleteAction))

program
	.command('list [moreParams...]')
	.description('–\nso far just dumping debug info...\n')
	.option('-y, --Y', 'some other fancy option')
	.option('-x', 'some fancy option')
	.action(promiseWrap(listAction))

program
	.on('--help', function() {
		log([
			'  Use photo [command] --help for more options on the command',
			'  e.g. photo delete --help'
		].join("\n"))
	})

// if no params, output help:
if (process.argv.length == 2)
	process.argv.push('--help')

// in help case, parse exits ( .outputHelp() would avoid this )
try {
	// actual command execution:
	const r = program.parse(process.argv)
} catch (err) {
	warn('should NEVER be reached')
	error('should NEVER be reached')
}

// did command run? → if not, output help
const noRun = 'string' === typeof program.args[program.args.length - 1]
if (noRun) program.help()

// nb: an exit() here prevents command execution (distinct process, and ending in promise)
