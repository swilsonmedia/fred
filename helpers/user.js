import appRootPath from 'app-root-path';
import {access, writeFile, readFile} from 'fs/promises';
import inquirer from 'inquirer';

const userConfig = appRootPath.resolve('./.fred');

export default async function user(){
    return new Promise(async (res, rej) => {
        try {
            await access(userConfig);
            const result = await readFile(userConfig);
    
            res(JSON.parse(result).user);
        } catch (error) {   
            const key = 'Please enter a username';

            const answer = await inquirer.prompt([{
                    name: 'username',
                    message: 'Please enter a username',
                    type: 'input'
                }]);
            
            await writeFile(userConfig, JSON.stringify({user: answer.username}), 'utf8');

            res(answer.username);
        }
    });
}
