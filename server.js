import http from "http";
import url from "url";

const port = "3000";
const hostname = "127.0.0.1";

// create an HTTP server
const server = http.createServer((req, res) => {
  // set response header
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // send  response
  res.end("Hello, World!\n");

  const parsedUrl = url.parse(req.url, true);

  switch (parsedUrl.pathname) {
    case "/":
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello, World!\n");
      break;
    case "/home":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Hello there!" }));
      break;
    case "/user":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ name: "Samuel", age: 30 }));
      break;
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "404 Not Found" }));
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
