#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';
import * as git from '../commands/git/git.js';
import * as csv from '../commands/csv/csv-tojson.js';

yargs(hideBin(process.argv))
    .scriptName('fred')
    .usage('')
    .help('h')
    .alias('h', 'help')
    .showHelpOnFail(true)
    .demandCommand(1)    
    .command(git.cmd, git.description, git.builder)
    .command(csv.cmd, csv.description, csv.builder, csv.handler)
    .argv;