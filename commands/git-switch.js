import { exec } from 'child_process';
import { promisify } from 'util';
import {log, logError, logSuccess} from '../helpers/log.js';
import {getBranch} from '../helpers/branch.js';

const execPromise = promisify(exec);

export const cmd = 'switch';

export const description = 'Easily switch to a local or remote branch';

export function builder(yargs){
    return yargs.option('c', {
        alias: 'casenumber',
        type: 'number',
        description: 'Case number'
    });
}

export async function handler(args){
    const { casenumber } = args;

    try {
        let branch = await getBranch(casenumber);

        const command = `git switch ${branch}`;

        if(args.verbose){
            log(`Running command: "${command}"`);
        }
        
        const response = await execPromise(command);    

        if(args.verbose){
            log(response.stdout);
        }
        
        logSuccess(`Switched to ${branch}`);
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}