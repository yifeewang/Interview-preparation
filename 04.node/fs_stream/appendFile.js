const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'readFile-demo.js')
const appendPath = path.join(__dirname, 'appendFile-demo.js');

// -- 同步读取文件
const fileResult=fs.readFileSync(filePath,'utf8');
// -- 异步另一种文件追加操作(非覆盖方式)
// 写入文件内容（如果文件不存在会创建一个文件）
// fs.appendFile(appendPath, fileResult, function(err) {
//     if (err) {
//         throw err;
//     }
//     // 写入成功后读取测试
//     const data = fs.readFileSync(appendPath, 'utf-8');
//     console.log('new data -->'+data);
// })
// -- 同步另一种文件追加操作(非覆盖方式)

fs.appendFileSync(appendPath, '// 同步追加一条新数据程序员成长指北789');