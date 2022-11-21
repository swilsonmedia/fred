import { exec } from 'child_process';
import { promisify } from 'util';
import user from '../../helpers/user.js';
import {log, logError, logSuccess} from '../../helpers/log.js';
import { buildBranchName } from './helpers/branch.js';
import inquirer from 'inquirer';

const execPromise = promisify(exec);

export const cmd = 'checkout';

export const description = 'Creates a new branch by case #';

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

        const username = await user();
        
        let bugId = casenumber;

        if(isNaN(bugId)){
            const answer = await inquirer.prompt([{
                name: 'case',
                message: 'Please enter a case number',
                type: 'number'
            }]);
            if(isNaN(answer.case)){
                logError(`Please try again and enter a number`);
                process.exit(1);
            }

            bugId = answer.case;
        }


        const branchName = buildBranchName(username, bugId);

        const commands = [
            'git switch master',
            'git pull',
            `git checkout -b ${branchName}`,
            `git push -u origin ${branchName}`
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

        logSuccess(`Checkout created branch: ${branchName}`);
    } catch (error) {
        logError(error.stderr);
        process.exit(1);
    }
}