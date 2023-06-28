const fs = require('fs');
const path = require('path');
const readdirPath = path.join(__dirname, 'fs_stream')
const writedirPath1 = path.resolve(__dirname, 'fs1')

console.log(1111, readdirPath, writedirPath1)

// fs.readdir(readdirPath, function (err, data) {
//     if (err) return;
//     //data为一个数组
//     console.log('读取的数据为：' + data);
//     fs.mkdir(writedirPath1, (err) => {
//         if (err) return;
//         data.forEach(item => {
//             fs.copyFile(`${readdirPath}/${item}`, `${writedirPath1}/${item}`, (err) => {
//                 console.log(111, err)
//             })
//         })
//     });
// });
fs.mkdirSync('./fs1')
fs.readdir(readdirPath, function (err, data) {
    if (err) return;
    //data为一个数组
    console.log('读取的数据为：' + data);
    data.forEach(item => {
        const readStream = fs.createReadStream(`${readdirPath}/${item}`)
        const writeStream = fs.createWriteStream(`${writedirPath1}/${item}`)
        readStream.pipe(writeStream)
    })
});