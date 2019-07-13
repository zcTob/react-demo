const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use('/static', express.static((path.join(__dirname), './build/static')))

app.use('*', function(req, res) {
  const file = fs.readFileSync(
    path.join(__dirname, './build/index.html'),
    'utf-8'
  )
  res.send(file)
})

app.listen(3000, function() {
  console.log('server is running at localhost:3000')
})
