
import XlsxDocument from './document';
import fs from 'fs';
import path from 'path';

class Manager {
    xlsxs = [];
    config = {}

    constructor(config){
        this.config = config;
    }

    readFile = (filename) => {
        this.xlsxs.push(new XlsxDocument(filename, config));
    }

    _validateData = (data) => {
        let keyMap = new Map();
        data.map(_d => {
            let key = _d[config.key];
            if(keyMap.has(key)){
                let prev = keyMap.get(key);
                let pos = {};
                pos.prev = `${prev[config.metaPrefix + 'FILENAME']}[${prev[config.metaPrefix + 'SHEETNAME']}]`;
                pos.next = `${_d[config.metaPrefix + 'FILENAME']}[${_d[config.metaPrefix + 'SHEETNAME']}]`;
                throw `${key} is dulplicated in ${pos.prev} and ${pos.next}`;
            }
        })
    }

    _convert = () => {
        let data = [];
        let headers = [];
        this.xlsxs.map(
            xlsx => {
                let {_headers, _data} = xlsx.getData();
                data = data.concat(_data);
                headers = headers.concat(_headers);
            }
        );

        this._validateData(data);

        let content = {};
        headers.filter(header => header !== config.key && header.startsWith(config.metaPrefix)).map(header => {
            content[header] = {
                header: header,
                data: {}
            };
            data.map(_d => {
                let key = _d[config.key];
                if(!key){
                    console.warn(`col ${config.key} has emplty cell`);
                }else{
                    content[header]['data'][key] = _d[key] || "";
                }
            })
        });

        let result = [];
        Object.keys(content).map(key => {
            result.push(content[key]);
        });

        return result;
    }

    convert = () => {
        this._write(config.output, this._convert());
    }

    _write = (dir, content) => {
        content.map(_c => {
            let {header, data} = _c;
            this._writeToFile(path.resolve(dir, `${header}.${config.format}`), JSON.stringify(data, null, '\t'));
        })
    }

    _writeToFile = (file, data) => {
        let exists = fs.existsSync(file);
        if(config.force){
            if(exists){
                console.warn(`${file} will be overrides`);
            }
        } else {
            if(exists){
                throw `${file} already exists`;
            }
        }
        fs.writeFileSync(file, data);
    }
}

export default Manager;