const fs = require('fs');
const path = require('path');
const readFilePath = path.join(__dirname, 'readFile.js');
const writeFilePath = path.join(__dirname, '大文件拷贝-demo.js');
// copy 方法
function copy(from, to, size = 16 * 1024, callback) {
    // 打开源文件
    fs.open(from, 'r', (err, readFd) => {
      // 打开目标文件
      fs.open(to, 'w', (err, writeFd) => {
        let buf = Buffer.alloc(size);
        let readed = 0; // 下次读取文件的位置
        let writed = 0; // 下次写入文件的位置
  
        (function next() {
          // 读取
          fs.read(readFd, buf, 0, size, readed, (err, bytesRead) => {
            readed += bytesRead;
  
            // 如果都不到内容关闭文件
            if (!bytesRead) fs.close(readFd, err => console.log('关闭源文件'));
  
            // 写入
            fs.write(writeFd, buf, 0, bytesRead, writed, (err, bytesWritten) => {
              // 如果没有内容了同步缓存，并关闭文件后执行回调
              if (!bytesWritten) {
                fs.fsync(writeFd, err => {
                  fs.close(writeFd, err => !err && callback());
                });
              }
              writed += bytesWritten;
  
              // 继续读取、写入
              next();
            });
          });
        })();
      });
    });
  }
  
  copy(readFilePath, writeFilePath)