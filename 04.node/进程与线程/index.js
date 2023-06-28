const fs = require('fs')
process.env.UV_THREADPOOL_SIZE = 64
setInterval(() => {
    console.log(new Date().getTime())
}, 3000)

fs.readFile('./kaola.html', () => {})