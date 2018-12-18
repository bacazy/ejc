import program from 'commander';

export const config = {
    start: 2,
    key: 'key',
    format: 'json',
    output: './',
    force: false,
    metaPrefix: '__@@__'
}

export function parseOptions(){
    return program
        .version('0.0.1', '-v, --version')
        .usage("[options] <file ...>")
        .command("convert <files...>")
        .option("-k, --key <key>", 'key col header')
        .option('-s, --start <start>', 'data start row')
        .option('-f, --format <format>', 'output file format')
        .option('-F, --force', 'write file in force, warning: will overrides the file with the same name!')
        .option('-o, --output <dir>', 'output dir')
        .on('option:key', function (key) {
            config.key = key;
        })
        .on('option:output', function (output) {
            config.output = output;
        })
        .on('option:start', function (start) {
            config.start = parseInt(start)
        })
        .on('option:format', function (format) {
            if(format === 'json'){
                config.format = 'json';
            }else{
                console.warn(`${format} is not surpport yet, and use json instead!`);
            }            
        })
        .on('option:force', function () {
            config.force = true;          
        })
}