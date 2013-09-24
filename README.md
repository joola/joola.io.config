joola.io.config
===============
joola.io Configuration Node. The configuration node is used to support joola.io's distributed framework.
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

