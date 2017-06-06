global.__base = __dirname + '/';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hostnameMiddleware = require('./lib/hostname');
var ajaxMiddleware = require(__base + 'lib/ajax');

var Responder = require(__base + 'lib/responder');

var ejs = require('ejs');

var fs = require('fs');
var mime = require('mime');

var expressSession = require('express-session');

var indexRoute = require('./routes/index');

var app = express();
var appConfig = require('./config/config');

var appIsActive = true;

var sessionSecret = 'A_BIT_OFTHE OLD ULTRAVIOLENCE';

app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.disable('view cache');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));

    app.use(hostnameMiddleware());
    app.use(ajaxMiddleware());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Static Assets

    app.use(['/*.js', '/*.css'], function(request, result, next) {
        if (request.acceptsEncodings(['gzip'])) {
            var compressedVersion = __dirname + '/public' + request.originalUrl + ".gz";
            try {
                fs.accessSync(compressedVersion, fs.R_OK);
                request.url += '.gz';

                result.header('Content-Encoding', 'gzip');
                result.header('Content-Type', mime.lookup(path.extname(request.originalUrl)));
            } catch(error) {
                // Silently fail here, as all this means is that
                // there is no gzip file and we should just serve the file
                // as its named.
            }
        }

        result.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        result.header('Expires', '-1');
        result.header('Pragma', 'no-cache');

        next();
    });

    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', function(request, result, next) {
        result.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        result.header('Expires', '-1');
        result.header('Pragma', 'no-cache');
        next();
    })

    app.use('/', indexRoute);


module.exports = app;
