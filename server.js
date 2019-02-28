const express = require('express')
const fs =require('fs')
const path = require('path')
const app = express()

app.use('/static', express.static((path.join(__dirname), './dist')))

app.use('*', function(req, res) {
  console.log(path.join(__dirname, './dist/index.html'))
  const file = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf-8')
  res.send(file)
})

app.listen(3001, function() {
    console.log('server is running at localhost:3001');
})
