
import Manager from './manager';
import { parseOptions } from './options';


parseOptions()
    .on("command:convert", function(files){
        const manager = new Manager();
        files.map(file => {
            manager.readFile(file);
        });
        manager.convert();
    })
    .parse(process.argv);

