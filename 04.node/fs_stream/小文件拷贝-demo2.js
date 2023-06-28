const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'readFile-demo.js')
const filePath1 = path.resolve(__dirname,'readFile-demo.js')

console.log(1111, filePath, filePath1)
// -- 异步读取文件
fs.readFile(filePath,'utf8',function(err,data){
    console.log('async', data);// 程序员成长指北
});

// -- 同步读取文件
// const fileResult=fs.readFileSync(filePath,'utf8');
// console.log('not async', fileResult);// 程序员成长指北
