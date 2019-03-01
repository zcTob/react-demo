'use strict'
/* global sneaky */

const NOCHDIR = true
const OVERWRITE = true

sneaky('env:21', function() {
  this.host = '45.32.67.132'
  this.nochdir = NOCHDIR
  this.overwrite = OVERWRITE
  this.path = '/home/zy/react-demo'
  this.port = 22
  this.user = 'root'

  this.filter = [
    '+ dist**',
    '+ package.json',
    '+ server.js',
    '+ Skyfile.js',
    '+ webpack.config.js',
    '- **'
  ].join('\n')

  this.before([
    'rm -rf ./dist',
    'npm run build',
  ].join(' && '))

  this.after([
    `cd ${this.path}/source`,
    'npm i',
    'pm2 start server.js'
  ].join(' && '))
})


