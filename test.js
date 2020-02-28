const fs = require('fs')
fs.readFile('./test.js',  'utf8',(err, data) => {
    console.log(data);
})
