import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';
import user from '../../../helpers/user.js';

const execPromise = promisify(exec);

export function buildBranchName(username, casenumber){
    return `users/${username}/fb-${casenumber}`;
}

export function getBranch(casenumber){
    return runBranchCommand('git branch -a', casenumber, (username, branch) => {
        if(new RegExp(`${username}|master`, 'gi').test(branch)){
            return true;
        }

        if(/releasetags/gi.test(branch)){
            return isReleaseTagInLast45Days(branch);
        }

        return false;
    });
}

function isReleaseTagInLast45Days(branch){
    return isWithinTimeFrame(diffInDaysFromToday(findDateFromString(branch)));
}

function isWithinTimeFrame(days){
    return days < 45;
}

function findDateFromString(str){
    return /\d+\/\d+\/\d+/.exec(str)[0]
}

function diffInDaysFromToday(date){
    const compare = new Date(date);
    const today = new Date();

    return (today.getTime() - compare.getTime()) / (1000 * 3600 * 24);
}

export function getLocalUserBranch(casenumber){
    return runBranchCommand('git branch', casenumber, (username, branch) => new RegExp(`${username}`, 'gi').test(branch));
}

function runBranchCommand(command, casenumber, filter){
    return new Promise(async (resolve, reject) => {
        const username = await user();

        const {stdout, stderr} = await execPromise(command);      

        if(stderr){
            reject(stderr);
        }

        const branches = Array.from(
            new Set(stdout.trim().split('\n')
                .filter(branch => filter(username, branch) && !branch.includes('HEAD'))
                .map(branch => branch.trim().replace(/\s*\*\s*/gi, '').replace('remotes/origin/', ''))
            )
        ).sort();

        if(!branches.length){
            reject('No branches exist');
            return;
        }

        if(isNaN(casenumber)){
            console.log('');
            const answer = await inquirer.prompt([{
                name: 'branch',
                message: 'Select the branch that you want to switch to',
                type: 'list',
                choices: branches
            }]);

            resolve(answer.branch);
        }else{
            const branch = buildBranchName(username, casenumber);

            if(!branches.includes(branch)){
                reject(`${branch} does not exist locally`);
            }

            resolve(branch);
        }
    })
}