const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'readFile-demo.js')
const copyToPath = path.join(__dirname,'copyFile-demo.js')

// fs.copyFile(filePath, copyToPath, (err)=> {
//     console.log(111, err)
// })

fs.copyFileSync(filePath, copyToPath);
let data = fs.readFileSync(copyToPath, 'utf8');

console.log(data); // 程序员成长指北
