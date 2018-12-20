import program from 'commander';

export const defaultConfig = {
    start: 1,
    key: 'key',
    format: 'json',
    output: './',
    force: false,
    metaPrefix: '__@@__'
}

const config = {
    ...defaultConfig,
    files: []
}

export function getConfig(){
    program
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
        .on("command:convert", function(files){
            files.map(file => {
                config.files.push(file);
            });
        }).parse(process.argv);

    return Promise.resolve(config);
}