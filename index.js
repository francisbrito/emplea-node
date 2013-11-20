var http = require('http');

// TODO: Document this.
var API_URL = 'http://www.emplea.do';

// TODO: Document this.
var _createError = function _error(msg, inner) {
    var err = new Error(msg);

    err.inner = inner;

    return err;
};

// TODO: Document this.
var _request = function _request(options, headers, fn) {
    if (typeof headers === 'function') {
        // Omits headers.
        fn = headers;
        headers = null;
    }

    options.agent = options.agent || http.globalAgent;
    options.headers = headers || null;

    var req = http.request(options);

    req.on('response', function (res) {
        var buffer = new Buffer(0);

        res.on('data', function (d) {
            buffer = Buffer.concat([buffer, d]);
        });

        res.on('error', function (err) {
            var e = _createError('Unable to process response.', err);

            fn(e, null);
        });

        res.on('end', function () {
            var data = buffer.toString();

            fn(null, data);

            // Should I dispose buffer?
            // buffer = null;
        });
    });

    req.on('error', function (err) {
        var e = _createError('Unable to process request.', err);

        fn(e, null);
    });

    req.end();
};

// TODO: Document this.
var _get = function _get(url, headers, fn) {
    var options = require('url').parse(url, true);

    _request(options, headers, fn);
};

// TODO: Document this.
var _getJSON = function _getJSON(url, fn) {
    var headers = {
        'Accepts': 'application/json'
    };

    _get(url, headers, function (err, data) {
        if (err) {
            fn(err, null);

            return;
        }

        try {
            var json = JSON.parse(data);

            fn(null, json);
        } catch (e) {
            var ee = _createError('Unable to parse response.', e);

            fn(ee, null);
        }
    });
};

// TODO: Document this.
var Job = {
    // TODO: Document this.
    all: function (fn) {
        // FIXME: This does not work.
        // var url = API_URL + '/jobs' + '.json';
        // _getJSON(url, fn);
        throw _createError('Method not supported.');
    },
    // TODO: Document this.
    findById: function (id, fn) {
        var url = API_URL + '/jobs/' + id + '.json';
        _getJSON(url, fn);
    }
};

module.exports = {
    Job: Job
};
