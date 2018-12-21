
import XlsxDocument from './document';
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

class Manager {
    xlsxs = [];
    config = {};

    constructor(config){
        this.config = config;
    }

    readFile = (filename) => {
        this.xlsxs.push(new XlsxDocument(filename, this.config));
    }

    _convertJSON = (rows) => {
        let obj={};
        if(rows.length === 0){
            return obj;
        }

        Object.keys(rows[0]).map(k => {
            if(k !== this.config.key){
                rows.map(row => {
                    if(!obj[k]){
                        obj[k] = {};
                    }
                    obj[k][row[this.config.key]] = row[k]; 
                })
            }
        })

        return obj;
    }

    _convert = () => {
        let sheets = [];
        
        this.xlsxs.map( xlsx => {
            xlsx.sheets.map(s => {
                sheets.push(s);
            })
        });

        let rows = [];

        sheets.map(sheet => {
            let json = XLSX.utils.sheet_to_json(sheet);
            rows = [...rows, ...json];
        }); 
        
        return this._convertJSON(rows);
    }

    convert = () => {
        this._write(this.config.output, this._convert());
    }

    _write = (dir, content) => {
        Object.keys(content).map(header => {
            let data = content[header];
            this._writeToFile(path.resolve(dir, `${header}.${this.config.format}`), JSON.stringify(data, null, '\t'));
        })
    }

    _writeToFile = (file, data) => {
        let exists = fs.existsSync(file);
        if(this.config.force){
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