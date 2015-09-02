#!/usr/bin/env node

var commander = require('commander');
var fs = require('fs');
var path = require('path');
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
var ndm = require('ndm')(null, {
  appName: 'ghostrunner'
});
var UI = require('./ui');
var chalk = require('chalk');

var program = new commander.Command('ghostrunner')
  .version(pkg.version)
  .usage('[options] <command> [<args ...>]');

var ui = new UI({
  inputStream: process.stdin,
  outputStream: process.stdout
});

var actionPerformed = false;
program.command('init')
  .description('create a new blog in the current directory')
  .action(function(options) {
    actionPerformed = true;
    require('./init').run(ui, options);
  });
program.command('server')
  .description('start the server')
  .action(function(options) {
    actionPerformed = true;
    require('./server').run(ui, options);
  });
program.command('install')
  .description('install the blog as a service using an OS-specific service wrapper (upstart, launchctl or initctl)')
  .option('-u, --uid', 'what user should scripts be executed as?')
  .option('-g, --gid', 'what group should scripts be executed as?')
  .action(ndmAction('install'));
program.command('remove')
  .description('remove the service')
  .action(ndmAction('remove'));
program.command('start')
  .description('start the service')
  .action(ndmAction('start'));
program.command('restart')
  .description('restart the service')
  .action(ndmAction('restart'));
program.command('stop')
  .description('stop the service')
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
