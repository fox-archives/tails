import http from "http";
import fs from "fs";
import net from "net";

let httpAgent = new http.Agent({
  keepAlive: false,
  keepAliveMsecs: 1000,
  maxSockets: Infinity,
  maxFreeSockets: 256, // only relevent if keepAlive = true
  // timeout
});
let defaultAgent = http.globalAgent;


const server = http.createServer({
  IncomingMessage: http.IncomingMessage,
  ServerResponse: http.ServerResponse
});
server.on("request", (req, res) => {

});

server.listen();
console.log(server.listening);
