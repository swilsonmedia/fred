import { readFile, writeFile } from 'fs/promises';
import { parse } from 'csv-parse';
import { logError, logSuccess } from '../../helpers/log.js';

function parseCSV(input) {
    return new Promise(res => {
        parse(input, {
            columns: true
        }, function (err, records) {
            res(records);
        });
    });
}


export const cmd = 'csvtojson';

export const description = 'Converts a CSV to JSON';

export function builder(yargs) {
    return yargs
        .option('f', {
            alias: 'file',
            type: 'string',
            description: 'CSV file path'
        })
        .option('o', {
            alias: 'output',
            type: 'string',
            description: 'filename to output to'
        });
}

export async function handler(args) {
    try {
        const file = args.f ? args.f : args._.length > 1 ? args._[1] : '';

        if (!file || !/\.[a-zA-Z]{3,4}$/.test(file)) {
            logError(`Please try again and enter a file path`);
            process.exit(1);
        }

        const input = await parseCSV(await readFile(file, 'utf8'));

        const filename = args.o || `${file.split('.')[0]}.json`;

        await writeFile(filename, JSON.stringify(input, null, 2), 'utf8');

        logSuccess(`Wrote file: ${filename}`);
    } catch (error) {
        logError(error.stderr);
        process.exit(1);
    }
}