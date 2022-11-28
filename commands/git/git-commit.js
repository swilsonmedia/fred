import {log, logError, logSuccess} from '../../helpers/log.js';
import inquirer from 'inquirer';
import command from '../../helpers/command.js';

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
        const status = await command('git status');

        const currentBranch = await command('git branch --show-current');

        const bugzId = /fb\-(\d+)/gi.exec(currentBranch[0].stdout)[1]

        let commitMessage = message;    

        if(/nothing\sto\scommit/gi.test(status[0].stdout)){
            logError('No changes to commit');
            process.exit(1);
        }

        if(/untracked|Changes\snot\sstaged\sfor\scommit/gi.test(status[0].stdout)){
            log('You have untracked or unstaged changes\n\n')

            const confirm = await inquirer.prompt([{
                name: 'track',
                message: 'Do you want to include all changes in this commit?',
                type: 'confirm'
            }]);

            if(!confirm.track && !/Changes\sto\sbe\scommitted/gi.test(status[0].stdout)){
                logError('No staged changes to commit');
                process.exit(1);
            }

            if(confirm.track){
                command('git add .', args.verbose);
            }
        }

        if(!commitMessage){
            log('');
            const answer = await inquirer.prompt([{
                name: 'message',
                message: 'Please enter a commit message',
                type: 'input'
            }]);

            commitMessage = answer.message;
        }

        if(!/bugzid/gi.test(commitMessage)){
            commitMessage = `BugzId: ${bugzId} - ${commitMessage}`;
        }

        await command([
            `git commit -m "${commitMessage}"`,
            'git push'
        ], args.verbose);
        
        logSuccess(`Commit made to local and remote branch complete!`);
    } catch (error) {
        logError('An error occurred:\n');
        log(error);
        process.exit(1);
    }
}