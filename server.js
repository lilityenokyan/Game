'use strict';

const http           = require('http');
const fs             = require('fs');
const path           = require('path');
const querystring    = require('querystring');
const url            = require('url');


const httpServer = http.createServer(function (req, res){
 
 const parsedUrl     = url.parse(req.url);
    const parsedQuery   = querystring.parse(parsedUrl.query);
    const method        = req.method;
    console.log(method,req.url);
    if (method==="GET"){
        if (req.url=="/game"){

            fs.readFile(__dirname+"/game.html", function(err, data) {
                console.log(err);
                if (err) {
                    console.log(err);
                    res.writeHead(404, 'Not Found');
                    res.write('404: File Not Found!');
                    return res.end();
                }
               // res.setHeader("Content-Type", "text/html");
                res.statusCode = 200;
                console.log(data);
                res.write(data);
                return res.end();
                });

        }
    }
    



		
		fs.readFile(__dirname+req.url, function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, 'Not Found');
                res.write('404: File Not Found!');
                return res.end();
            }
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            return res.end(data);
            });


   }).listen(8080);