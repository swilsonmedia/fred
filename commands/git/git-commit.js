import { exec } from 'child_process';
import { promisify } from 'util';
import {log, logError, logSuccess} from '../../helpers/log.js';
import inquirer from 'inquirer';

const execPromise = promisify(exec);

export const cmd = 'commit';

export const description = 'Commit change to local and remote';

export function builder(yargs){
    return yargs
        .option('m', {
            alias: 'message',
            type: 'string',
            description: 'Commit Message'
        });
}

export async function handler(args){
    try {
        const { message } = args;

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
            `git commit -m "${commitMessage}"`,
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
        
        logSuccess(`Commit made to local and remote branch complete!`);
    } catch (error) {
        logError(error);
        process.exit(1);
    }
}