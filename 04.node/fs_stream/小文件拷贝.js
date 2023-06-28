const fs = require('fs');
const path = require('path');
const readFilePath = path.join(__dirname, 'readFile.js');
const writeFilePath = path.join(__dirname, '小文件拷贝-demo.js');
const copyFilePath = path.join(__dirname, '小文件拷贝-demo2.js');

fs.readFile(readFilePath, function (err, data) {
    if(err) {
        console.log(111, err)
        return;
    }
    const dataStr = data.toString();
    fs.writeFile(writeFilePath, dataStr, {flag: 'a'}, (err)=>{
        if(err) {
            console.log(222, err)
            return;
        }
        const fileData = fs.readFileSync(writeFilePath, 'utf8')
        console.log(333, fileData)
    })
})

fs.copyFileSync(readFilePath, copyFilePath);
let data = fs.readFileSync(copyFilePath, 'utf8');
console.log(444, data)