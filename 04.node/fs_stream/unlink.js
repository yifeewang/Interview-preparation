const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'readFile-demo.js')
const copyToPath = path.join(__dirname,'copyFile-demo.js')
const writePath = path.join(__dirname, 'writeFile-demo.js');
const appendPath = path.join(__dirname, 'appendFile-demo.js');

// -- 异步文件删除
// fs.unlink(filePath,function(err){
// 	if(err) return;
// });
// -- 同步删除文件
fs.unlinkSync(filePath,function(err){
    if(err) return;
});
