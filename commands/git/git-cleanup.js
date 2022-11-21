import { exec } from 'child_process';
import { promisify } from 'util';
import {log, logError, logSuccess} from '../../helpers/log.js';
import {getLocalUserBranch} from './helpers/branch.js';
const execPromise = promisify(exec);

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
        const commands = [
            `git switch ${branchName}`,
            'git switch master',
            `git branch -D ${branchName}`,
            `git push -d origin ${branchName}`
        ];

        for(const command of commands){
            if(args.verbose){
                log(`Running command: "${command}"`);
            }
            
            const response = await execPromise(command);    

            if(args.verbose){
                log(response.stdout);
            }
        }
        
        logSuccess(`Removed ${branchName}`);
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}