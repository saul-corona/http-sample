const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on("request", async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");

    const fileHandler = await fs.open("./public/index.html", "r");
    const fileStream = fileHandler.createReadStream();

    fileStream.pipe(res);
  }

  if (req.url === "/style.css" && req.method === "GET") {
    res.setHeader("Content-Type", "text/css");

    const fileHandler = await fs.open("./public/style.css", "r");
    const fileStream = fileHandler.createReadStream();

    fileStream.pipe(res);
  }

  if (req.url === "/script.js" && req.method === "GET") {
    res.setHeader("Content-Type", "text/javascript");

    const fileHandler = await fs.open("./public/script.js", "r");
    const fileStream = fileHandler.createReadStream();

    fileStream.pipe(res);
  }

  if (req.url === "/login" && req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    const body = {
      message: "Login success",
    };
    res.end(JSON.stringify(body));
  }

  if (req.url == "/upload" && req.method === "POST") {
    const fileHandler = await fs.open("./storage/image.jpg", "w");
    const fileStream = fileHandler.createWriteStream();

    req.pipe(fileStream);

    req.on("end", () => {
      res.end(JSON.stringify({ message: "Upload success" }));
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000, http://localhost:3000");
});
