// 小文件拷贝
const path = require('path')
const fs = require('fs')
const readFilePath = path.join(__dirname, '../fs_stream', 'readme.md');
const writeFilePath = path.join(__dirname, 'writeFile.md')
const startTime = new Date().getTime()
const readDatas = fs.readFileSync(readFilePath)
fs.writeFileSync(writeFilePath, readDatas, {flag: 'a'})
const results = fs.readFileSync(readFilePath, 'utf8')
const endTime = new Date().getTime()
console.log('time: ', endTime-startTime)