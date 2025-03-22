const http = require("node:http");

const agent = new http.Agent({
  keepAlive: true,
});

const request = http.request({
  agent,
  hostname: "localhost",
  port: 8080,
  path: "/create-post",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    name: "John Doe",
  },
});

request.on("response", response => {
  console.log("---------STATUS---------");
  console.log(response.statusCode);

  console.log("---------HEADER---------");
  console.log(response.headers);

  console.log("---------BODY---------");
  response.on("data", chunk => {
    console.log(chunk.toString("utf-8"));
  });

  response.on("end", () => {
    console.log("No more data");
  });
});

request.end(JSON.stringify({ title: "Title of my post", body: "Body text" }));
