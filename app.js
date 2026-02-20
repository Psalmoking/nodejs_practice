import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const port = "3000";
const hostname = "127.0.0.1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  if (req.url === "/user") {
    const userData = { username: "JohnDoe", email: "johndoe@example.com" };

    const filePath = path.join(__dirname, "public", "user.html");
    fs.readFile(filePath, "utf8", (err, html) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Server  Error");
        return;
      }

      let renderedHtml = html.replace("{{username}}", userData.username);
      renderedHtml = renderedHtml.replace("{{email}}", userData.email);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(renderedHtml);
    });
  } else {
    // Handle other routes or serve static files
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
