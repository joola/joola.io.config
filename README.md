joola.io.config
===============
joola.io Configuration Node.

http://ci.joo.la/buildStatus/icon?job=ci-joola.io.config-nightly
http://ci.joo.la/buildStatus/icon?job=ci-joola.io.analytics-nightly
[![Build Status][3]][4] [![dependency status][5]][6] [![dev dependency status][7]][8] [![Coverage Status][1]][2]
[![NPM](https://nodei.co/npm/joola.io.config.png)](https://nodei.co/npm/joola.io.config/)

The configuration node is used to support joola.io's distributed framework.
Different joola.io components, such as the Engine connect to the configuration node to recieve its JSON settings file, this is very useful when distrubuting the framework across multiple nodes and servers.

Installing
----------

```
npm install joola.io.config
npm start
```

Usage
-----
joola.io.config is based on an Express HTTP server exposing a single interface ```conf```. When this endpoint is reached with a path indicating the config to load, the server will return the JSON file.
Configuratrion files are kept under the ```store``` folder.

```
curl http://localhost:40001/conf/joola.io.analytics
```

Using with nconf-http
---------------------
```
var nconf = require('nconf');

require('nconf-http');

nconf.argv()
  .env();

nconf.use('http', { url: 'http://localhost:40001/conf/joola.io.analytics',
  callback: function () {
    console.log('config loaded')
  }
});
```

Testing
-------

```
npm test   
```

[1]: https://coveralls.io/repos/joola/joola.io.config/badge.png
[2]: https://coveralls.io/r/joola/joola.io.config
[3]: http://ci.joo.la/buildStatus/icon?job=ci-joola.io.config-nightly
[4]: http://ci.joo.la/job/ci-joola.io.config-nightly/
[5]: https://david-dm.org/joola/joola.io.config.png
[6]: https://david-dm.org/joola/joola.io.config
[7]: https://david-dm.org/joola/joola.io.config/dev-status.png
[8]: https://david-dm.org/joola/joola.io.config#info=devDependencies
