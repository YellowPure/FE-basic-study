const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    let pathname = url.parse(request.url).pathname;
    let ext = pathname.match(/(\.[^.]+|)$/)[0];

    switch(ext){

    case ".css":
        
    case ".js":

    fs.readFile("."+request.url, 'utf-8',function (err, data) {

    });
    res.setHeader('Content-Type', 'text/plain');
    
    fs.readFile('./manifest.html', 'utf-8', (err, data) => {
        if(err)
            throw err;
        res.end(data);
    });
});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});