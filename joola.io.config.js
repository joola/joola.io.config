/**
 *  joola.io
 *
 *  Copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 *
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 */

var
  fs = require('fs'),
  nconf = require('nconf'),
  path = require('path'),
  logger = require('joola.io.logger'),
  http = require('http'),
  https = require('https'),
  express = require('express');

var app = global.app = express();

//test

var joola = {};
global.joola = joola;
joola.logger = logger;

//Configuration
nconf.argv()
  .env()
  .file({ file: nconf.get('conf') || './config/joola.io.config.json' });

var port = nconf.get('server:port');
var secureport = nconf.get('server:securePort');

if (!nconf.get('version')) {
  throw new Error('Failed to load configuration.');
}

//Application settings
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());

//Logger
var winstonStream = {
  write: function (message, encoding) {
    joola.logger.info(message);
  }
};

app.use(express.logger((global.test ? function (req, res) {
} : {stream: winstonStream})));

//Routes
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/conf/:provider/:env/:id', function (req, res) {
  var filePath = path.join(nconf.get('store:path'), req.params.provider, req.params.env, req.params.id + '.json');

  fs.readFile(filePath, 'utf8', function read(err, data) {
    if (err) {
      return res.json({result: false, err: err});
    }
    var content = {result: true, conf: JSON.parse(data)};

    // Invoke the next step here however you like
    res.json(content);
  });
});

app.get('/conf/:env/:id', function (req, res) {
  var filePath = path.join(nconf.get('store:path'), req.params.env, req.params.id + '.json');

  fs.readFile(filePath, 'utf8', function read(err, data) {
    if (err) {
      return res.json({result: false, err: err});
    }
    var content = {result: true, conf: JSON.parse(data)};

    // Invoke the next step here however you like
    res.json(content);
  });
});

app.get('/conf/:id', function (req, res) {
  var filePath = path.join(nconf.get('store:path'), req.params.id + '.json');

  fs.readFile(filePath, 'utf8', function read(err, data) {
    if (err) {
      return res.json({result: false, err: err});
    }
    var content = {result: true, conf: JSON.parse(data)};

    // Invoke the next step here however you like
    res.json(content);
  });
});

//Service Start/Stop & Control Port
var status = '';
var httpServer, httpsServer;

var startHTTP = function (callback) {
  var result = {};
  try {
    var _httpServer = http.createServer(app).listen(port,function (err) {
      if (err) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }
      status = 'Running';
      joola.logger.info('joola.io configuration HTTP server listening on port ' + port);
      result.status = 'Success';
      httpServer = _httpServer;
      return callback(result);
    }).on('error',function (ex) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }).on('close', function () {
        status = 'Stopped';
        joola.logger.warn('joola.io configuration HTTP server listening on port ' + port.toString() + ' received a CLOSE command.');
      });
  }
  catch (ex) {
    result.status = 'Failed: ' + ex.message;
    console.log(result.status);
    console.log(ex.stack);
    return callback(result);
  }
  return null;
};

var startHTTPS = function (callback) {
  var result = {};
  try {
    var secureOptions = {
      key: fs.readFileSync(nconf.get('server:keyFile')),
      cert: fs.readFileSync(nconf.get('server:certFile'))
    };
    var _httpsServer = https.createServer(secureOptions, app).listen(secureport,function (err) {
      if (err) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }
      joola.logger.info('joola.io configuration HTTPS server listening on port ' + secureport);
      result.status = 'Success';
      httpsServer = _httpsServer;
      return callback(result);
    }).on('error',function (ex) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }).on('close', function () {
        joola.logger.warn('Jjoola.io configuration HTTPS server listening on port ' + secureport.toString() + ' received a CLOSE command.');
      });
  }
  catch (ex) {
    result.status = 'Failed: ' + ex.message;
    console.log(result.status);
    console.log(ex.stack);
    return callback(result);
  }
  return null;
};

startHTTP(function () {
  if (nconf.get('server:secure') === true)
    startHTTPS(function () {
    });
});

//Control Port
if (nconf.get('server:controlPort:enabled') === true) {
  var cp = require('node-controlport');
  var cp_endpoints = [];

  cp_endpoints.push({
    endpoint: 'status',
    exec: function (callback) {
      callback({status: status, pid: process.pid});
    }
  });

  cp_endpoints.push({
      endpoint: 'start',
      exec: function (callback) {
        if (nconf.get('server:secure') === true) {
          startHTTP(function () {
            startHTTPS(callback);
          });
        }
        else {
          startHTTP(callback);
        }
      }
    }
  );

  cp_endpoints.push({
    endpoint: 'stop',
    exec: function (callback) {
      var result = {};
      result.status = 'Success';
      try {
        httpServer.close();
        if (nconf.get('server:secure') === true)
          httpsServer.close();

        if (nconf.get('server:controlPort:exitOnStop') === true)
          process.exit(0);
      }
      catch (ex) {
        console.log(ex);
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }
      return callback(result);
    }
  });

  cp.start(nconf.get('server:controlPort:port'), cp_endpoints, function () {
    joola.logger.info('joola.io configuration control port listening on port ' + nconf.get('server:controlPort:port'));
  });
}