#!/usr/bin/env node

const dm = require('dirty-markup')
const arg = process.argv.slice(2)
const help = () => console.log(`
  dirty-markup-cli
  usage:
  cat index.html | dirty-markup
  dirty-markup < styles.css
`)

const doThings = (args) => {
  let mode, code
  if (args) {
    let a = args[0]
    if (a === '-h' || a === '--help') return help()
    if (a === '--css') mode = 'css'
    if (a === '--html') mode = 'html'
  }
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (stuff) => {
    code = stuff
    dm({ mode, code }, (data) => console.log(data.code))
  })
}

doThings(arg)
