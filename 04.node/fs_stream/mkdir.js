const fs = require('fs')
fs.mkdir('./mkdir',function(err){
    if(err) return;
    console.log('创建目录成功');
})