import cluster from 'cluster';
import http2 from 'http2';
import { cpus } from 'os';
import process from 'process';
import fs from 'fs';
import spdy from 'spdy';

const options = {
  // Private key
  key: fs.readFileSync('localhost-privkey.pem'),

  // Fullchain file or cert file (prefer the former)
  cert: fs.readFileSync('localhost-cert.pem'),

  // **optional** SPDY-specific options
  spdy: {
    protocols: ['h2', 'spdy/3.1', 'http/1.1'],
    plain: false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    'x-forwarded-for': true,

    connection: {
      windowSize: 1024 * 1024, // Server's window size

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: false,
    },
  },
};

const server = spdy.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end('hello world!');
});

server.listen(8000);
// const numCPUs = cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // 衍生工作进程。
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   // 工作进程可以共享任何 TCP 连接
//   // 在本示例中，其是 HTTP 服务器
//   const server = http2.createSecureServer(
//     {
//       key: fs.readFileSync('localhost-privkey.pem'),
//       cert: fs.readFileSync('localhost-cert.pem'),
//     },
//     async (req, res) => {
//       res.writeHead(200);
//       res.end('hello world\n');
//     }
//   );
//   server.on('request', (req, res) => {
//     console.log('sss');
//   });
//   server.on('stream', () => {
//     console.log('ssssss');
//   });
//   server.listen(8000);

//   console.log(`Worker ${process.pid} started`);
// }
