import { getConfig } from "./options";
import { convert } from ".";

getConfig().then(config => {
    let {files, ...options} = config;
    convert(files, options);
})