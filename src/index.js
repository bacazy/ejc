import { defaultConfig } from "./options";
import Manager from './manager';

function _convert(files, options){
    const manager = new Manager(options);
    files.map(file => {
        manager.readFile(file);
    });
    manager.convert();
}

export function convert(files=[], options={}) {    
    _convert(files, {...defaultConfig, ...options});
}
