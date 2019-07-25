const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const ReactDOMServer = require('react-dom/server')

app.use('/static', express.static((path.join(__dirname), './build/static')))

const ServerEntry = require('../dist/server-entry.js').default
const template = fs.readFileSync(
    path.join(__dirname, '../build/index.html'),
    'utf8'
)
app.use('/public', express.static(path.join(__dirname, '../build')))
app.get('*', function(req, res) {
    const appString = ReactDOMServer.renderToString(ServerEntry(req.url, {}))
    console.log(appString)
    res.send(template.replace('<!--<app></app>-->', appString))
})

app.listen(3000, function() {
    console.log('server is running at localhost:3000')
})
