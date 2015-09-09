'use strict';

var os           = require('os');
var childProcess = require('child_process');
var shell        = require('shelljs');
var _            = require('lodash');

var HAS_NATIVE_EXECSYNC = childProcess.hasOwnProperty('spawnSync');
var defaultCommands = {
  'branch': ['rev-parse', '--abbrev-ref', 'HEAD'],
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

function execCommand(cmd, args) {
  var result;

  if (HAS_NATIVE_EXECSYNC) {
    result = childProcess.spawnSync(cmd, args);

    if (result.status !== 0) {
      console.error('ERROR! Failed to execute command: git ' + args.join(' ') + ' (' + result.stderr.toString('utf8') + ')');

      return;
    }

  } else {
    result = shell.exec(cmd + ' ' + args.join(' '), {silent: true});

    if (result.code !== 0) {
      console.error('ERROR! Failed to execute command: git ' + args.join(' ') + ' (' + result.output + ')');

      return;
    }
  }

  return result.output.toString('utf8').replace(/^\s+|\s+$/g, '');
}

module.exports = function(shortcuts, commands, cache) {
  if (cache === undefined) {
    cache = true;
  }

  commands = _.defaults(commands || {}, defaultCommands);
  shortcuts = shortcuts || Object.keys(commands);

  shortcuts.forEach(function(shortcut) {
    if (cache && info[shortcut] !== undefined) {
      return;
    }

    var args = commands[shortcut];

    if (!(args instanceof Array)) {
      console.error('ERROR! Shortcut "' + shortcut + '" is undefined');

      return;
    }

    var result = execCommand('git', args);

    if (result === undefined) {
      return;
    }

    info[shortcut] = result.replace(os.EOL, '').replace('\n', '').replace(/^,?"?|"?,?$/gm, '');
  });

  return info;
};