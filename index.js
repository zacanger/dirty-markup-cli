#!/usr/bin/env node

const dm = require('dirty-markup')
const arg = process.argv.slice(2)
const { name, version } = require('./package.json')
const showVersion = () => console.log(`${name}\n${version}`)
const help = () => console.log(`
  ${name}
  version: ${version}

  usage:
  cat index.html | dirty-markup
  dirty-markup --css --4 < styles.css

  options:
  mode: --html | --css | --js (default: html)
  indent: --2 | --4 | --8 | --tabs (default: 2)
`)

const doThings = (args) => {
  let mode = 'html'
  let indent = 2
  if (args) {
    if (args.includes('-h') || args.includes('--help')) return help()
    if (args.includes('-v') || args.includes('--version')) return showVersion()
    if (args.includes('--css')) mode = 'css'
    if (args.includes('--html')) mode = 'html'
    if (args.includes('--js')) mode = 'js'
    if (args.includes('--2')) indent = 2
    if (args.includes('--4')) indent = 4
    if (args.includes('--8')) indent = 8
    if (args.includes('--tabs')) indent = 'tabs'
  }
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (code) => {
    dm({ mode, code, indent }, ({ code }) => console.log(code))
  })
}

if (!module.parent) doThings(arg)
else console.log('Please use this module from the command line.')
