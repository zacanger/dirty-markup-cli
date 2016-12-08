#!/usr/bin/env node

const dm = require('dirty-markup')
const arg = process.argv.slice(2)
const pkg = require('./package.json')
const version = () => console.log(`dirty-markup-cli\n${pkg.version}`)
const help = () => console.log(`
  dirty-markup-cli

  usage:
  cat index.html | dirty-markup
  dirty-markup --css --4 < styles.css

  options:
  mode: --html | --css (default: html)
  indent: --4 | --8 | --tabs (default: 2)
`)

const doThings = (args) => {
  let mode = 'html'
  let indent = 2
  if (args) {
    if (args.includes('-h') || args.includes('--help')) return help()
    if (args.includes('-v') || args.includes('--version')) return version()
    if (args.includes('--css')) mode = 'css'
    if (args.includes('--html')) mode = 'html'
    if (args.includes('--tabs')) indent = 'tabs'
    if (args.includes('--4')) indent = 4
    if (args.includes('--8')) indent = 8
  }
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (code) => {
    dm({ mode, code, indent }, (data) => console.log(data.code))
  })
}

doThings(arg)
