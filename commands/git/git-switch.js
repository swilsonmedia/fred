import command from '../../helpers/command.js';
import {logError, logSuccess} from '../../helpers/log.js';
import {getBranch} from './helpers/branch.js';


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

        await command(`git switch ${branch}`, args.verbose);
        
        logSuccess(`Switched to ${branch}`);
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}