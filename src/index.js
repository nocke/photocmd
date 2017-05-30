#!/usr/bin/env node
'use strict';

import program from 'commander';
import pjson from '../package.json';

import deleteAction from './deleteAction';

console.log('\n');
program.version( pjson.version );   // .version('0.0.1');

program
	.command('delete <dir> [moreDirs...]') // optional and mandatory params
	.description('delete \"lonely\" images of sorts')
	.option('-v, --verbose', 'log more details')
	.option('-l, --live', 'actually do it')
	.action( deleteAction );

// if no params, output help:
if (process.argv.length == 2 )
	process.argv.push('--help');

// in help case, parse exits ( .outputHelp() would avoid this )
try {
	program.parse(process.argv);
} catch (err) {
	console.error('Error: \"%s\n\nStacktrace: %s\"', err.message, err.stack)
	process.exit(6);
}

// did any command run? if not, output help
const noRun = 'string' === typeof program.args[program.args.length-1];
if (noRun) program.help();

// note: an exit() here prevents command execution (async reasons?)

