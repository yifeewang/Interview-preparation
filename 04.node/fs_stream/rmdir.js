const fs = require('fs');
fs.rmdir('./mkdir',function(err){
  if(err) return;
  console.log('删除目录成功');
})
