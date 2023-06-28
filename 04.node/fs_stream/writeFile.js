const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'readFile-demo.js')
const writePath = path.join(__dirname, 'writeFile-demo.js');

// -- 同步读取文件
const fileResult=fs.readFileSync(filePath,'utf8');

// fs.writeFile(writePath, fileResult, function(err) {
//     if (err) {
//         throw err;
//     }
//     // 写入成功后读取测试
//     const data = fs.readFileSync(writePath, 'utf-8');
//     console.log('new data -->'+data);
// })

fs.writeFile(writePath, '这是追加的值！！', {flag: 'a'}, function(err) {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    const data = fs.readFileSync(writePath, 'utf-8');
    console.log('new data -->'+data);
})