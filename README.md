# git-info-sync [![NPM version](https://badge.fury.io/js/git-info-sync.svg)](http://badge.fury.io/js/git-info-sync)

> get detailed data about current git repo

## Install with [npm](npmjs.org)

```sh
npm install git-info-sync
```

## Usage

```js
var gitInfo = require('git-info-sync');

var git = gitInfo(); //{ name: 'master',
                     //  shortSHA: '3d0723f',
                     //  tag: '3d0723ff637020700ca5f6a394b07f27ddb81df2' }

```

## API
### gitInfo([shortcuts] [, commands] [, cache])

Set attribute `shortcuts` define composition of the resulting data

#### Parameters

##### shortcuts
Type: `Array`

Default: `['name', 'shortSHA', 'tag']`

Define composition of the resulting data

##### commands
Type: `Object`

Extend collection of default shortcuts of commands:

```
'name': ['rev-parse', '--abbrev-ref', 'HEAD'],
'SHA': ['rev-parse', 'HEAD']
'shortSHA': ['rev-parse', '--short', 'HEAD']
'currentUser': ['config', '--global', 'user.name']
'lastCommitTime': ['log', '--format="%ai"', '-n1', 'HEAD']
'lastCommitMessage': ['log', '--format="%B"', '-n1', 'HEAD']
'lastCommitAuthor': ['log', '--format="%aN"', '-n1', 'HEAD']
'tag': ['describe', '--always', '--tag', '--abbrev=0']
'remoteOriginUrl': ['config', '--get-all', 'remote.origin.url']
```

##### cache
Type: `Boolean`

Default: true

No cache git info

## License

© Oleg Istomin 2015.
Released under the MIT license