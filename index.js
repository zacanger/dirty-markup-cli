#!/usr/bin/env node

const dm = require('dirty-markup')
const arg = process.argv.slice(2)
const help = () => console.log(`
  dirty-markup-cli
  usage:
  dirtymarkup < foo.html
  dirtymarkup css < foo.css
`)

if (!arg) return help()
let mode
if (arg[0] === ('css' || 'html')) mode = arg[0]
let code = arg[0]
if (mode) code = arg[1]
dm({ mode, code }, (data) => console.log(data))
