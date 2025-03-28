const Butter = require("../butter");

const PORT = 3000;

const server = new Butter();

// Mock data
const USERS = [
  { id: 1, name: "Liam", username: "liam", password: "password" },
  { id: 2, name: "Mary", username: "mary", password: "password" },
  { id: 3, name: "Homer", username: "homer", password: "password" },
];

const SESSIONS = [];

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
// Log a user in and give them a token
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
      const token = Math.floor(Math.random() * 1000000000).toString();
      SESSIONS.push({
        token,
        userId: user.id,
      });
      res.setHeader("set-cookie", `token=${token}; Path=/;`);
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Log a user out
server.route("delete", "/api/logout", (req, res) => {});

// Send user info
server.route("get", "/api/user", (req, res) => {
  const token = req.headers.cookie.split("=")[1];
  const session = SESSIONS.find(session => session.token === token);
  if (session) {
    const user = USERS.find(user => user.id === session.userId);
    res.status(200).json({ username: user.username, name: user.name });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Update a user info
server.route("put", "/api/user", (req, res) => {});

// Send the list of all the posts that we have
server.route("get", "/api/posts", (req, res) => {
  const posts = POST.map(post => {
    const user = USERS.find(user => user.id === post.userId);
    post.author = user.name;
    return post;
  });

  res.status(200).json(posts);
});

// Create a new post
server.route("post", "/api/posts", (req, res) => {});
