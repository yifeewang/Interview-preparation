// 大文件拷贝 断点续传
const path = require('path')
const fs = require('fs')
const readFilePath = path.join(__dirname, '../fs_stream', 'readme.md');
const writeFilePath = path.join(__dirname, 'writeFile.md')
function copyFile(from, to, size=16*1024, callback) {
    const startTime = new Date().getTime()
    fs.open(from, 'r', (err,readfd) => {
        fs.open(to, 'w', (err, writefd) => {
            let buff = Buffer.alloc(size);
            let readPosition = 0;
            let writePosition = 0;
            function next() {
                fs.read(readfd, buff, 0, size, readPosition, (err, bytesRead) => {

                    readPosition += bytesRead

                    if(!bytesRead) {
                        const endTime = new Date().getTime()
                        console.log('time: ', endTime-startTime)
                        return fs.close(readfd, () => {console.log('关闭源文件')})
                    }
                    
                    fs.write(writefd, buff, 0, size, writePosition, (err, bytesWrite) => {
                        
                        if(!bytesWrite) {
                            fs.fsync(writefd, (err)=> {
                                fs.close(writeFd, err => !err && callback());
                            })
                        }
                        writePosition += bytesWrite
                        next();
                    })
                })
            };
            next()
        })
    })
}

copyFile(readFilePath, writeFilePath)