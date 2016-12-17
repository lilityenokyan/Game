'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');


const httpServer = http.createServer(function (req, res) {

    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);
    const method = req.method;

    fs.readFile(__dirname + req.url, function (err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }
        // res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;
        return res.end(data);
    });


}).listen(8080);