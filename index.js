#!/usr/bin/env node

const dm = require('dirty-markup')
const arg = process.argv.slice(2)
const help = () => console.log(`
  dirty-markup-cli
  usage:
  dirtymarkup < foo.html
  dirtymarkup css < foo.css
`)

const doThings = (args) => {
  if (!args.length) return help()
  let mode
  if (args[0] === ('css' || 'html')) mode = args[0]
  let code = args[0]
  if (mode) code = args[1]
  dm({ mode, code }, (data) => console.log(data))
}

doThings(arg)
