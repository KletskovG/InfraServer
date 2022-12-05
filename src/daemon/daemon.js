const http = require("http");
const {exec} = require("child_process");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/update") {
    exec("~/swarm/update.sh", (error, stdout) => {
      if (error) {
        res.end(error);
      }
      res.end(stdout);
    });
  }
});

server.listen(8091, () => {
  console.log("DAEMON SERVER STARTED");
  console.log(new Date().toISOString());
});
