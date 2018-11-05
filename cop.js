const fs = require('fs')
let a =fs.readFileSync('parsing-data-1/people.csv').toString().split('\n'); 
console.log(a)
