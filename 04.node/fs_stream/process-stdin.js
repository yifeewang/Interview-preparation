process.stdin.on('data', function (chunk) {
    console.log('stream by stdin', chunk)
    console.log('stream by stdin', chunk.toString())
})

// apple@macs-MacBook-Air node-demo % node process-stdin.js 
// hellohello
// stream by stdin <Buffer 68 65 6c 6c 6f 68 65 6c 6c 6f 0a>
// stream by stdin hellohello