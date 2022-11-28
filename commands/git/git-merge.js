import { log, logError, logSuccess} from '../../helpers/log.js';
import {getLocalUserBranch} from './helpers/branch.js';
import inquirer from 'inquirer';
import command from '../../helpers/command.js';

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
        .option('k', {
            alias: 'keep',
            type: 'boolean',
            description: 'Do not delete local and remote branches after merge'
        })
}

export async function handler(args){
    try {
        const { casenumber, message } = args;
        const branchName = await getLocalUserBranch(casenumber);
        const commitCaseNumber = casenumber || +/fb\-(\d+)/gi.exec(branchName)[1];
        let commitMessage = message;



        if(!commitMessage){
            log('');

            await command(`git switch ${branchName}`, args.verbose);
            
            const question = {
                name: 'message',
                message: 'Please enter a commit message',
                type: 'input'
            };
            
            const commitLog = await command(`git log -n 100 --author=$(git config --get user.email) --pretty=oneline | grep -i "bugzid: ${commitCaseNumber}"`);

            if(!!commitLog[0].stdout){
                const parsedMessage = /bugzid:\s\d+\s\-\s(.*)/gi.exec(commitLog[0].stdout.trim().split('\n')[0]);

                if(parsedMessage.length > 1){
                    question.default = parsedMessage[1];
                }
            }
            
            const answer = await inquirer.prompt([question]);
            
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

        if(!args.keep){
            commands = commands.concat([
                `git branch -D ${branchName}`,
                `git push -d origin ${branchName}`
            ]);
        }

        await command(commands, args.verbose);
        
        logSuccess(`Merge of ${branchName} is complete!`);
    } catch (error) {
        logError('An error occurred:\n');
        log(error);
        process.exit(1);
    }
}