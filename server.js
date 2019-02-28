const express = require('express')
const fs =require('fs')
const path = require('path')
const app = express()

app.use(express.static((path.join(__dirname), './dist')))

app.use('*', (req, res) => {
  fs.readFileSync(path.join(__dirname, './dist/index.html'), (err, data) => {
    if(err) throw err
    res.send(data)
  })
})

app.listen(3001, () => {
    console.log('server is running at localhost:3001');
})
