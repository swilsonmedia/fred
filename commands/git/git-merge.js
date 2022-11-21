import { exec } from 'child_process';
import { promisify } from 'util';
import {log, logError, logSuccess} from '../../helpers/log.js';
import {getLocalUserBranch} from './helpers/branch.js';
import inquirer from 'inquirer';

const execPromise = promisify(exec);

export const cmd = 'merge';

export const description = 'Merge a case by passing a case number and commit message';

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
        })
        .option('r', {
            alias: 'remove',
            type: 'boolean',
            description: 'Removes local and remote branches after merge'
        })
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
            'git switch master',
            'git pull',
            `git switch ${branchName}`,
            `git merge master -m "BugzId: ${commitCaseNumber} - merging master to branch"`,
            'git switch master',
            `git merge --squash ${branchName}`,
            `git commit -m "BugzId: ${commitCaseNumber} - ${commitMessage}"`,
            'git push'
        ];

        if(args.remove){
            commands = commands.concat([
                `git switch ${branchName}`,
                'git switch master',
                `git branch -D ${branchName}`,
                `git push -d origin ${branchName}`
            ]);
        }

        for(const command of commands){
            if(args.verbose){
                log(`Running command: "${command}"`);
            }
            
            const response = await execPromise(command);    

            if(args.verbose){
                log(response.stdout);
            }
        }
        
        logSuccess(`Merge of ${branchName} is complete!`);
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}