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
  let data = "";
  const name = request.headers.name;

  request.on("data", chunk => {
    data += chunk.toString();
  });

  request.on("end", () => {
    data = JSON.parse(data);
    console.log(name);
    console.log(data);

    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify({ message: "Post received" }));
  });
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
