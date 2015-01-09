#!/usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync(process.cwd() + '/package.json', 'utf8')),
    ndm = require('ndm')(pkg.name),
    UI = require('./ui'),
    chalk = require('chalk');

program
  .version(JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version)
  .usage('[options] <command> [<args ...>]');

var ui = new UI({
  inputStream: process.stdin,
  outputStream: process.stdout
});

var actionPerformed = false;
program.command('init')
  .description('create a new blog')
  .action(function(options) {
    actionPerformed = true;
    require('./init').run(ui, options);
  });
program.command('server')
  .description('create a new blog')
  .action(function(options) {
    actionPerformed = true;
    require('./server').run(ui, options);
  });
program.command('install')
  .description('install the blog using an OS-specific service wrapper (upstart, launchctl or initctl)')
  .action(ndmAction('install'));
program.command('start')
  .description('start the server')
  .action(ndmAction('start'));
program.command('restart')
  .description('restart the server')
  .action(ndmAction('restart'));
program.command('stop')
  .description('stop the server')
  .action(ndmAction('stop'));

if (process.argv.length == 2) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);
if (!actionPerformed) {
  ui.writeLine(chalk.red("  Unknown action '" + program.args[0] + "'"));
  program.outputHelp();
}

function ndmAction(method) {
  return function() {
    actionPerformed = true;
    ndm[method].call(ndm);
  }
}
