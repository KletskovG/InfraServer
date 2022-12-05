const http = require("http");
const {exec} = require("child_process");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/update") {
    exec("bash ~/swarm/update.sh");
    res.end("WAIT FOR MESSAGE")
  }

  if (req.url === "/check") {
    res.end("OK");
  }
});

server.listen(8091, () => {
  console.log("DAEMON SERVER STARTED");
  console.log(new Date().toISOString());
});
