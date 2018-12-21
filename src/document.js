
import XLSX from 'xlsx';
import fs from 'fs';

export default class XslxDocument {
    filename = null;
    sheets = [];

    constructor(filename){        
        if(!fs.existsSync(filename)){
            throw `${filename} does not exists`;
        }
        this.filename = filename;
        this.sheets = this._readSheets();
    }

    getSheets(){
        return this.sheets;
    }

    _readSheets() {
        let s = [];
        let workbook = XLSX.readFile(this.filename);
        workbook.SheetNames.map(name => {
            s.push(workbook.Sheets[name]);
        });
        return s;
    }
}