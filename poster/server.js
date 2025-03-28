const Butter = require("../butter");

const PORT = 3000;

const server = new Butter();

// Mock data
const USERS = [
  { id: 1, name: "Liam", username: "liam", password: "password" },
  { id: 2, name: "Mary", username: "mary", password: "password" },
  { id: 3, name: "Homer", username: "homer", password: "password" },
];

// Mock data
const POST = [
  {
    id: 1,
    title: "lorem ipsum",
    body: "lorem ipsum dolor sit amet",
    userId: 1,
  },
];

//-----FILES ROUTES-------//

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/login", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

server.listen(PORT, () => {
  console.log(`Server is listening on port http:localhost/${PORT}`);
});

//-----JSON ROUTES-------//
server.route("get", "/api/posts", (req, res) => {
  const posts = POST.map(post => {
    const user = USERS.find(user => user.id === post.userId);
    post.author = user.name;
    return post;
  });

  res.status(200).json(posts);
});

server.route("post", "/api/login", (req, res) => {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString("utf-8");
  });

  req.on("end", () => {
    body = JSON.parse(body);

    const { username, password } = body;

    const user = USERS.find(user => user.username === username);

    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

server.route("get", "/api/users", (req, res) => {});
