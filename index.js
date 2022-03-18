#!/usr/bin/env node
const pkg = require('./package.json')
const { program } = require('commander')
const registerOptions = require('./lib/core/options')
const { registerCommand } = require('./lib/core/commands')
registerOptions(program, pkg)
registerCommand(program)

program.parse(process.argv)
