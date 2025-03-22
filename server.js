const http = require("node:http");

const server = http.createServer();

server.on("request", (request, response) => {
  console.log("---------MEHTOD---------");
  console.log(request.method); // What suppose to do

  console.log("---------URL---------");
  console.log(request.url);

  console.log("---------HEADERS---------");
  console.log(request.headers);

  console.log("---------BODY---------");
  request.on("data", chunk => {
    console.log(chunk.toString("utf-8"));
  });
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
