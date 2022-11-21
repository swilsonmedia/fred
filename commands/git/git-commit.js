import { exec } from 'child_process';
import { promisify } from 'util';
import {log, logError, logSuccess} from '../../helpers/log.js';
import {getLocalUserBranch} from './helpers/branch.js';
import inquirer from 'inquirer';

const execPromise = promisify(exec);

export const cmd = 'commit';

export const description = 'Commit change to local and remote';

export function builder(yargs){
    return yargs
        .option('c', {
            alias: 'casenumber',
            type: 'number',
            description: 'Case number'
        })
        .option('m', {
            alias: 'message',
            type: 'string',
            description: 'Commit Message'
        });
}

export async function handler(args){
    try {
        const { casenumber, message } = args;
        const branchName = await getLocalUserBranch(casenumber);
        const commitCaseNumber = casenumber || +/fb\-(\d+)/gi.exec(branchName)[1];

        let commitMessage = message;

        if(!commitMessage){
            const answer = await inquirer.prompt([{
                name: 'message',
                message: 'Please enter a commit message',
                type: 'input'
            }]);

            commitMessage = answer.message;
        }

        let commands = [
            `git switch ${branchName}`,
            `git commit -m "BugzId: ${commitCaseNumber} - ${commitMessage}"`,
            'git push'
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
        
        logSuccess(`Commit made to ${branchName} and remote is complete!`);
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}