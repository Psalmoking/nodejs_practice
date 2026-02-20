import e from "express";
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

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
