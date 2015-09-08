'use strict';

var os           = require('os');
var childProcess = require('child_process');
var shell        = require('shelljs');
var _            = require('lodash');

var HAS_NATIVE_EXECSYNC = childProcess.hasOwnProperty('spawnSync');

var defaultShortcuts = ['name', 'shortSHA', 'tag'];
var defaultCommands = {
  'name': ['rev-parse', '--abbrev-ref', 'HEAD'],
  'SHA': ['rev-parse', 'HEAD'],
  'shortSHA': ['rev-parse', '--short', 'HEAD'],
  'currentUser': ['config', '--global', 'user.name'],
  'lastCommitTime': ['log', '--format="%ai"', '-n1', 'HEAD'],
  'lastCommitMessage': ['log', '--format="%B"', '-n1', 'HEAD'],
  'lastCommitAuthor': ['log', '--format="%aN"', '-n1', 'HEAD'],
  'tag': ['describe', '--always', '--tag', '--abbrev=0'],
  'remoteOriginUrl': ['config', '--get-all', 'remote.origin.url']
};

var info = {};

function _command(cmd, args) {
  var result;

  if (HAS_NATIVE_EXECSYNC) {
    result = childProcess.spawnSync(cmd, args);

    if (result.status !== 0) {
      throw new Error('failed to execute command: git ' + args.join(' ') + ' (' + result.stderr.toString('utf8') + ')');
    }
  } else {
    result = shell.exec(cmd + ' ' + args.join(' '), {silent: true});

    if (result.code !== 0) {
      throw new Error('failed to execute command: git ' + args.join(' ') + ' (' + result.output + ')');
    }
  }

  return result.output.toString('utf8').replace(/^\s+|\s+$/g, '');
}

module.exports = function(shortcuts, commands, cache) {
  if (cache === undefined) {
    cache = true;
  }

  shortcuts = shortcuts || defaultShortcuts;
  commands = _.defaults(commands || {}, defaultCommands);

  shortcuts.forEach(function(shortcut) {
    if (cache && info[shortcut]) return;

    var result = _command('git', commands[shortcut]);

    info[shortcut] = result.replace(os.EOL, '').replace('\n', '').replace(/^,?"?|"?,?$/gm, '');
  });

  return info;
};