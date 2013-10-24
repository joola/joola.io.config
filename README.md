# joola.io.config
Part of the [logger.io framework][14], the open-source data visualization framework.

[![Build Status][3]][4] [![dependency status][5]][6] [![dev dependency status][7]][8] [![Coverage Status][1]][2]

[![NPM](https://nodei.co/npm/joola.io.config.png?downloads=true&stars=true)](https://nodei.co/npm/joola.io.config/)

## Overview
[joola.io][22] is a distributed data processing and visualization framework. The framework is designed as an end-to-end
solution for data analytics. The framework connects to your databases and using a JSON based mapping of dimensions and
metrics, it exposes a RESTful API for querying the data. The Client SDK communicates with the engine to display,
visualize and provide insight into the data. Developers can extend the framework in many ways, add data connectors,
authentication plugins, visualizations and more.

To learn more about the framework architecture, see our [documentation site][1].

## The Config Node
joola.io.config is based on an [express][31] HTTP server exposing a single interface ```conf```. When this endpoint is reached with a path indicating the config to load, the server will return the JSON file.
Configuration files are kept under the ```store``` folder.

### Installing
```bash
$ npm install joola.io.config
```

### Using
```bash
$ curl http://localhost:40001/conf/joola.io.analytics
```

#### Using with [nconf-http][30]
```JavaScript
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

## Bug Reports
We use [JIRA][17] as our issue tracker and project management tool.

When submitting bug reports, please make sure you provide as much information as possible, including steps to reproduce.
Each code commit relating to the ticket, will be marked, including builds and tests, so you'll have full transparency as
to the status of your issue.

## Contributing
We would love to get your help! We have outlined a simple [Contribution Policy][18] to support a transparent and easy merging
of ideas, code, bug fixes and features.

If you're looking for a place to start, you can always go over the list of [open issues][17], pick one and get started.
If you're feeling lost or unsure, [just let us know](#Contact).

## Contact
Contacting us is easy, ping us on one of these:
- [@joolaio][19]
- [info@joo.la][20]
- #joola.io on irc.freenode.net
- You can even fill out a [form][21].

## License
Copyright (c) 2012-2013 Joola Smart Solutions. GPLv3 Licensed, see [LICENSE][24] for details.


[1]: https://coveralls.io/repos/joola/joola.io.config/badge.png
[2]: https://coveralls.io/r/joola/joola.io.config
[3]: https://travis-ci.org/joola/joola.io.config.png
[4]: https://travis-ci.org/joola/joola.io.config
[5]: https://david-dm.org/joola/joola.io.config.png
[6]: https://david-dm.org/joola/joola.io.config
[7]: https://david-dm.org/joola/joola.io.config/dev-status.png
[8]: https://david-dm.org/joola/joola.io.config#info=devDependencies
[9]: https://github.com/joola/joola.io.engine
[10]: https://github.com/joola/joola.io.analytics
[11]: https://github.com/joola/joola.io.sdk
[12]: https://github.com/joola/joola.io.config
[13]: https://github.com/joola/joola.io.logger
[14]: https://github.com/joola/joola.io
[15]: http://nodejs.org
[16]: http://serverfault.com/
[17]: http://https://joolatech.atlassian.net/browse/JARVIS
[18]: https://github.com/joola/joola.io/blob/master/CONTRIBUTING.md
[19]: http://twitter.com/joolaio
[20]: mailto://info@joo.la
[21]: http://joo.la/#contact
[22]: http://joola.io/
[23]: http://ci.joo.la
[24]: https://github.com/joola/joola.io.config/blob/master/LICENSE.md
[25]: https://joolatech.atlassian.net/wiki/display/JAD/Welcome
[26]: https://joolatech.atlassian.net/wiki/display/JAD/Getting+Started
[27]: https://joolatech.atlassian.net/wiki/display/JAD/Installing+joola.io
[28]: https://joolatech.atlassian.net/wiki/display/JAD/Developers
[29]: https://joolatech.atlassian.net/wiki/display/JAD/Developers/Coding+Guidelines
[30]: http://github.com/itayw/nconf-http
[31]: http://expressjs.com/

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/joola/joola.io.config/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

