import chalk from 'chalk';

export const log = console.log;

export function logError(message){
    log(chalk.red(message));
}

export function logSuccess(message){
    log(`\n${chalk.green.bold(message)}\n`);
}

