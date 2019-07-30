const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use('/public', express.static((path.join(__dirname), './build')))

const template = fs.readFileSync(
    path.join(__dirname, './build/index.html'),
    'utf8'
)

app.get('*', function(req, res) {
    res.send(template)
})

app.listen(3000, function() {
    console.log('server is running at localhost:3000')
})
