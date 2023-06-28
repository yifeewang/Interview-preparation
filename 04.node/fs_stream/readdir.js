const fs = require('fs');
fs.readdir('./',function(err,data){
  if(err) return;
  //data为一个数组
  console.log('读取的数据为：'+data);
});
