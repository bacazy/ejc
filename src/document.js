
import Excel from 'exceljs';
import fs from 'fs';

export default class XslxDocument {
    filename = null;
    config = {};

    constructor(filename, config){        
        if(!fs.existsSync(filename)){
            throw `${filename} does not exists`;
        }
        this.filename = filename;
        this.config = config;

        this.getData = this.getData.bind(this);
    }

    async getData() {
        let workbook = new Excel.Workbook();
        let content = await workbook.xlsx.readFile(this.filename).then(data => {
            return data;
        });

        return content;
    }
}