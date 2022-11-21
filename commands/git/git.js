import * as checkout from './git-checkout.js';
import * as cleanup from './git-cleanup.js';
import * as merge from './git-merge.js';
import * as switchCMD from './git-switch.js';
import * as commit from './git-commit.js';

export const cmd = 'git';

export const description = 'helpful GIT commands';

export function builder(yargs){
    return yargs
        .usage('')
        .command(checkout.cmd, checkout.description, yargs => checkout.builder(defaultBuilder(yargs)), checkout.handler)
        .command(cleanup.cmd, cleanup.description, yargs => cleanup.builder(defaultBuilder(yargs)), cleanup.handler)
        .command(merge.cmd, merge.description, yargs => merge.builder(defaultBuilder(yargs)), merge.handler)
        .command(commit.cmd, commit.description, yargs => commit.builder(defaultBuilder(yargs)), commit.handler)
        .command(switchCMD.cmd, switchCMD.description, yargs => switchCMD.builder(defaultBuilder(yargs)), switchCMD.handler)
        .showHelpOnFail(true)
        .demandCommand(1); 
}

function defaultBuilder(yargs){
    return yargs
        .option('verbose', {
            alias: 'v',
            type: 'boolean',
            description: 'Run with verbose logging'
        });
}