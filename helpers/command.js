import { exec } from 'child_process';
import { promisify } from 'util';
import {log} from './log.js';

const execPromise = promisify(exec);

export default function command(commands, verbose){
    const cmds = Array.isArray(commands) ? commands : [commands];

    return new Promise(async res => {     
        const responses = [];

        for(const cmd of cmds){
            if(verbose){
                log(`Running command: ${cmd}`);
            }
            
            const response= await execPromise(cmd);

            responses.push(response);
            
            if(verbose){
                log(response.stdout);
            }
        }
        
        res(responses);
    });
}