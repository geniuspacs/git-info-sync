# git-info-sync [![NPM version](https://badge.fury.io/js/git-info-sync.svg)](http://badge.fury.io/js/git-info-sync)

> get detailed data about current git repo

## Install with [npm](npmjs.org)

```sh
npm install git-info-sync
```

## Usage

```js
var gitInfo = require('git-info-sync');

gitInfo(['branch', 'shortSHA']); //{ branch: 'master',
                                 //  shortSHA: '3d0723f' }
                                           
gitInfo(); //{ branch: 'master',
           //  SHA: '3d0723ff637020700ca5f6a394b07f27ddb81df2',
           //  shortSHA: '3d0723f',
           //  currentUser: 'someUser',
           //  lastCommitTime: '2015-09-07 19:01:15 +0300',
           //  lastCommitMessage: 'bug fixes\n',
           //  lastCommitAuthor: 'someCommitter',
           //  tag: '0.1.2',
           //  remoteOriginUrl: 'https://someuser@github.com/someproject/somerepo.git' }
```

## API
### gitInfo([shortcuts [, commands [, cache]]])

Set attribute `shortcuts` define composition of the resulting data

#### Parameters

##### shortcuts
Type: `Array`

Default: all shortcuts

Define composition of the resulting data.

##### commands
Type: `Object`

Extend collection of default shortcuts of commands:

```
branch: ['rev-parse', '--abbrev-ref', 'HEAD'],
SHA: ['rev-parse', 'HEAD']
shortSHA: ['rev-parse', '--short', 'HEAD']
currentUser: ['config', '--global', 'user.name']
lastCommitTime: ['log', '--format="%ai"', '-n1', 'HEAD']
lastCommitMessage: ['log', '--format="%B"', '-n1', 'HEAD']
lastCommitAuthor: ['log', '--format="%aN"', '-n1', 'HEAD']
tag: ['describe', '--always', '--tag', '--abbrev=0']
remoteOriginUrl: ['config', '--get-all', 'remote.origin.url']
```

##### cache
Type: `Boolean`

Default: true

Cache git info

## License

© Oleg Istomin 2015.
Released under the MIT license