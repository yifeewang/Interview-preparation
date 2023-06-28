const fs = require('fs')
const path = require('path')
const startTime = new Date().getTime()
// 两个文件名
const fileName1 = path.resolve(__dirname, '../fs_stream', 'readme.md')
const fileName2 = path.resolve(__dirname, 'writeFile.md')
// 读取文件的 stream 对象
const readStream = fs.createReadStream(fileName1)
// 写入文件的 stream 对象
const writeStream = fs.createWriteStream(fileName2)
// 通过 pipe执行拷贝，数据流转
readStream.pipe(writeStream)
// 数据读取完成监听，即拷贝完成
readStream.on('end', function () {
    console.log('拷贝完成')
    const endTime = new Date().getTime()
    console.log('time: ', endTime-startTime)
})
