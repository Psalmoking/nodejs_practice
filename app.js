import e from "express";
import multer from "multer";
import fs from "fs";

import aboutRoutes from "./about.js";

const app = e();
app.use(e.json());

const PORT = 3000;

app.set("view engine", "ejs");

// middleware to parse form data
app.use(e.urlencoded({ extended: true }));

app.post("/submit-form", (req, res) => {
  console.log(req.body);

  const { name, email } = req.body;

  res.send(`Form submitted by: ${name}, Email: ${email}`);
});

app.post("/json-data", (req, res) => {
  console.log(req.body);
  const { userId, message } = req.body;

  res.status(200).json({
    status: "success",
    userId: userId,
    message: message,
  });
});

// home route
app.get("/", (req, res) => {
  res.send("Welcome to our EXPRESS.JS server!");
});

app.get("/profile", (req, res) => {
  // reading request headers
  const userAgent = req.get("User-agent");
  console.log(userAgent);
  res.set("X-Custom-Header", "HelloWorld");
  res.status(200).send("Headers handled!");
});

app.use("/about", aboutRoutes);
// app.get("/about", (req, res) => {
//   res.json({
//     message: "About Us",
//     description: "This is a sample Express.js app",
//   });
// });

app.get("/contact", (req, res) => {
  res.status(200).json({ message: "Contact Us", email: "contact@example.com" });
});

app.get("/user", (req, res) => {
  res.render("index", { username: "John Doe", email: "johndoe@mail.com" });
});

app.get("/search", (req, res) => {
  const query = req.query.query;
  res.send(`You searched for: ${query}`);
});

// file upload with multer
// first set up multer storage configuration
const uploadDir = "./uploads";
// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder to store uploaded files
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate the unique filename
  },
});

// create multer instance with file size limit (10MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).send(`File uploaded: ${req.file.filename}`);
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
