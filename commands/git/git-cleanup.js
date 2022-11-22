import command from '../../helpers/command.js';
import {logError, logSuccess} from '../../helpers/log.js';
import {getLocalUserBranch} from './helpers/branch.js';

export const cmd = 'cleanup';

export const description = 'Remove local and remote branch by case #';

export function builder(yargs){
    return yargs
        .option('c', {
            alias: 'casenumber',
            type: 'number',
            description: 'Case number'
        });
}

export async function handler(args){
    try {
        const { casenumber } = args;
        const branchName = await getLocalUserBranch(casenumber);
        
        await command([
            `git switch ${branchName}`,
            'git switch master',
            `git branch -D ${branchName}`,
            `git push -d origin ${branchName}`
        ], args.verbose);
        
        logSuccess(`Removed ${branchName}`);
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}