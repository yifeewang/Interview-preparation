const path = require('path')
const fs = require('fs')
const readDirPath = path.join(__dirname, '../path');
const writeDirPath = path.join(__dirname, 'copyDir')

fs.readdir(readDirPath, (err1, data1) => {
    if(err1) return console.log('errrr', err1)
    fs.readdir(writeDirPath, (err, data) => {
        if(!err && data) {
            fs.rm(writeDirPath, {recursive:true}, ()=>{}) 
            return
        }
        fs.mkdirSync(writeDirPath)
        data1.forEach(item => {
            const fileName = path.parse(item).name
            const readDatas = fs.readFileSync(`${readDirPath}/${item}`)
            fs.writeFileSync(`${writeDirPath}/${fileName}.md`, readDatas, {flag: 'w'})
        })
    })
})